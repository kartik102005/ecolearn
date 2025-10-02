import { useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/contexts/auth-context'
import { courseService, type CourseProgressEntry } from '@/services/courseService'
import type { Course } from '@/lib/mockData'

export const COURSES_QUERY_KEY = ['courses'] as const

export const courseProgressKey = (userId: string) => ['course-progress', userId] as const

interface UseCourseProgressDataResult {
  userId: string
  hasAuthenticatedUser: boolean
  courses: Course[]
  courseProgress: CourseProgressEntry[]
  isLoading: boolean
  isFetching: boolean
  error: Error | null
  refetchAll: () => Promise<void>
  invalidateAll: () => Promise<void>
  queryClient: ReturnType<typeof useQueryClient>
}

export const useCourseProgressData = (): UseCourseProgressDataResult => {
  const { user } = useAuth()
  const userId = user?.id ?? ''
  const hasAuthenticatedUser = Boolean(userId)
  const queryClient = useQueryClient()

  const coursesQuery = useQuery<Course[], Error>({
    queryKey: COURSES_QUERY_KEY,
    queryFn: () => courseService.getAllCourses(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })

  const progressQuery = useQuery<CourseProgressEntry[], Error>({
    queryKey: courseProgressKey(userId),
    queryFn: () => courseService.getUserCourseProgress(userId),
    enabled: hasAuthenticatedUser,
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const error = useMemo(() => {
    if (coursesQuery.error) return coursesQuery.error
    if (progressQuery.error) return progressQuery.error
    return null
  }, [coursesQuery.error, progressQuery.error])

  const refetchAll = async () => {
    await Promise.all([coursesQuery.refetch(), progressQuery.refetch()])
  }

  const invalidateAll = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY }),
      queryClient.invalidateQueries({ queryKey: courseProgressKey(userId) }),
    ])
  }

  return {
    userId,
    hasAuthenticatedUser,
    courses: coursesQuery.data ?? [],
    courseProgress: progressQuery.data ?? [],
    isLoading: coursesQuery.isLoading || progressQuery.isLoading,
    isFetching: coursesQuery.isFetching || progressQuery.isFetching,
    error,
    refetchAll,
    invalidateAll,
    queryClient,
  }
}
