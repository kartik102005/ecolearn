// Mock data types and mock database

export interface Profile {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
  level: number
  total_xp: number
  eco_coins: number
  created_at: string
  updated_at: string
}

export interface CourseLesson {
  id: string
  courseId: string
  slug: string
  title: string
  description?: string
  orderIndex: number
  duration?: string
  videoStoragePath?: string | null
  videoThumbnailPath?: string | null
  videoSignedUrl?: string | null
  videoThumbnailUrl?: string | null
  transcript?: string
  created_at?: string
  updated_at?: string
}

export interface Course {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  lessons: number
  duration: string
  topics: string[]
  icon: string
  color: string
  introVideoStoragePath?: string | null
  introVideoThumbnailPath?: string | null
  introVideoSignedUrl?: string | null
  introVideoThumbnailUrl?: string | null
  lessonModules?: CourseLesson[]
  created_at: string
}

const DEFAULT_VIDEO_ID = '5eTCZ9L834s'
const DEFAULT_INTRO_VIDEO_URL = `https://www.youtube.com/embed/${DEFAULT_VIDEO_ID}`
const DEFAULT_THUMBNAIL_URL = `https://img.youtube.com/vi/${DEFAULT_VIDEO_ID}/hqdefault.jpg`

const createLessonModules = (courseId: string, topics: string[]): CourseLesson[] =>
  topics.map((topic, index) => ({
    id: `${courseId}-lesson-${index + 1}`,
    courseId,
    slug: `lesson-${index + 1}`,
    title: topic,
    description: `Learn about ${topic}`,
    orderIndex: index,
    videoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    videoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
  }))

const course1Topics = [
  'Components of Environment (Air, Water, Soil, Living Organisms)',
  'Natural vs. Man-Made Environment',
  'Importance of Environmental Awareness'
]
const course2Topics = [
  'Types of Ecosystems (Forest, Desert, Aquatic)',
  'Food Chains and Food Webs',
  'Importance of Biodiversity'
]
const course3Topics = [
  'Renewable and Non-renewable Resources',
  'Water and Soil Conservation',
  'Sustainable Use of Resources'
]
const course4Topics = [
  'Air, Water, and Soil Pollution',
  'Noise and Plastic Pollution',
  'Health and Environmental Impact'
]
const course5Topics = [
  'Causes (Greenhouse Gases, Deforestation, Industrialization)',
  'Effects on Weather Patterns, Agriculture, and Health',
  'International Efforts (Kyoto Protocol, Paris Agreement)'
]
const course6Topics = [
  'Environmental Protection Act',
  'Forest and Wildlife Protection Laws',
  'Role of NGOs and Citizens'
]
const course7Topics = [
  'Principles of Sustainability',
  'Green Energy (Solar, Wind, Hydropower)',
  'Sustainable Agriculture and Urban Planning'
]
const course8Topics = [
  'Waste-to-Energy Technologies',
  'Electric Vehicles and Clean Transport',
  'Smart Cities and Green Architecture'
]
const course9Topics = [
  'Deforestation and Desertification',
  'Loss of Biodiversity and Species Extinction',
  'International Cooperation and Future Challenges'
]

const course1Lessons = createLessonModules('course-1', course1Topics)
const course2Lessons = createLessonModules('course-2', course2Topics)
const course3Lessons = createLessonModules('course-3', course3Topics)
const course4Lessons = createLessonModules('course-4', course4Topics)
const course5Lessons = createLessonModules('course-5', course5Topics)
const course6Lessons = createLessonModules('course-6', course6Topics)
const course7Lessons = createLessonModules('course-7', course7Topics)
const course8Lessons = createLessonModules('course-8', course8Topics)
const course9Lessons = createLessonModules('course-9', course9Topics)

export interface Game {
  id: string
  title: string
  description: string
  category: 'quiz' | 'puzzle' | 'simulation' | 'adventure' | 'memory'
  difficulty: 'easy' | 'medium' | 'hard'
  duration: string
  players: 'single' | 'multiplayer'
  points: number
  icon: string
  color: string
  active: boolean
  created_at: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  time_limit: string
  deadline?: string
  start_at?: string
  icon: string
  color: string
  active: boolean
  participants: number
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  progress: number
  completed: boolean
  started_at: string
  completed_at?: string
}

export interface ChallengeProgress {
  id: string
  user_id: string
  progress: number
  completed: boolean
  started_at: string
  completed_at?: string
  updated_at: string
}

