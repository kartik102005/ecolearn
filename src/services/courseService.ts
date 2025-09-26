import { supabase } from '@/lib/supabase'
import { Course, UserProgress, mockCourses } from '@/lib/mockData'
import { publishNotificationEvent } from '@/lib/notificationBus'
import { awardXP } from '@/services/xpService'

export interface CourseProgressEntry extends UserProgress {
  course: {
    id: string
    title: string
    description?: string
    difficulty: Course['difficulty']
    lessons: number
    duration: string
    icon: string
    color: string
    topics?: string[]
  } | null
}

type CourseRow = {
  id: string
  title: string
  description: string | null
  difficulty: Course['difficulty']
  lessons: number
  duration: string | null
  topics: string[] | null
  icon: string | null
  color: string | null
  created_at?: string | null
  updated_at?: string | null
}

type CourseProgressRow = {
  id: string
  user_id: string
  course_id: string
  progress: number
  completed: boolean
  started_at: string
  completed_at: string | null
  updated_at?: string | null
  course?: CourseRow | CourseRow[] | null
}

const mapCourseRow = (row: CourseRow): Course => ({
  id: row.id,
  title: row.title,
  description: row.description ?? '',
  difficulty: row.difficulty,
  lessons: row.lessons,
  duration: row.duration ?? '',
  topics: row.topics ?? [],
  icon: row.icon ?? '📘',
  color: row.color ?? 'from-green-500 to-emerald-600',
  created_at: row.created_at ?? new Date().toISOString(),
})

const mapProgressRow = (row: CourseProgressRow): CourseProgressEntry => {
  const courseData = Array.isArray(row.course)
    ? row.course[0]
    : row.course ?? null

  return {
  id: row.course_id,
  user_id: row.user_id,
  progress: row.progress,
  completed: row.completed,
  started_at: row.started_at,
  completed_at: row.completed_at ?? undefined,
  course: courseData ? {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description ?? undefined,
    difficulty: courseData.difficulty,
    lessons: courseData.lessons,
    duration: courseData.duration ?? '',
    icon: courseData.icon ?? '📘',
    color: courseData.color ?? 'from-green-500 to-emerald-600',
    topics: courseData.topics ?? [],
  } : null,
  }
}

const clampProgress = (progress: number) => {
  if (Number.isNaN(progress)) return 0
  return Math.min(100, Math.max(0, Math.round(progress)))
}

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching courses from Supabase:', error)
        throw error
      }

      if (!data || data.length === 0) {
        return mockCourses
      }

      return data.map(mapCourseRow)
    } catch (error) {
      console.error('Error in getAllCourses:', error)
      return mockCourses
    }
  },

  async getCoursesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('difficulty', difficulty)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error filtering courses by difficulty:', error)
        throw error
      }

      if (!data || data.length === 0) {
        return mockCourses.filter(course => course.difficulty === difficulty)
      }

      return data.map(mapCourseRow)
    } catch (error) {
      console.error('Error in getCoursesByDifficulty:', error)
      return mockCourses.filter(course => course.difficulty === difficulty)
    }
  },

  async getUserCourseProgress(userId: string): Promise<CourseProgressEntry[]> {
    if (!userId) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from('course_progress')
        .select(`
          id,
          user_id,
          course_id,
          progress,
          completed,
          started_at,
          completed_at,
          course:courses(
            id,
            title,
            description,
            difficulty,
            lessons,
            duration,
            topics,
            icon,
            color
          )
        `)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Error fetching course progress from Supabase:', error)
        throw error
      }

      if (!data) {
        return []
      }

      return data.map(mapProgressRow)
    } catch (error) {
      console.error('Error getting user course progress:', error)
      return []
    }
  },

  async startCourse(userId: string, courseId: string): Promise<void> {
    if (!userId) {
      throw new Error('Cannot start course without a user ID')
    }

    const timestamp = new Date().toISOString()

    const { error } = await supabase
      .from('course_progress')
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          progress: 0,
          completed: false,
          started_at: timestamp,
          completed_at: null,
          updated_at: timestamp,
        },
        { onConflict: 'user_id,course_id' }
      )

    if (error) {
      console.error('Error starting course:', error)
      throw error
    }
  },

  async updateCourseProgress(userId: string, courseId: string, progress: number): Promise<void> {
    if (!userId) {
      throw new Error('Cannot update course progress without a user ID')
    }

    const clamped = clampProgress(progress)
    const isCompleted = clamped >= 100
    const timestamp = new Date().toISOString()

    const { data: existingRow, error: existingError } = await supabase
      .from('course_progress')
      .select('id, completed')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle()

    if (existingError) {
      console.error('Error checking existing course progress:', existingError)
      throw existingError
    }

    if (!existingRow) {
      await this.startCourse(userId, courseId)
    }

    const { error: updateError } = await supabase
      .from('course_progress')
      .update({
        progress: clamped,
        completed: isCompleted,
        completed_at: isCompleted ? timestamp : null,
        updated_at: timestamp,
      })
      .eq('user_id', userId)
      .eq('course_id', courseId)

    if (updateError) {
      console.error('Error updating course progress:', updateError)
      throw updateError
    }

    if (isCompleted && (!existingRow || !existingRow.completed)) {
      await this.awardCourseCompletionXP(userId, courseId, timestamp)
    }
  },

  async awardCourseCompletionXP(userId: string, courseId: string, completedAt?: string): Promise<void> {
    try {
      const { data: course, error } = await supabase
        .from('courses')
        .select('id, title, difficulty, lessons, duration, icon, color')
        .eq('id', courseId)
        .maybeSingle()

      if (error) {
        console.error('Error fetching course during XP award:', error)
        throw error
      }

      if (!course) {
        console.warn('Course not found when awarding XP:', courseId)
        return
      }

      let xpReward = (course.lessons ?? 0) * 10
      if (course.difficulty === 'intermediate') xpReward *= 1.5
      if (course.difficulty === 'advanced') xpReward *= 2

      const finalXp = Math.floor(xpReward)
      const result = await awardXP(userId, finalXp, { reason: 'course_completion', awardCoins: true })

      if (!result.error) {
        publishNotificationEvent({
          type: 'course_completed',
          payload: {
            userId,
            courseId: course.id,
            courseTitle: course.title,
            xpAwarded: finalXp,
            completedAt: completedAt ?? new Date().toISOString(),
          },
        })
      }
    } catch (error) {
      console.error('Failed to award course completion XP:', error)
    }
  },

  async seedCourses(): Promise<void> {
    try {
      if (!mockCourses.length) return

      const payload = mockCourses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        difficulty: course.difficulty,
        lessons: course.lessons,
        duration: course.duration,
        topics: course.topics,
        icon: course.icon,
        color: course.color,
        created_at: course.created_at,
        updated_at: new Date().toISOString(),
      }))

      const { error } = await supabase
        .from('courses')
        .upsert(payload, { onConflict: 'id' })

      if (error) {
        console.error('Error seeding courses into Supabase:', error)
        throw error
      }
    } catch (error) {
      console.error('Seed courses failed:', error)
      throw error
    }
  },
}
