import { useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchLeaderboard,
  fetchUserRank,
  subscribeToProfilesChanges,
  type LeaderboardEntry,
  type LeaderboardScope,
} from '@/services/leaderboardService'

const leaderboardQueryKey = (scope: LeaderboardScope, institution: string | null, limit: number) =>
  ['leaderboard', scope, institution, limit] as const

const leaderboardRankQueryKey = (
  scope: LeaderboardScope,
  institution: string | null,
  userId: string | null,
) => ['leaderboard-rank', scope, institution, userId] as const

interface UseLeaderboardDataOptions {
  scope: LeaderboardScope
  institution?: string | null
  userId?: string | null
  limit?: number
  enabled?: boolean
}

interface UseLeaderboardDataResult {
  entries: LeaderboardEntry[]
  scopeUsed: LeaderboardScope
  currentRank: number | null
  isLoading: boolean
  isFetching: boolean
  leaderboardError: Error | null
  rankError: Error | null
  refetchLeaderboard: () => Promise<void>
  refetchRank: () => Promise<void>
  invalidateAll: () => Promise<void>
  isSchoolScopeDisabled: boolean
}

type LeaderboardError = Error & { scopeUsed?: LeaderboardScope }

export const useLeaderboardData = ({
  scope,
  institution = null,
  userId = null,
  limit = 100,
  enabled = true,
}: UseLeaderboardDataOptions): UseLeaderboardDataResult => {
  const queryClient = useQueryClient()
  const institutionKey = institution ?? null
  const isSchoolScopeDisabled = scope === 'school' && !institution
  const effectiveEnabled = enabled && !isSchoolScopeDisabled

  const leaderboardQuery = useQuery({
    queryKey: leaderboardQueryKey(scope, institutionKey, limit),
    staleTime: 30_000,
    gcTime: 10 * 60_000,
    enabled: effectiveEnabled,
    queryFn: async () => {
      const result = await fetchLeaderboard(scope, institution ?? undefined, limit)
      if (result.error) {
        const error: LeaderboardError = new Error(
          typeof result.error === 'object' && result.error !== null && 'message' in result.error
            ? String(result.error.message)
            : 'Failed to load leaderboard data',
        )
        error.scopeUsed = result.scopeUsed
        throw error
      }
      return result
    },
  })

  const rankQuery = useQuery({
    queryKey: leaderboardRankQueryKey(scope, institutionKey, userId),
    staleTime: 15_000,
    gcTime: 10 * 60_000,
    enabled: effectiveEnabled && Boolean(userId),
    queryFn: async () => {
      const result = await fetchUserRank(scope, userId as string, institution ?? undefined)
      if (result.error) {
        throw new Error(
          typeof result.error === 'object' && result.error !== null && 'message' in result.error
            ? String(result.error.message)
            : 'Failed to load leaderboard rank',
        )
      }
      return result.rank ?? null
    },
  })

  useEffect(() => {
    if (!effectiveEnabled) return

    const unsubscribe = subscribeToProfilesChanges(() => {
      queryClient.invalidateQueries({ queryKey: leaderboardQueryKey(scope, institutionKey, limit) })
      if (userId) {
        queryClient.invalidateQueries({ queryKey: leaderboardRankQueryKey(scope, institutionKey, userId) })
      }
    })

    return () => unsubscribe()
  }, [effectiveEnabled, institutionKey, limit, queryClient, scope, userId])

  const scopeUsed = useMemo<LeaderboardScope>(() => {
    if (!effectiveEnabled) return scope
    if (leaderboardQuery.error && (leaderboardQuery.error as LeaderboardError)?.scopeUsed) {
      return (leaderboardQuery.error as LeaderboardError).scopeUsed as LeaderboardScope
    }
    return leaderboardQuery.data?.scopeUsed ?? scope
  }, [effectiveEnabled, leaderboardQuery.data?.scopeUsed, leaderboardQuery.error, scope])

  const entries = effectiveEnabled ? leaderboardQuery.data?.data ?? [] : []

  const refetchLeaderboard = async () => {
    await leaderboardQuery.refetch()
  }

  const refetchRank = async () => {
    await rankQuery.refetch()
  }

  const invalidateAll = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: leaderboardQueryKey(scope, institutionKey, limit) }),
      queryClient.invalidateQueries({ queryKey: leaderboardRankQueryKey(scope, institutionKey, userId) }),
    ])
  }

  return {
    entries,
    scopeUsed,
    currentRank: rankQuery.data ?? null,
    isLoading: leaderboardQuery.isLoading,
    isFetching: leaderboardQuery.isFetching || rankQuery.isFetching,
    leaderboardError: (leaderboardQuery.error as Error) ?? null,
    rankError: (rankQuery.error as Error) ?? null,
    refetchLeaderboard,
    refetchRank,
    invalidateAll,
    isSchoolScopeDisabled,
  }
}
