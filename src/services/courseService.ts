import { supabase } from '@/lib/supabase'
import { Course, CourseLesson, UserProgress } from '@/lib/mockData'
import { publishNotificationEvent } from '@/lib/notificationBus'
import { awardXP } from '@/services/xpService'
import type { PostgrestError } from '@supabase/supabase-js'

export interface CourseProgressEntry extends UserProgress {
  course: Course | null
}

const COURSE_SELECT_COLUMNS = '*'

const COURSE_LESSON_SELECT_COLUMNS = '*'

const isUniqueViolationError = (error: PostgrestError | null | undefined): boolean => {
  if (!error) return false
  if (error.code === '23505') return true
  const message = error.message?.toLowerCase?.() ?? ''
  const details = error.details?.toLowerCase?.() ?? ''
  return message.includes('duplicate') || details.includes('duplicate')
}

const ensureCourseExistsInSupabase = async (courseId: string): Promise<boolean> => {
  if (!courseId) return false

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('id')
      .eq('id', courseId)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      console.error('Failed to verify course presence in Supabase:', error)
      throw error
    }

    return Boolean(data)
  } catch (error) {
    console.error('Unexpected error checking for course in Supabase:', error)
    throw error
  }
}

interface CourseQueryFilters {
  courseIds?: string[]
  difficulty?: Course['difficulty']
  orderAscending?: boolean
}

const COURSE_DISPLAY_ORDER: readonly string[] = [
  'course-1',
  'course-2',
  'course-3',
  'course-4',
  'course-5',
  'course-6',
  'course-7',
  'course-8',
  'course-9',
]

const COURSE_DISPLAY_ORDER_LOOKUP = new Map<string, number>(
  COURSE_DISPLAY_ORDER.map((courseId, index) => [courseId, index])
)

const fetchCourseRowsWithLessons = async (filters: CourseQueryFilters = {}): Promise<CourseRow[]> => {
  let query = supabase
    .from('courses')
    .select(COURSE_SELECT_COLUMNS)

  if (filters.difficulty) {
    query = query.eq('difficulty', filters.difficulty)
  }

  if (filters.courseIds && filters.courseIds.length > 0) {
    query = query.in('id', filters.courseIds)
  }

  const { data: courseData, error: courseError } = await query

  if (courseError) {
    throw courseError
  }

  const courseRows = (courseData as CourseRow[]) ?? []
  const sortedCourseRows = courseRows
    .slice()
    .sort((a, b) => {
      const leftDisplayOrder = COURSE_DISPLAY_ORDER_LOOKUP.get(a.id ?? '')
      const rightDisplayOrder = COURSE_DISPLAY_ORDER_LOOKUP.get(b.id ?? '')

      if (leftDisplayOrder !== undefined && rightDisplayOrder !== undefined && leftDisplayOrder !== rightDisplayOrder) {
        return leftDisplayOrder - rightDisplayOrder
      }

      const getCreatedAt = (row: CourseRow) => {
        if (!row.created_at) return null
        const timestamp = Date.parse(row.created_at)
        return Number.isNaN(timestamp) ? null : timestamp
      }

      const leftTimestamp = getCreatedAt(a)
      const rightTimestamp = getCreatedAt(b)

      if (leftTimestamp !== null && rightTimestamp !== null && leftTimestamp !== rightTimestamp) {
        return (filters.orderAscending ?? true) ? leftTimestamp - rightTimestamp : rightTimestamp - leftTimestamp
      }

      if (leftTimestamp !== null && rightTimestamp === null) {
        return (filters.orderAscending ?? true) ? -1 : 1
      }

      if (leftTimestamp === null && rightTimestamp !== null) {
        return (filters.orderAscending ?? true) ? 1 : -1
      }

      const leftTitle = a.title?.toLowerCase?.() ?? ''
      const rightTitle = b.title?.toLowerCase?.() ?? ''
      return (filters.orderAscending ?? true)
        ? leftTitle.localeCompare(rightTitle)
        : rightTitle.localeCompare(leftTitle)
    })

  if (sortedCourseRows.length === 0) {
    return []
  }

  const courseIdsToFetch = filters.courseIds && filters.courseIds.length > 0
    ? filters.courseIds
    : sortedCourseRows.map(row => row.id)

  let lessonsMap = new Map<string, CourseLessonRow[]>()

  if (courseIdsToFetch.length > 0) {
    const { data: lessonData, error: lessonError } = await supabase
      .from('course_lessons')
      .select(COURSE_LESSON_SELECT_COLUMNS)
      .in('course_id', courseIdsToFetch)
      .order('order_index', { ascending: true })

    if (lessonError) {
      throw lessonError
    }

    lessonsMap = (lessonData as CourseLessonRow[] | null)?.reduce((map, lesson) => {
      const list = map.get(lesson.course_id) ?? []
      list.push(lesson)
      map.set(lesson.course_id, list)
      return map
    }, new Map<string, CourseLessonRow[]>()) ?? new Map<string, CourseLessonRow[]>()
  }

  return sortedCourseRows.map(row => ({
    ...row,
    course_lessons: lessonsMap.get(row.id) ?? [],
  }))
}

