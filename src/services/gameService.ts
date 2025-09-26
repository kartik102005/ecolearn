import { Game, UserProgress, mockDB } from '@/lib/mockData'
import { awardXP } from '@/services/xpService'

export interface GameProgressEntry extends UserProgress {
  game: {
    id: string
    title: string
    category: Game['category']
    difficulty: Game['difficulty']
    duration: string
    players: Game['players']
    points: number
    icon: string
    color: string
  } | null
}

export interface GameLeaderboardEntry {
  high_score: number
  profiles: {
    username?: string
    full_name?: string
    avatar_url?: string
  }
}

export const gameService = {
  // Get all active games
  async getActiveGames(): Promise<Game[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockDB.getActiveGames()
  },

  // Get games by category
  async getGamesByCategory(category: 'quiz' | 'puzzle' | 'simulation' | 'adventure' | 'memory'): Promise<Game[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockDB.getGamesByCategory(category)
  },

  // Get user's game progress
  async getUserGameProgress(userId: string): Promise<GameProgressEntry[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    const progress = mockDB.getUserProgress(userId)
    const games = mockDB.getGames()
    
    // Join progress with game data
    const mapped: GameProgressEntry[] = progress.map(p => {
      const game = games.find(g => g.id === p.id)
      return {
        ...p,
        game: game
          ? {
              id: game.id,
              title: game.title,
              category: game.category,
              difficulty: game.difficulty,
              duration: game.duration,
              players: game.players,
              points: game.points,
              icon: game.icon,
              color: game.color
            }
          : null
      }
    })

    return mapped
  },

  // Start playing a game
  async startGame(userId: string, gameId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const progress = mockDB.getUserProgress(userId)
    const existingProgress = progress.find(p => p.id === gameId)
    
    if (existingProgress) {
      // Update last played time (in a real app, you'd store this)
      console.log(`Updated last played time for game ${gameId}`)
    } else {
      // Create new game progress record
      const newProgress: UserProgress = {
        id: gameId,
        user_id: userId,
        progress: 0,
        completed: false,
        started_at: new Date().toISOString()
      }
      mockDB.addUserProgress(newProgress)
    }
  },

  // Update game score
  async updateGameScore(userId: string, gameId: string, score: number): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const progress = mockDB.getUserProgress(userId)
    const currentProgress = progress.find(p => p.id === gameId)
    
    if (!currentProgress) {
      console.error('No game progress found')
      return
    }

    // In a real app, you'd store high_score and times_played
    // For now, just log the update
    console.log(`Updated game score for ${gameId}: ${score}`)
    
    // Award XP for score (simplified)
    await this.awardGameXP(userId, gameId, score)
  },

  // Complete a game
  async completeGame(userId: string, gameId: string, finalScore: number): Promise<void> {
    await this.updateGameScore(userId, gameId, finalScore)

    // Update completion status
    mockDB.updateUserProgress(userId, gameId, {
      completed: true,
      completed_at: new Date().toISOString(),
      progress: 100
    })

    // Award completion bonus
    await this.awardGameCompletionBonus(userId, gameId)
  },

  // Award XP for game performance
  async awardGameXP(userId: string, gameId: string, score: number): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const games = mockDB.getGames()
    const game = games.find(g => g.id === gameId)

    if (!game) return

    // Calculate XP based on score and difficulty
    let xpReward = Math.floor(score / 100) // Base XP from score
    if (game.difficulty === 'medium') xpReward *= 1.2
    if (game.difficulty === 'hard') xpReward *= 1.5

    // Minimum XP reward
    xpReward = Math.max(xpReward, 10)

    // Award real XP via Supabase
    await awardXP(userId, Math.floor(xpReward), { reason: 'game_score', awardCoins: true })
  },

  // Award completion bonus
  async awardGameCompletionBonus(userId: string, gameId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const games = mockDB.getGames()
    const game = games.find(g => g.id === gameId)

    if (!game) return

    // Award bonus XP for completion
    const bonusXP = Math.floor(game.points * 0.5)
    await awardXP(userId, bonusXP, { reason: 'game_completion', awardCoins: true })
  },

  // Get leaderboard for a specific game
  async getGameLeaderboard(gameId: string, limit: number = 10): Promise<GameLeaderboardEntry[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Mock leaderboard data
    const mockLeaderboard: GameLeaderboardEntry[] = [
      { high_score: 2500, profiles: { username: 'ecomaster123', full_name: 'Alex Green', avatar_url: '' }},
      { high_score: 2200, profiles: { username: 'planetlover', full_name: 'Sarah Nature', avatar_url: '' }},
      { high_score: 1980, profiles: { username: 'greenfuture', full_name: 'Mike Eco', avatar_url: '' }},
      { high_score: 1750, profiles: { username: 'earthsaver', full_name: 'Emma Leaf', avatar_url: '' }},
      { high_score: 1600, profiles: { username: 'climatehero', full_name: 'John Forest', avatar_url: '' }}
    ]
    
    return mockLeaderboard.slice(0, limit)
  },

  // Seed initial games (for development) - now using mock data
  async seedGames(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Games are already seeded in mockData.ts during initialization
    console.log('Games already seeded in mock database')
  }
}
