import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useAuth } from '@/contexts/auth-context'
import {
  publishNotificationEvent,
  subscribeToNotificationEvents,
  type NotificationEvent,
} from '@/lib/notificationBus'
import { teamInviteService } from '@/services/teamInviteService'
import { streakService } from '@/services/streakService'

export type NotificationCategory = 'course' | 'team' | 'streak' | 'system'

export type NotificationType = NotificationEvent['type'] | 'system'

export interface NotificationEntity {
  id: string
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  read: boolean
  createdAt: string
  meta?: Record<string, unknown>
}

interface NotificationStore {
  entities: Record<string, NotificationEntity>
  order: string[]
}

interface NotificationContextValue {
  notifications: NotificationEntity[]
  unreadCount: number
  countsByType: Record<string, number>
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  dismissNotification: (id: string) => void
  setReadState: (ids: string[], read: boolean) => void
  publish: (notification: NotificationEntity) => void
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)

const MAX_NOTIFICATIONS = 50

const emptyStore: NotificationStore = {
  entities: {},
  order: [],
}

const storageKey = (userId: string) => `eco-notifications-${userId}`

const safeDateMs = (value: string) => {
  const ms = Date.parse(value)
  return Number.isNaN(ms) ? Date.now() : ms
}

const readStore = (userId: string): NotificationStore => {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) return emptyStore
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return emptyStore
    const { entities, order } = parsed as NotificationStore
    if (!entities || typeof entities !== 'object' || !Array.isArray(order)) return emptyStore

    // Sanitize data structure
    const cleanedEntities: Record<string, NotificationEntity> = {}
    const cleanedOrder: string[] = []

    order.forEach((id) => {
      const entity = (entities as Record<string, NotificationEntity | undefined>)[id]
      if (!entity) return
      cleanedEntities[id] = entity
      cleanedOrder.push(id)
    })

    return {
      entities: cleanedEntities,
      order: cleanedOrder,
    }
  } catch (error) {
    console.warn('Failed to read notifications from storage', error)
    return emptyStore
  }
}

const writeStore = (userId: string, store: NotificationStore) => {
  try {
    const trimmedOrder = store.order.slice(0, MAX_NOTIFICATIONS)
    const trimmedEntities: Record<string, NotificationEntity> = {}
    trimmedOrder.forEach((id) => {
      const entity = store.entities[id]
      if (entity) {
        trimmedEntities[id] = entity
      }
    })

    localStorage.setItem(
      storageKey(userId),
      JSON.stringify({
        entities: trimmedEntities,
        order: trimmedOrder,
      }),
    )
  } catch (error) {
    console.warn('Failed to persist notifications to storage', error)
  }
}

const buildSystemWelcomeNotification = (userId: string): NotificationEntity => ({
  id: `welcome-${userId}`,
  type: 'system',
  category: 'system',
  title: 'Welcome to EcoLearn! 🌿',
  message: 'Track your achievements here. Finish courses, keep your streak, and collaborate with teams to earn rewards.',
  read: false,
  createdAt: new Date().toISOString(),
})