const COURSE_MEDIA_BUCKET = 'course-media'
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60

type CourseLessonRow = {
  id: string
  course_id: string
  slug: string
  title: string
  description?: string | null
  order_index?: number | null
  duration?: string | null
  video_storage_path?: string | null
  video_thumbnail_path?: string | null
  transcript?: string | null
  created_at?: string | null
  updated_at?: string | null
}

type CourseRow = {
  id: string
  title: string | null
  description?: string | null
  difficulty?: Course['difficulty'] | null
  lessons?: number | null
  duration?: string | null
  topics?: string[] | null
  icon?: string | null
  color?: string | null
  intro_video_storage_path?: string | null
  intro_video_thumbnail_path?: string | null
  intro_video_embed_url?: string | null
  created_at?: string | null
  updated_at?: string | null
  course_lessons?: CourseLessonRow[] | null
}

type CourseProgressRow = {
  id: string
  user_id: string
  course_id: string
  progress: number
  completed: boolean
  started_at: string
  completed_at: string | null
  created_at?: string | null
  updated_at?: string | null
}

type LessonProgressRow = {
  user_id: string
  course_id: string
  lesson_slug: string
  completed: boolean
  completed_at?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export type LessonProgressMap = Record<string, LessonProgressRow>

const mapLessonRow = (row: CourseLessonRow): CourseLesson => ({
  id: row.id,
  courseId: row.course_id,
  slug: row.slug,
  title: row.title,
  description: row.description ?? undefined,
  orderIndex: row.order_index ?? 0,
  duration: row.duration ?? undefined,
  videoStoragePath: row.video_storage_path,
  videoThumbnailPath: row.video_thumbnail_path,
  transcript: row.transcript ?? undefined,
  created_at: row.created_at ?? undefined,
  updated_at: row.updated_at ?? undefined,
})

const mapCourseRow = (row: CourseRow): Course => {
  const lessonModulesFromDb = (row.course_lessons ?? [])
    .slice()
    .sort((a, b) => {
      const left = a.order_index ?? 0
      const right = b.order_index ?? 0
      return left - right
    })
    .map(mapLessonRow)

  const resolvedLessonModules = lessonModulesFromDb.length > 0 ? lessonModulesFromDb : undefined
  const resolvedDifficulty = (row.difficulty ?? 'beginner') as Course['difficulty']

  return {
    id: row.id,
    title: row.title ?? 'Untitled Course',
    description: row.description ?? '',
    difficulty: resolvedDifficulty,
    lessons:
      typeof row.lessons === 'number'
        ? row.lessons
        : resolvedLessonModules?.length ?? 0,
    duration: row.duration ?? 'Self-paced',
    topics: row.topics ?? [],
    icon: row.icon ?? '📘',
    color: row.color ?? 'from-green-500 to-emerald-600',
    introVideoStoragePath: row.intro_video_storage_path ?? null,
    introVideoThumbnailPath: row.intro_video_thumbnail_path ?? null,
    introVideoSignedUrl: row.intro_video_embed_url ?? null,
    lessonModules: resolvedLessonModules,
    created_at: row.created_at ?? new Date().toISOString(),
  }
}

const mapProgressRow = (row: CourseProgressRow, course: CourseRow | null): CourseProgressEntry => ({
  id: row.course_id,
  user_id: row.user_id,
  progress: row.progress,
  completed: row.completed,
  started_at: row.started_at,
  completed_at: row.completed_at ?? undefined,
  course: course ? mapCourseRow(course) : null,
})

const createSignedUrlIfExists = async (storagePath?: string | null) => {
  if (!storagePath) return null

  const { data, error } = await supabase.storage
    .from(COURSE_MEDIA_BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_EXPIRY_SECONDS)

  if (error) {
    console.error('Failed to create signed URL for path:', storagePath, error)
    return null
  }

  return data?.signedUrl ?? null
}

const hydrateCourseMedia = async (course: Course): Promise<Course> => {
  const hasIntroStorage = Boolean(course.introVideoStoragePath)
  const hasLessonStorage = Boolean(course.lessonModules?.some(lesson => lesson.videoStoragePath))

  if (!hasIntroStorage && !hasLessonStorage) {
    return course
  }

  const [introVideoSignedUrl, introVideoThumbnailUrl] = await Promise.all([
    createSignedUrlIfExists(course.introVideoStoragePath ?? undefined),
    createSignedUrlIfExists(course.introVideoThumbnailPath ?? undefined),
  ])

  const lessonModules = course.lessonModules
    ? await Promise.all(
        course.lessonModules.map(async lesson => {
          const [lessonVideoUrl, lessonThumbnailUrl] = await Promise.all([
            createSignedUrlIfExists(lesson.videoStoragePath ?? undefined),
            createSignedUrlIfExists(lesson.videoThumbnailPath ?? undefined),
          ])

          return {
            ...lesson,
            videoSignedUrl: lessonVideoUrl ?? lesson.videoSignedUrl ?? undefined,
            videoThumbnailUrl: lessonThumbnailUrl ?? lesson.videoThumbnailUrl ?? undefined,
          }
        })
      )
    : undefined

  return {
    ...course,
    introVideoSignedUrl: introVideoSignedUrl ?? course.introVideoSignedUrl ?? undefined,
    introVideoThumbnailUrl: introVideoThumbnailUrl ?? course.introVideoThumbnailUrl ?? undefined,
    lessonModules,
  }
}

const clampProgress = (progress: number) => {
  if (Number.isNaN(progress)) return 0
  return Math.min(100, Math.max(0, Math.round(progress)))
}

const normalizeError = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error
  if (error && typeof error === 'object' && 'message' in error) {
    const message = typeof (error as { message?: unknown }).message === 'string' ? (error as { message: string }).message : fallback
    return new Error(message)
  }
  return new Error(fallback)
}

