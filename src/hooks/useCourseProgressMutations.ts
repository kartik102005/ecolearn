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

const computeNextProgress = (currentProgress: number) => {
  if (currentProgress <= 0) {
    return 15
  }
  return Math.min(currentProgress + 25, 100)
}

export const useCourseProgressMutations = (): UseCourseProgressMutationsResult => {
  const { user } = useAuth()
  const userId = user?.email || 'demo-user'
  const queryClient = useQueryClient()
  const [pendingCourseId, setPendingCourseId] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async ({ courseId, currentProgress }: CourseProgressMutationVariables) => {
      const nextProgress = computeNextProgress(currentProgress)

      if (currentProgress <= 0) {
        await courseService.startCourse(userId, courseId)
      }

      await courseService.updateCourseProgress(userId, courseId, nextProgress)

      return { courseId, nextProgress }
    },
    onMutate: async (variables) => {
      setPendingCourseId(variables.courseId)
      const queryKey = courseProgressKey(userId)

      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData<CourseProgressEntry[]>(queryKey) || []

      const nextProgress = computeNextProgress(variables.currentProgress)
      const now = new Date().toISOString()

      const optimisticData = (() => {
        const existingIndex = previousData.findIndex(entry => entry.id === variables.courseId)
        if (existingIndex === -1) {
          const newEntry: CourseProgressEntry = {
            id: variables.courseId,
            user_id: userId,
            progress: nextProgress,
            completed: nextProgress >= 100,
            started_at: now,
            completed_at: nextProgress >= 100 ? now : undefined,
            course: null,
          }
          return [...previousData, newEntry]
        }

        const existing = previousData[existingIndex]
        const updated: CourseProgressEntry = {
          ...existing,
          progress: nextProgress,
          completed: nextProgress >= 100,
          completed_at: nextProgress >= 100 ? now : existing.completed_at,
        }

        const clone = [...previousData]
        clone.splice(existingIndex, 1, updated)
        return clone
      })()

      queryClient.setQueryData<CourseProgressEntry[]>(queryKey, optimisticData)

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
