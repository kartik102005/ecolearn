import type { Course } from '@/lib/mockData'
import type { CourseProgressEntry } from '@/services/courseService'

export interface DynamicQuest {
  id: number
  title: string
  category: string
  description: string
  progress: number
  xpReward: number
  gradient: string
  icon: string
  isCompleted: boolean
}

export interface ProgressOverview {
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  totalXP: number
  averageProgress: number
  difficultyBreakdown: Record<
    'beginner' | 'intermediate' | 'advanced',
    {
      available: number
      completed: number
      inProgress: number
      progressPercent: number
      totalXP: number
    }
  >
}

export const buildDynamicQuests = (courses: Course[], progressEntries: CourseProgressEntry[]): DynamicQuest[] => {
  const beginnerCourses = courses.filter(c => c.difficulty === 'beginner')
  const intermediateCourses = courses.filter(c => c.difficulty === 'intermediate')
  const advancedCourses = courses.filter(c => c.difficulty === 'advanced')

  const completedCourses = progressEntries.filter(p => p.completed)

  const beginnerCompleted = completedCourses.filter(p => {
    const course = courses.find(c => c.id === p.id)
    return course?.difficulty === 'beginner'
  }).length

  const intermediateCompleted = completedCourses.filter(p => {
    const course = courses.find(c => c.id === p.id)
    return course?.difficulty === 'intermediate'
  }).length

  const advancedCompleted = completedCourses.filter(p => {
    const course = courses.find(c => c.id === p.id)
    return course?.difficulty === 'advanced'
  }).length

  const beginnerProgress = Math.round((beginnerCompleted / beginnerCourses.length) * 100) || 0
  const intermediateProgress = Math.round((intermediateCompleted / intermediateCourses.length) * 100) || 0
  const advancedProgress = Math.round((advancedCompleted / advancedCourses.length) * 100) || 0

  return [
    {
      id: 1,
      title: 'Eco Knowledge Master',
      category: 'Environmental Science',
      description: `Complete all ${beginnerCourses.length} beginner courses (${beginnerCompleted}/${beginnerCourses.length} done)`,
      progress: beginnerProgress,
      xpReward: 150,
      gradient: 'from-green-400 to-emerald-500',
      icon: 'school',
      isCompleted: beginnerProgress === 100,
    },
    {
      id: 2,
      title: 'Climate Action Hero',
      category: 'Climate Change',
      description: `Master intermediate topics (${intermediateCompleted}/${intermediateCourses.length} courses completed)`,
      progress: intermediateProgress,
      xpReward: 200,
      gradient: 'from-blue-400 to-cyan-500',
      icon: 'public',
      isCompleted: intermediateProgress === 100,
    },
    {
      id: 3,
      title: 'Environmental Expert',
      category: 'Advanced Studies',
      description: `Become an expert with advanced courses (${advancedCompleted}/${advancedCourses.length} completed)`,
      progress: advancedProgress,
      xpReward: 300,
      gradient: 'from-purple-400 to-indigo-500',
      icon: 'workspace_premium',
      isCompleted: advancedProgress === 100,
    },
  ]
}

export const computeProgressOverview = (courses: Course[], progressEntries: CourseProgressEntry[]): ProgressOverview => {
  const totalCourses = courses.length
  const completedCourses = progressEntries.filter(p => p.completed).length
  const inProgressCourses = progressEntries.filter(p => p.progress > 0 && !p.completed).length
  const totalXP = completedCourses * 250
  const averageProgress = progressEntries.length > 0
    ? Math.round(progressEntries.reduce((acc, p) => acc + p.progress, 0) / progressEntries.length)
    : 0

  const difficulties: ProgressOverview['difficultyBreakdown'] = {
    beginner: { available: 0, completed: 0, inProgress: 0, progressPercent: 0, totalXP: 0 },
    intermediate: { available: 0, completed: 0, inProgress: 0, progressPercent: 0, totalXP: 0 },
    advanced: { available: 0, completed: 0, inProgress: 0, progressPercent: 0, totalXP: 0 },
  }

  courses.forEach(course => {
    const bucket = difficulties[course.difficulty]
    if (!bucket) return

    bucket.available += 1

    const progressEntry = progressEntries.find(entry => entry.id === course.id)
    if (!progressEntry) return

    if (progressEntry.completed) {
      bucket.completed += 1
    } else if (progressEntry.progress > 0) {
      bucket.inProgress += 1
    }
  });

  (Object.keys(difficulties) as Array<keyof ProgressOverview['difficultyBreakdown']>).forEach(key => {
    const bucket = difficulties[key]
    bucket.progressPercent = bucket.available > 0 ? Math.round((bucket.completed / bucket.available) * 100) : 0
    bucket.totalXP = bucket.completed * 250
  })

  return {
    totalCourses,
    completedCourses,
    inProgressCourses,
    totalXP,
    averageProgress,
    difficultyBreakdown: difficulties,
  }
}
