import { publishNotificationEvent } from '@/lib/notificationBus'

export type TeamInviteStatus = 'pending' | 'accepted' | 'declined'

export interface TeamInvite {
  inviteId: string
  teamName: string
  inviter: string
  message?: string
  status: TeamInviteStatus
  createdAt: string
  notifiedAt?: string
}

const storageKey = (userId: string) => `eco-team-invites-${userId}`

const readInvites = (userId: string): TeamInvite[] => {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (error) {
    console.warn('Failed to read team invites from storage', error)
    return []
  }
}

const writeInvites = (userId: string, invites: TeamInvite[]) => {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(invites))
  } catch (error) {
    console.warn('Failed to persist team invites to storage', error)
  }
}

const generateInviteId = () => `invite-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`

export const teamInviteService = {
  listInvites(userId: string): TeamInvite[] {
    return readInvites(userId)
  },

  markNotified(userId: string, inviteIds: string[]): void {
    if (inviteIds.length === 0) return
    const invites = readInvites(userId)
    let modified = false
    const now = new Date().toISOString()

    const updated = invites.map((invite) => {
      if (inviteIds.includes(invite.inviteId) && !invite.notifiedAt) {
        modified = true
        return { ...invite, notifiedAt: now }
      }
      return invite
    })

    if (modified) {
      writeInvites(userId, updated)
    }
  },

  seedDemoInvites(userId: string): TeamInvite[] {
    const existing = readInvites(userId)
    if (existing.length > 0) {
      return existing
    }

    const baseInvites: TeamInvite[] = [
      {
        inviteId: generateInviteId(),
        teamName: 'Green Innovators',
        inviter: 'Ava Martinez',
        message: 'Join us to lead the new Eco Robotics initiative this week!',
        status: 'pending',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      {
        inviteId: generateInviteId(),
        teamName: 'Ocean Guardians',
        inviter: 'Liam Chen',
        message: 'We loved your cleanup mission updates. Ready to co-lead the coral reef project?',
        status: 'pending',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      },
    ]

    writeInvites(userId, baseInvites)
    return baseInvites
  },

  createInvite(
    userId: string,
    invite: Omit<TeamInvite, 'inviteId' | 'createdAt' | 'status'> & { status?: TeamInviteStatus }
  ): TeamInvite {
    const newInvite: TeamInvite = {
      inviteId: generateInviteId(),
      teamName: invite.teamName,
      inviter: invite.inviter,
      message: invite.message,
      status: invite.status ?? 'pending',
      createdAt: new Date().toISOString(),
    }

    const invites = [newInvite, ...readInvites(userId)]
    writeInvites(userId, invites)

    publishNotificationEvent({
      id: `team-invite-${newInvite.inviteId}`,
      type: 'team_invite',
      timestamp: newInvite.createdAt,
      payload: {
        userId,
        inviteId: newInvite.inviteId,
        teamName: newInvite.teamName,
        inviter: newInvite.inviter,
        message: newInvite.message,
      },
    })

    return newInvite
  },
}