export const courseService = {
  async getCourseWithLessons(courseId: string): Promise<Course | null> {
    if (!courseId) return null

    const rows = await fetchCourseRowsWithLessons({ courseIds: [courseId], orderAscending: true })
    if (!rows.length) {
      return null
    }

    const course = mapCourseRow(rows[0])
    return hydrateCourseMedia(course)
  },

  async getAllCourses(): Promise<Course[]> {
    try {
      const rows = await fetchCourseRowsWithLessons()

      const mapped = rows.map(mapCourseRow)
      return Promise.all(mapped.map(hydrateCourseMedia))
    } catch (error) {
      console.error('Error in getAllCourses:', error)
      throw error
    }
  },

  async getCoursesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<Course[]> {
    try {
      const rows = await fetchCourseRowsWithLessons({ difficulty })

      const mapped = rows.map(mapCourseRow)
      return Promise.all(mapped.map(hydrateCourseMedia))
    } catch (error) {
      console.error('Error in getCoursesByDifficulty:', error)
      throw error
    }
  },

  async getUserCourseProgress(userId: string): Promise<CourseProgressEntry[]> {
    if (!userId) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching course progress from Supabase:', error)
        throw error
      }

      if (!data || data.length === 0) {
        return []
      }

      const progressRows = (data as CourseProgressRow[]) ?? []
      const sortedRows = progressRows
        .slice()
        .sort((a, b) => {
          const getTimestamp = (row: CourseProgressRow) => {
            const candidates = [row.updated_at, row.completed_at, row.started_at, row.created_at]
            const firstValid = candidates.find(value => Boolean(value))
            return firstValid ? new Date(firstValid).getTime() : 0
          }

          return getTimestamp(b) - getTimestamp(a)
        })
      const uniqueCourseIds = Array.from(new Set(progressRows.map(row => row.course_id)))

      const courseRows = uniqueCourseIds.length
        ? await fetchCourseRowsWithLessons({ courseIds: uniqueCourseIds, orderAscending: true })
        : []

      const courseMap = new Map<string, CourseRow>()
      courseRows.forEach(row => {
        courseMap.set(row.id, row)
      })

      const mapped = sortedRows.map(row => mapProgressRow(row, courseMap.get(row.course_id) ?? null))
      const hydrated = await Promise.all(
        mapped.map(async entry => ({
          ...entry,
          course: entry.course ? await hydrateCourseMedia(entry.course) : null,
        }))
      )

      return hydrated
    } catch (error) {
      console.error('Error getting user course progress:', error)
      throw error
    }
  },

  async getLessonProgressMap(userId: string, courseId: string): Promise<LessonProgressMap> {
    if (!userId || !courseId) {
      return {}
    }

    try {
      const { data, error } = await supabase
        .from('course_lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)

      if (error) {
        throw normalizeError(error, 'Failed to fetch lesson progress')
      }

      const rows = (data as LessonProgressRow[] | null) ?? []
      return rows.reduce<LessonProgressMap>((map, row) => {
        map[row.lesson_slug] = row
        return map
      }, {})
    } catch (error) {
      throw normalizeError(error, 'Failed to fetch lesson progress')
    }
  },

  async markLessonComplete(userId: string, courseId: string, lessonSlug: string): Promise<void> {
    if (!userId) {
      throw new Error('Cannot update lesson progress without a user ID')
    }

    const ensured = await ensureCourseExistsInSupabase(courseId)

    if (!ensured) {
      throw new Error(`Course ${courseId} does not exist in Supabase`)
    }

    const timestamp = new Date().toISOString()

    try {
      await this.startCourse(userId, courseId)

      const { error } = await supabase
        .from('course_lesson_progress')
        .upsert(
          {
            user_id: userId,
            course_id: courseId,
            lesson_slug: lessonSlug,
            completed: true,
            completed_at: timestamp,
            updated_at: timestamp,
          },
          { onConflict: 'user_id,course_id,lesson_slug' }
        )

      if (error) {
        throw normalizeError(error, 'Failed to update lesson progress')
      }

      const course = await this.getCourseWithLessons(courseId)

      if (!course?.lessonModules || course.lessonModules.length === 0) {
        return
      }

      const lessonProgressMap = await this.getLessonProgressMap(userId, courseId)
      const totalLessons = course.lessonModules.length
      const completedLessons = course.lessonModules.filter(lesson => lessonProgressMap[lesson.slug]?.completed).length
      const progressPercentage = clampProgress((completedLessons / totalLessons) * 100)

      await this.updateCourseProgress(userId, courseId, progressPercentage)
    } catch (error) {
      throw normalizeError(error, 'Failed to update lesson progress')
    }
  },

  async startCourse(userId: string, courseId: string): Promise<void> {
    if (!userId) {
      throw new Error('Cannot start course without a user ID')
    }

    const timestamp = new Date().toISOString()

    const ensured = await ensureCourseExistsInSupabase(courseId)

    if (!ensured) {
      throw new Error(
        `Course ${courseId} is not available in Supabase. Please seed the course catalog using the service role documented in SUPABASE_SETUP.md.`
      )
    }

    const { error } = await supabase
      .from('course_progress')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        completed: false,
        started_at: timestamp,
        completed_at: null,
      })

    if (error) {
      if (isUniqueViolationError(error)) {
        return
      }

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

}
