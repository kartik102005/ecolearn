export type CourseCompletedEvent = {
  id?: string
  type: 'course_completed'
  timestamp?: string
  payload: {
    userId: string
    courseId: string
    courseTitle: string
    xpAwarded: number
    completedAt: string
  }
}

export type TeamInviteEvent = {
  id?: string
  type: 'team_invite'
  timestamp?: string
  payload: {
    userId: string
    inviteId: string
    teamName: string
    inviter: string
    message?: string
  }
}

export type StreakMilestoneEvent = {
  id?: string
  type: 'streak_milestone'
  timestamp?: string
  payload: {
    userId: string
    streakLength: number
    longestStreak: number
  }
}

export type NotificationEvent = CourseCompletedEvent | TeamInviteEvent | StreakMilestoneEvent

export type NotificationEventListener = (event: Required<NotificationEvent>) => void

const listeners = new Set<NotificationEventListener>()

const generateId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `notif-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`
}

const withDefaults = (event: NotificationEvent): Required<NotificationEvent> => ({
  ...event,
  id: event.id ?? generateId(),
  timestamp: event.timestamp ?? new Date().toISOString(),
})

export const publishNotificationEvent = (event: NotificationEvent) => {
  const prepared = withDefaults(event)
  listeners.forEach((listener) => {
    try {
      listener(prepared)
    } catch (error) {
      console.error('Notification listener failed', error)
    }
  })
}

export const subscribeToNotificationEvents = (listener: NotificationEventListener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
