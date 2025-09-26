import { Challenge, ChallengeProgress, mockDB } from '@/lib/mockData'
import { awardXP } from '@/services/xpService'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const challengeService = {
  async getAllChallenges(): Promise<Challenge[]> {
    try {
      await delay(150)
      const challenges = mockDB.getChallenges()
      if (!challenges || !Array.isArray(challenges)) {
        console.warn('Invalid challenge data, returning empty array')
        return []
      }
      return challenges
    } catch (error) {
      console.error('Error fetching challenges:', error)
      return []
    }
  },

  async getActiveChallenges(): Promise<Challenge[]> {
    try {
      await delay(150)
      return mockDB.getActiveChallenges()
    } catch (error) {
      console.error('Error fetching active challenges:', error)
      return []
    }
  },

  async getChallengesByType(type: 'daily' | 'weekly' | 'monthly' | 'special'): Promise<Challenge[]> {
    try {
      await delay(150)
      return mockDB.getChallengesByType(type)
    } catch (error) {
      console.error('Error fetching challenges by type:', error)
      return []
    }
  },

  async getUserChallengeProgress(userId: string, options?: { disableDemo?: boolean }): Promise<ChallengeProgress[]> {
    try {
      await delay(120)
      if (!userId) {
        return []
      }

      return mockDB.getChallengeProgress(userId)
    } catch (error) {
      console.error('Error fetching challenge progress:', error)
      return []
    }
  },

  async joinChallenge(userId: string, challengeId: string): Promise<void> {
    try {
      await delay(180)
      if (!userId) return

      const existing = mockDB.getChallengeProgress(userId).find(p => p.id === challengeId)
      if (existing) {
        return
      }

      const progress: ChallengeProgress = {
        id: challengeId,
        user_id: userId,
        progress: 0,
        completed: false,
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      mockDB.addChallengeProgress(progress)
      mockDB.updateChallengeParticipants(challengeId, 1)
    } catch (error) {
      console.error('Error joining challenge:', error)
      throw error
    }
  },

  async updateChallengeProgress(userId: string, challengeId: string, progress: number): Promise<void> {
    try {
      await delay(180)
      if (!userId) return

      const safeProgress = Math.max(0, Math.min(100, Math.floor(progress)))
      const currentProgress = mockDB.getChallengeProgress(userId).find(p => p.id === challengeId)

      if (!currentProgress) {
        // Auto-join if user updates progress without joining first
        await this.joinChallenge(userId, challengeId)
      }

      const completed = safeProgress >= 100

      mockDB.updateChallengeProgress(userId, challengeId, {
        progress: safeProgress,
        completed,
        completed_at: completed ? new Date().toISOString() : undefined
      })

      if (completed && !currentProgress?.completed) {
        await this.awardChallengePoints(userId, challengeId)
      }
    } catch (error) {
      console.error('Error updating challenge progress:', error)
      throw error
    }
  },

  async awardChallengePoints(userId: string, challengeId: string): Promise<void> {
    try {
      await delay(100)
      if (!userId) return

      const challenge = mockDB.getChallenges().find(c => c.id === challengeId)
      if (!challenge) return

      mockDB.updateChallengeParticipants(challengeId, 0) // no-op ensures persistence

      const { error } = await awardXP(userId, challenge.points, {
        reason: 'challenge_completion',
        awardCoins: true
      })

      if (error) {
        console.warn('Failed to award XP for challenge completion:', error)
      }
    } catch (error) {
      console.error('Error awarding challenge points:', error)
    }
  },

  async seedChallenges(): Promise<void> {
    await delay(150)
    console.log('Challenges already seeded in mock database')
  }
}
