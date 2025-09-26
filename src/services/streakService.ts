import { publishNotificationEvent } from '@/lib/notificationBus'

interface StreakState {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
  lastMilestoneNotifiedAt?: string | null
}

interface RecordResult {
  state: StreakState
  milestoneReached: boolean
}

const storageKey = (userId: string) => `eco-streak-${userId}`
const todayKey = (date: Date) => date.toISOString().slice(0, 10)

const readState = (userId: string): StreakState => {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      }
    }
    const parsed = JSON.parse(raw)
    return {
      currentStreak: Number(parsed.currentStreak) || 0,
      longestStreak: Number(parsed.longestStreak) || 0,
      lastActiveDate: typeof parsed.lastActiveDate === 'string' ? parsed.lastActiveDate : null,
      lastMilestoneNotifiedAt: parsed.lastMilestoneNotifiedAt ?? null,
    }
  } catch (error) {
    console.warn('Failed to read streak state. Resetting streak.', error)
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    }
  }
}

const writeState = (userId: string, state: StreakState) => {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to persist streak state.', error)
  }
}

const MILESTONES = new Set([3, 5, 7, 10, 14, 21, 30])

export const streakService = {
  getState(userId: string): StreakState {
    return readState(userId)
  },

  recordDailyEngagement(userId: string, now: Date = new Date()): RecordResult {
    const state = readState(userId)
    const today = todayKey(now)

    if (state.lastActiveDate === today) {
      return { state, milestoneReached: false }
    }

    let nextStreak = 1
    if (state.lastActiveDate) {
      const last = new Date(state.lastActiveDate)
      const diffInDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
      if (diffInDays === 1) {
        nextStreak = state.currentStreak + 1
      } else if (diffInDays <= 0) {
        nextStreak = state.currentStreak
      }
    }

    const nextLongest = Math.max(state.longestStreak, nextStreak)
    const updated: StreakState = {
      currentStreak: nextStreak,
      longestStreak: nextLongest,
      lastActiveDate: today,
      lastMilestoneNotifiedAt: state.lastMilestoneNotifiedAt ?? null,
    }

    let milestoneReached = false
    if (nextStreak >= 2 && nextStreak > state.currentStreak) {
      const isMilestone = MILESTONES.has(nextStreak)
      const improvedLongest = nextStreak > state.longestStreak
      milestoneReached = isMilestone || improvedLongest

      if (milestoneReached) {
        updated.lastMilestoneNotifiedAt = today
        publishNotificationEvent({
          type: 'streak_milestone',
          payload: {
            userId,
            streakLength: nextStreak,
            longestStreak: nextLongest,
          },
        })
      }
    }

    writeState(userId, updated)

    return { state: updated, milestoneReached }
  },
}