// Mock Data
export const mockCourses: Course[] = [
  // Beginner Courses
  {
    id: 'course-1',
    title: 'Introduction to Environment',
    description: 'Learn the fundamentals of environmental science including air, water, soil, and living organisms.',
    difficulty: 'beginner',
    lessons: course1Lessons.length,
    duration: '3 weeks',
    topics: course1Topics,
    icon: '🌱',
    color: 'from-green-500 to-emerald-600',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course1Lessons,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'course-2',
    title: 'Ecosystems and Biodiversity',
    description: 'Explore different ecosystems and understand the importance of biodiversity in nature.',
    difficulty: 'beginner',
    lessons: course2Lessons.length,
    duration: '4 weeks',
    topics: course2Topics,
    icon: '🦋',
    color: 'from-blue-500 to-cyan-600',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course2Lessons,
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: 'course-3',
    title: 'Natural Resources',
    description: 'Understanding and conserving our planet\'s valuable natural resources for future generations.',
    difficulty: 'beginner',
    lessons: course3Lessons.length,
    duration: '3 weeks',
    topics: course3Topics,
    icon: '💧',
    color: 'from-purple-500 to-indigo-600',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course3Lessons,
    created_at: '2024-01-03T00:00:00Z'
  },
  // Intermediate Courses
  {
    id: 'course-4',
    title: 'Pollution and Its Effects',
    description: 'Comprehensive study of pollution types and their devastating impacts on environment and health.',
    difficulty: 'intermediate',
    lessons: course4Lessons.length,
    duration: '4 weeks',
    topics: course4Topics,
    icon: '🏭',
    color: 'from-orange-500 to-red-600',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course4Lessons,
    created_at: '2024-01-04T00:00:00Z'
  },
  {
    id: 'course-5',
    title: 'Climate Change and Global Warming',
    description: 'Understanding causes, effects, and global efforts to combat climate change and global warming.',
    difficulty: 'intermediate',
    lessons: course5Lessons.length,
    duration: '5 weeks',
    topics: course5Topics,
    icon: '🌡️',
    color: 'from-red-500 to-pink-600',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course5Lessons,
    created_at: '2024-01-05T00:00:00Z'
  },
  {
    id: 'course-6',
    title: 'Environmental Laws and Policies',
    description: 'Study of environmental legislation and policy frameworks for environmental protection.',
    difficulty: 'intermediate',
    lessons: course6Lessons.length,
    duration: '4 weeks',
    topics: course6Topics,
    icon: '⚖️',
    color: 'from-indigo-500 to-purple-600',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course6Lessons,
    created_at: '2024-01-06T00:00:00Z'
  },
  // Advanced Courses
  {
    id: 'course-7',
    title: 'Sustainable Development',
    description: 'Master the principles of sustainability and explore green technologies for a better future.',
    difficulty: 'advanced',
    lessons: course7Lessons.length,
    duration: '6 weeks',
    topics: course7Topics,
    icon: '♻️',
    color: 'from-teal-600 to-green-700',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course7Lessons,
    created_at: '2024-01-07T00:00:00Z'
  },
  {
    id: 'course-8',
    title: 'Emerging Environmental Technologies',
    description: 'Advanced technologies and innovations for solving environmental challenges.',
    difficulty: 'advanced',
    lessons: course8Lessons.length,
    duration: '5 weeks',
    topics: course8Topics,
    icon: '🔬',
    color: 'from-cyan-600 to-blue-700',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course8Lessons,
    created_at: '2024-01-08T00:00:00Z'
  },
  {
    id: 'course-9',
    title: 'Global Environmental Issues',
    description: 'Critical analysis of worldwide environmental challenges and international cooperation.',
    difficulty: 'advanced',
    lessons: course9Lessons.length,
    duration: '6 weeks',
    topics: course9Topics,
    icon: '🌍',
    color: 'from-slate-600 to-gray-800',
    introVideoSignedUrl: DEFAULT_INTRO_VIDEO_URL,
    introVideoThumbnailUrl: DEFAULT_THUMBNAIL_URL,
    lessonModules: course9Lessons,
    created_at: '2024-01-09T00:00:00Z'
  }
]

