import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { challengeService } from '@/services/challengeService'
import type { Challenge, ChallengeProgress } from '@/lib/mockData'

interface ChallengeWithProgress extends Challenge {
  progress?: ChallengeProgress
}

const typeMeta: Record<Challenge['type'], { title: string; description: string; icon: string; accent: string }> = {
  daily: {
    title: 'Daily Boosters',
    description: 'Quick wins you can accomplish in less than a day.',
    icon: '☀️',
    accent: 'from-sky-400 to-sky-500'
  },
  weekly: {
    title: 'Weekly Goals',
    description: 'Stay consistent with these seven-day missions.',
    icon: '📅',
    accent: 'from-emerald-400 to-emerald-600'
  },
  monthly: {
    title: 'Monthly Milestones',
    description: 'Longer-form challenges designed for lasting impact.',
    icon: '🌙',
    accent: 'from-purple-500 to-indigo-600'
  },
  special: {
    title: 'Special Events',
    description: 'Limited-time community challenges with big rewards.',
    icon: '🎉',
    accent: 'from-amber-400 to-orange-500'
  }
}

const getDifficultyToken = (difficulty: Challenge['difficulty']) => {
  switch (difficulty) {
    case 'easy':
      return { label: 'Easy', styles: 'bg-green-100 text-green-800 border-green-200' }
    case 'medium':
      return { label: 'Medium', styles: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
    case 'hard':
      return { label: 'Hard', styles: 'bg-red-100 text-red-800 border-red-200' }
    default:
      return { label: difficulty, styles: 'bg-gray-100 text-gray-800 border-gray-200' }
  }
}

const ChallengeExplorer: React.FC = () => {
  const { user } = useAuth()
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [progressMap, setProgressMap] = useState<Record<string, ChallengeProgress>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const userProgressPromise = user?.id
        ? challengeService.getUserChallengeProgress(user.id)
        : Promise.resolve<ChallengeProgress[]>([])

      const [allChallenges, userProgress] = await Promise.all([
        challengeService.getAllChallenges(),
        userProgressPromise
      ])

      setChallenges(allChallenges)
      const map: Record<string, ChallengeProgress> = {}
      userProgress.forEach(progress => {
        map[progress.id] = progress
      })
      setProgressMap(map)
    } catch (err) {
      console.error('Error loading challenges:', err)
      setError('Unable to load challenges right now. Please try again soon.')
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleJoinChallenge = useCallback(async (challenge: Challenge) => {
    if (!user?.id) {
      setError('You need to be signed in to join challenges.')
      return
    }

    try {
      setUpdatingId(challenge.id)
      await challengeService.joinChallenge(user.id, challenge.id)
      await loadData()
    } catch (err) {
      console.error('Error joining challenge:', err)
      setError('Failed to join the challenge. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }, [loadData, user?.id])

  const handleMarkComplete = useCallback(async (challenge: Challenge) => {
    if (!user?.id) {
      setError('You need to be signed in to update challenge progress.')
      return
    }

    try {
      setUpdatingId(challenge.id)
      await challengeService.updateChallengeProgress(user.id, challenge.id, 100)
      await loadData()
    } catch (err) {
      console.error('Error completing challenge:', err)
      setError('Unable to update the challenge progress right now.')
    } finally {
      setUpdatingId(null)
    }
  }, [loadData, user?.id])

  const challengesByType = useMemo(() => {
    const groups: Record<Challenge['type'], ChallengeWithProgress[]> = {
      daily: [],
      weekly: [],
      monthly: [],
      special: []
    }

    challenges.forEach(challenge => {
      const progress = progressMap[challenge.id]
      groups[challenge.type].push({ ...challenge, progress })
    })

    return groups
  }, [challenges, progressMap])

  const renderChallengeCard = (challenge: ChallengeWithProgress) => {
    const token = getDifficultyToken(challenge.difficulty)
    const progress = challenge.progress?.progress ?? 0
    const completed = challenge.progress?.completed ?? false

    return (
      <div key={challenge.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{challenge.description}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${token.styles}`}>
            {token.label}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1"><span>🕒</span> {challenge.time_limit}</span>
          {challenge.deadline && (
            <span className="flex items-center gap-1"><span>⏳</span> Due {new Date(challenge.deadline).toLocaleDateString()}</span>
          )}
          <span className="flex items-center gap-1"><span>🏆</span> {challenge.points} XP</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full ${completed ? 'bg-emerald-500' : 'bg-blue-500'}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <span>{completed ? 'Completed' : `${Math.round(progress)}% complete`}</span>
          <span>{challenge.participants.toLocaleString()} participants</span>
        </div>

        <div className="flex items-center gap-3">
          {!challenge.progress && (
            <button
              onClick={() => handleJoinChallenge(challenge)}
              disabled={updatingId === challenge.id}
              className="flex-1 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {updatingId === challenge.id ? 'Joining...' : 'Join Challenge'}
            </button>
          )}

          {challenge.progress && !completed && (
            <button
              onClick={() => handleMarkComplete(challenge)}
              disabled={updatingId === challenge.id}
              className="flex-1 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {updatingId === challenge.id ? 'Saving...' : 'Mark as Complete'}
            </button>
          )}

          {completed && (
            <div className="flex-1 px-4 py-2 text-sm font-semibold text-center text-emerald-700 bg-emerald-100 rounded-lg border border-emerald-200">
              Completed! 🎉
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Challenges</h2>
          <p className="text-gray-600 mt-1 max-w-2xl">
            Earn experience, eco-coins, and bragging rights by completing real-world sustainability challenges. New missions refresh regularly, so check back often!
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh Challenges'}
        </button>
      </div>

      {!user?.id && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
          Sign in to track your progress, earn XP, and save completed challenges.
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-semibold">{error}</p>
            <button onClick={loadData} className="mt-2 text-sm font-semibold text-red-700 hover:text-red-800 underline">
              Try again
            </button>
          </div>
        </div>
      )}

      {loading && challenges.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
          <span className="ml-3 text-gray-600">Loading challenges...</span>
        </div>
      )}

      {!loading && challenges.length === 0 && !error && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
          <div className="text-5xl mb-4">🌿</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No challenges yet</h3>
          <p className="text-gray-600">Check back soon for new sustainability missions from the EcoLearn team.</p>
        </div>
      )}

      {Object.entries(challengesByType).map(([type, group]) => {
        const meta = typeMeta[type as Challenge['type']]
        if (!group || group.length === 0) return null

        return (
          <section key={type} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br ${meta.accent} text-white`}>
                {meta.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{meta.title}</h3>
                <p className="text-gray-600 text-sm">{meta.description}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.map(renderChallengeCard)}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default ChallengeExplorer