const convertEventToNotification = (event: Required<NotificationEvent>): NotificationEntity => {
  switch (event.type) {
    case 'course_completed': {
      const { courseTitle, xpAwarded, completedAt, courseId } = event.payload
      return {
        id: event.id,
        type: event.type,
        category: 'course',
        title: `Course Complete: ${courseTitle}`,
        message: `You earned ${xpAwarded} XP for finishing ${courseTitle}.`,
        read: false,
        createdAt: event.timestamp,
        meta: {
          xpAwarded,
          completedAt,
          courseId,
          courseTitle,
        },
      }
    }
    case 'team_invite': {
      const { teamName, inviter, inviteId, message } = event.payload
      return {
        id: event.id,
        type: event.type,
        category: 'team',
        title: `Team Invite: ${teamName}`,
        message: message ?? `${inviter} invited you to join ${teamName}.`,
        read: false,
        createdAt: event.timestamp,
        meta: {
          teamName,
          inviter,
          inviteId,
        },
      }
    }
    case 'streak_milestone': {
      const { streakLength, longestStreak } = event.payload
      return {
        id: event.id,
        type: event.type,
        category: 'streak',
        title: `🔥 ${streakLength}-Day Learning Streak!`,
        message: `Keep it going! Your longest streak is now ${longestStreak} days.`,
        read: false,
        createdAt: event.timestamp,
        meta: {
          streakLength,
          longestStreak,
        },
      }
    }
    default: {
      const fallbackEvent = event as unknown as Required<NotificationEvent>
      console.warn('Unhandled notification event type', fallbackEvent)
      return {
        id: fallbackEvent.id,
        type: 'system',
        category: 'system',
        title: 'Notification',
        message: 'You have a new notification.',
        read: false,
        createdAt: fallbackEvent.timestamp ?? new Date().toISOString(),
      }
    }
  }
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth()
  const userId = useMemo(() => profile?.id ?? user?.id ?? user?.email ?? null, [profile?.id, user?.email, user?.id])
  const [store, setStore] = useState<NotificationStore>(emptyStore)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (!userId) {
      setStore(emptyStore)
      setHasLoaded(false)
      return
    }

    const stored = readStore(userId)
    if (stored.order.length === 0) {
      const welcome = buildSystemWelcomeNotification(userId)
      setStore({
        entities: { [welcome.id]: welcome },
        order: [welcome.id],
      })
    } else {
      setStore(stored)
    }
    setHasLoaded(true)
  }, [userId])

  useEffect(() => {
    if (!userId || !hasLoaded) return
    writeStore(userId, store)
  }, [userId, store, hasLoaded])

  const ingestNotification = useCallback(
    (notification: NotificationEntity) => {
      setStore((prev) => {
        const previousEntity = prev.entities[notification.id]
        const mergedEntity: NotificationEntity = {
          ...notification,
          read: previousEntity ? previousEntity.read && notification.read : notification.read,
        }

        const entities = {
          ...prev.entities,
          [notification.id]: mergedEntity,
        }

        const nextOrder = prev.order.filter((id) => id !== notification.id)
        nextOrder.push(notification.id)
        nextOrder.sort((a, b) => safeDateMs(entities[b].createdAt) - safeDateMs(entities[a].createdAt))

        return {
          entities,
          order: nextOrder.slice(0, MAX_NOTIFICATIONS),
        }
      })
    },
    [],
  )

  const handleIncomingEvent = useCallback(
    (event: Required<NotificationEvent>) => {
      if (!userId) return
      if ('payload' in event && 'userId' in event.payload && event.payload.userId !== userId) return

      const entity = convertEventToNotification(event)
      ingestNotification(entity)

      if (event.type === 'team_invite' && 'inviteId' in event.payload) {
        teamInviteService.markNotified(userId, [event.payload.inviteId])
      }
    },
    [ingestNotification, userId],
  )

  useEffect(() => {
    if (!userId) return
    const unsubscribe = subscribeToNotificationEvents(handleIncomingEvent)
    return unsubscribe
  }, [handleIncomingEvent, userId])

  useEffect(() => {
    if (!userId) return
    const invites = teamInviteService.seedDemoInvites(userId)
    const pendingInvites = invites.filter((invite) => invite.status === 'pending' && !invite.notifiedAt)

    if (pendingInvites.length > 0) {
      pendingInvites.forEach((invite) => {
        ingestNotification({
          id: `team-invite-${invite.inviteId}`,
          type: 'team_invite',
          category: 'team',
          title: `Team Invite: ${invite.teamName}`,
          message: invite.message ?? `${invite.inviter} invited you to join ${invite.teamName}.`,
          read: false,
          createdAt: invite.createdAt,
          meta: {
            teamName: invite.teamName,
            inviter: invite.inviter,
            inviteId: invite.inviteId,
          },
        })
      })

      teamInviteService.markNotified(userId, pendingInvites.map((invite) => invite.inviteId))
    }
  }, [ingestNotification, userId])

  useEffect(() => {
    if (!userId) return
    streakService.recordDailyEngagement(userId)
  }, [userId])

  const notifications = useMemo(() => store.order.map((id) => store.entities[id]).filter(Boolean), [store.entities, store.order])

  const unreadCount = useMemo(() => notifications.filter((notif) => !notif.read).length, [notifications])

  const countsByType = useMemo(() => {
    return notifications.reduce<Record<string, number>>((acc, notification) => {
      const key = notification.type
      const unreadKey = `${notification.type}-unread`
      acc[key] = (acc[key] ?? 0) + 1
      if (!notification.read) {
        acc['unread'] = (acc['unread'] ?? 0) + 1
        acc[unreadKey] = (acc[unreadKey] ?? 0) + 1
        acc[notification.category] = (acc[notification.category] ?? 0) + 1
      }
      return acc
    }, {})
  }, [notifications])

  const markAsRead = useCallback((id: string) => {
    setStore((prev) => {
      const entity = prev.entities[id]
      if (!entity || entity.read) return prev
      return {
        entities: {
          ...prev.entities,
          [id]: { ...entity, read: true },
        },
        order: prev.order,
      }
    })
  }, [])

  const setReadState = useCallback((ids: string[], read: boolean) => {
    if (ids.length === 0) return
    setStore((prev) => {
      const entities = { ...prev.entities }
      let changed = false
      ids.forEach((id) => {
        const entity = entities[id]
        if (!entity) return
        if (entity.read !== read) {
          entities[id] = { ...entity, read }
          changed = true
        }
      })
      if (!changed) return prev
      return {
        entities,
        order: prev.order,
      }
    })
  }, [])

  const markAllAsRead = useCallback(() => {
    setStore((prev) => {
      const entities = { ...prev.entities }
      let changed = false
      Object.entries(entities).forEach(([id, entity]) => {
        if (!entity.read) {
          entities[id] = { ...entity, read: true }
          changed = true
        }
      })
      if (!changed) return prev
      return {
        entities,
        order: prev.order,
      }
    })
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setStore((prev) => {
      if (!prev.entities[id]) return prev
      const entities = { ...prev.entities }
      delete entities[id]
      return {
        entities,
        order: prev.order.filter((entry) => entry !== id),
      }
    })
  }, [])

  const contextValue = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount,
      countsByType,
      markAsRead,
      markAllAsRead,
      dismissNotification,
      setReadState,
      publish: ingestNotification,
    }),
    [notifications, unreadCount, countsByType, markAsRead, markAllAsRead, dismissNotification, setReadState, ingestNotification],
  )

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
