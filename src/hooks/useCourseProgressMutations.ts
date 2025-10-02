import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/contexts/auth-context'
import { courseService, type CourseProgressEntry } from '@/services/courseService'
import { courseProgressKey } from '@/hooks/useCourseProgressData'

interface CourseProgressMutationVariables {
  courseId: string
  currentProgress: number
}

interface UseCourseProgressMutationsResult {
  startOrAdvanceCourse: (variables: CourseProgressMutationVariables) => void
  startOrAdvanceCourseAsync: (variables: CourseProgressMutationVariables) => Promise<unknown>
  isPending: boolean
  pendingCourseId: string | null
  error: Error | null
}

export const useCourseProgressMutations = (): UseCourseProgressMutationsResult => {
  const { user } = useAuth()
  const userId = user?.id ?? ''
  const queryClient = useQueryClient()
  const [pendingCourseId, setPendingCourseId] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async ({ courseId, currentProgress }: CourseProgressMutationVariables) => {
      if (!userId) {
        throw new Error('Must be signed in to track course progress')
      }

      if (currentProgress <= 0) {
        await courseService.startCourse(userId, courseId)
      }

      return { courseId, nextProgress: currentProgress }
    },
    onMutate: async (variables) => {
      if (!userId) {
        throw new Error('Must be signed in to track course progress')
      }

      setPendingCourseId(variables.courseId)
      const queryKey = courseProgressKey(userId)

      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData<CourseProgressEntry[]>(queryKey) || []

      return { previousData }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CourseProgressEntry[]>(courseProgressKey(userId), context.previousData)
      }
    },
    onSettled: () => {
      setPendingCourseId(null)
      queryClient.invalidateQueries({ queryKey: courseProgressKey(userId) })
    },
  })

  return {
    startOrAdvanceCourse: mutation.mutate,
    startOrAdvanceCourseAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    pendingCourseId,
    error: mutation.error as Error | null,
  }
}