export const mockGames: Game[] = [
  {
    id: 'game-1',
    title: 'Eco Knowledge Quiz',
    description: 'Test your environmental awareness with fun multiple-choice questions',
    category: 'quiz',
    difficulty: 'easy',
    duration: '10 min',
    players: 'single',
    points: 100,
    icon: '🧠',
    color: 'from-blue-400 to-blue-600',
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'game-2',
    title: 'Climate Challenge Quiz',
    description: 'Advanced quiz about climate change, renewable energy, and sustainability',
    category: 'quiz',
    difficulty: 'hard',
    duration: '20 min',
    players: 'multiplayer',
    points: 200,
    icon: '🌡️',
    color: 'from-red-400 to-orange-600',
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'game-3',
    title: 'Ecosystem Builder',
    description: 'Build a balanced ecosystem by placing animals and plants correctly',
    category: 'puzzle',
    difficulty: 'medium',
    duration: '15 min',
    players: 'single',
    points: 150,
    icon: '🌲',
    color: 'from-green-400 to-emerald-600',
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'game-4',
    title: 'Recycling Sorter',
    description: 'Sort waste items into correct recycling categories as fast as you can',
    category: 'puzzle',
    difficulty: 'easy',
    duration: '8 min',
    players: 'single',
    points: 80,
    icon: '♻️',
    color: 'from-teal-400 to-cyan-600',
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'game-5',
    title: 'Green City Planner',
    description: 'Design and manage a sustainable city with renewable energy and green spaces',
    category: 'simulation',
    difficulty: 'hard',
    duration: '30 min',
    players: 'single',
    points: 300,
    icon: '🏙️',
    color: 'from-purple-400 to-indigo-600',
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
]

export const mockChallenges: Challenge[] = []

const CHALLENGE_DATA_VERSION = 'challenges-v2'
const CHALLENGE_VERSION_KEY = 'mock-challenges-version'

// Mock localStorage-based database
class MockDatabase {
  private getItem<T>(key: string): T[] {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  }

  private setItem<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  // Initialize with default data
  init() {
    // Force update courses data to ensure new course structure is loaded
    this.setItem('mock-courses', mockCourses)

    const storedChallengeVersion = localStorage.getItem(CHALLENGE_VERSION_KEY)
    const hasChallenges = localStorage.getItem('mock-challenges')

    if (storedChallengeVersion !== CHALLENGE_DATA_VERSION) {
      this.setItem('mock-challenges', mockChallenges)
      this.setItem('mock-challenge-progress', [])
      localStorage.setItem(CHALLENGE_VERSION_KEY, CHALLENGE_DATA_VERSION)
    } else if (!hasChallenges) {
      this.setItem('mock-challenges', mockChallenges)
    }

    if (!localStorage.getItem('mock-games')) {
      this.setItem('mock-games', mockGames)
    }
    if (!localStorage.getItem('mock-user-progress')) {
      this.setItem('mock-user-progress', [])
    }
    if (!localStorage.getItem('mock-challenge-progress')) {
      this.setItem('mock-challenge-progress', [])
    }
  }

  // Courses
  getCourses(): Course[] {
    return this.getItem<Course>('mock-courses')
  }

  getCoursesByDifficulty(difficulty: string): Course[] {
    return this.getCourses().filter(course => course.difficulty === difficulty)
  }

  // Games
  getGames(): Game[] {
    return this.getItem<Game>('mock-games')
  }

  getActiveGames(): Game[] {
    return this.getGames().filter(game => game.active)
  }

  getGamesByCategory(category: string): Game[] {
    return this.getGames().filter(game => game.category === category && game.active)
  }

  // Challenges
  getChallenges(): Challenge[] {
    const stored = this.getItem<Challenge>('mock-challenges')
    let needsPersist = false

    const normalized = stored.map(challenge => {
      let participants = challenge.participants
      if (typeof participants !== 'number' || Number.isNaN(participants)) {
        participants = Math.floor(150 + Math.random() * 500)
        needsPersist = true
      }

      return {
        ...challenge,
        participants
      }
    })

    if (needsPersist) {
      this.setItem('mock-challenges', normalized)
    }

    return normalized
  }

  getActiveChallenges(): Challenge[] {
    return this.getChallenges().filter(challenge => challenge.active)
  }

  getChallengesByType(type: string): Challenge[] {
    return this.getChallenges().filter(challenge => challenge.type === type && challenge.active)
  }

  updateChallengeParticipants(challengeId: string, delta: number): void {
    const challenges = this.getChallenges()
    const index = challenges.findIndex(challenge => challenge.id === challengeId)
    if (index !== -1) {
      const current = challenges[index].participants || 0
      challenges[index] = {
        ...challenges[index],
        participants: Math.max(0, current + delta)
      }
      this.setItem('mock-challenges', challenges)
    }
  }

  // User Progress
  getUserProgress(userId: string): UserProgress[] {
    return this.getItem<UserProgress>('mock-user-progress').filter(p => p.user_id === userId)
  }

  addUserProgress(progress: UserProgress): void {
    const allProgress = this.getItem<UserProgress>('mock-user-progress')
    allProgress.push(progress)
    this.setItem('mock-user-progress', allProgress)
  }

  updateUserProgress(userId: string, itemId: string, updates: Partial<UserProgress>): void {
    const allProgress = this.getItem<UserProgress>('mock-user-progress')
    const index = allProgress.findIndex(p => p.user_id === userId && p.id === itemId)
    if (index !== -1) {
      allProgress[index] = { ...allProgress[index], ...updates }
      this.setItem('mock-user-progress', allProgress)
    }
  }

  getChallengeProgress(userId: string): ChallengeProgress[] {
    return this.getItem<ChallengeProgress>('mock-challenge-progress').filter(p => p.user_id === userId)
  }

  addChallengeProgress(progress: ChallengeProgress): void {
    const allProgress = this.getItem<ChallengeProgress>('mock-challenge-progress')
    const existingIndex = allProgress.findIndex(p => p.user_id === progress.user_id && p.id === progress.id)
    if (existingIndex === -1) {
      allProgress.push(progress)
    } else {
      allProgress[existingIndex] = progress
    }
    this.setItem('mock-challenge-progress', allProgress)
  }

  updateChallengeProgress(userId: string, challengeId: string, updates: Partial<ChallengeProgress>): void {
    const allProgress = this.getItem<ChallengeProgress>('mock-challenge-progress')
    const index = allProgress.findIndex(p => p.user_id === userId && p.id === challengeId)
    if (index !== -1) {
      allProgress[index] = { ...allProgress[index], ...updates, updated_at: new Date().toISOString() }
      this.setItem('mock-challenge-progress', allProgress)
    }
  }
}

export const mockDB = new MockDatabase()

// Initialize mock database
mockDB.init()
