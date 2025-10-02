import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { courseService, type LessonProgressMap } from '@/services/courseService'
import { useAuth } from '@/contexts/auth-context'
import { courseProgressKey } from '@/hooks/useCourseProgressData'
import type { CourseLesson } from '@/lib/mockData'

const DEFAULT_VIDEO_EMBED = 'https://www.youtube.com/embed/5eTCZ9L834s'

const CoursePlayer: React.FC = () => {
  const { courseId = '' } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const userId = user?.id ?? ''
  const queryClient = useQueryClient()

  const courseQuery = useQuery({
    queryKey: ['course-detail', courseId],
    queryFn: async () => {
      const course = await courseService.getCourseWithLessons(courseId)
      if (!course) {
        throw new Error('Course not found')
      }
      return course
    },
    enabled: Boolean(courseId),
  })

  const lessonProgressQuery = useQuery({
    queryKey: ['lesson-progress', courseId, userId],
    queryFn: () => courseService.getLessonProgressMap(userId, courseId),
    enabled: Boolean(courseId && userId),
  })

  const markLessonCompleteMutation = useMutation({
    mutationFn: (lessonSlug: string) => courseService.markLessonComplete(userId, courseId, lessonSlug),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['lesson-progress', courseId, userId] })
      await queryClient.invalidateQueries({ queryKey: courseProgressKey(userId) })
      await queryClient.invalidateQueries({ queryKey: ['course-progress-summary', userId] })
    },
  })

  const selectedLessonSlugState = useState<string | null>(null)
  const [selectedLessonSlug, setSelectedLessonSlug] = selectedLessonSlugState

  const lessonProgressMap: LessonProgressMap = lessonProgressQuery.data ?? {}

  const course = courseQuery.data
  const lessons = course?.lessonModules ?? []

  const derivedLessons = useMemo<CourseLesson[]>(() => {
    if (lessons.length > 0) {
      return lessons
    }

    if (!course) {
      return []
    }

    return [
      {
        id: `${course.id}-course-video`,
        courseId: course.id,
        slug: 'course-video',
        title: course.title,
        description: course.description,
        orderIndex: 0,
        videoStoragePath: course.introVideoStoragePath ?? null,
        videoThumbnailPath: course.introVideoThumbnailPath ?? null,
        videoSignedUrl: course.introVideoSignedUrl ?? null,
        videoThumbnailUrl: course.introVideoThumbnailUrl ?? null,
        created_at: course.created_at,
      },
    ]
  }, [course, lessons])

  const activeLesson = useMemo(() => {
    if (!derivedLessons.length) return null
    if (selectedLessonSlug) {
      return derivedLessons.find(lesson => lesson.slug === selectedLessonSlug) ?? derivedLessons[0]
    }
    return derivedLessons[0]
  }, [derivedLessons, selectedLessonSlug])

  const completedLessons = useMemo(() => {
    if (!derivedLessons.length) return 0
    return derivedLessons.filter(lesson => lessonProgressMap[lesson.slug]?.completed).length
  }, [derivedLessons, lessonProgressMap])

  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">Course ID is missing.</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (courseQuery.isLoading || lessonProgressQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    )
  }

  if (courseQuery.isError || lessonProgressQuery.isError || !course || !activeLesson) {
    const message = courseQuery.error instanceof Error ? courseQuery.error.message : 'Course could not be loaded.'
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-rose-100">
        <div className="text-center max-w-lg p-6 bg-white shadow-lg rounded-2xl">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Unable to load course</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            onClick={() => navigate(-1)}
          >
            Return to Courses
          </button>
        </div>
      </div>
    )
  }

  const totalLessons = derivedLessons.length
  const activeLessonProgress = lessonProgressMap[activeLesson.slug]
  const isLessonCompleted = Boolean(activeLessonProgress?.completed)
  const completionRatio = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

  const videoUrl = activeLesson.videoSignedUrl || course.introVideoSignedUrl || DEFAULT_VIDEO_EMBED

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <button
                type="button"
                className="mb-3 text-sm text-green-600 hover:text-green-700 flex items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Courses
              </button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 max-w-3xl">{course.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Overall Progress</span>
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${completionRatio}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{completionRatio}% completed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-green-100 dark:border-slate-700">
              <div className="aspect-video bg-black">
                <iframe
                  title={activeLesson.title}
                  src={videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">menu_book</span>
                      Lesson {derivedLessons.findIndex(lesson => lesson.slug === activeLesson.slug) + 1} of {totalLessons}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-3">{activeLesson.title}</h2>
                  </div>
                  {activeLesson.duration && (
                    <span className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      {activeLesson.duration}
                    </span>
                  )}
                </div>
                {activeLesson.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{activeLesson.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${isLessonCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-200'}`}>
                      <span className="material-symbols-outlined text-sm">{isLessonCompleted ? 'check_circle' : 'radio_button_unchecked'}</span>
                      {isLessonCompleted ? 'Completed' : 'Not completed'}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => markLessonCompleteMutation.mutate(activeLesson.slug)}
                    disabled={isLessonCompleted || markLessonCompleteMutation.isPending}
                  >
                    <span className="material-symbols-outlined text-base">task_alt</span>
                    {markLessonCompleteMutation.isPending ? 'Saving...' : 'Mark as Complete'}
                  </button>
                </div>
                {markLessonCompleteMutation.isError && (
                  <p className="text-sm text-red-600">
                    {markLessonCompleteMutation.error instanceof Error
                      ? markLessonCompleteMutation.error.message
                      : 'Failed to update lesson progress.'}
                  </p>
                )}
              </div>
            </div>

            <aside className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-green-100 dark:border-slate-700">
              <div className="border-b border-green-100 dark:border-slate-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lessons</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Select a lesson to watch and mark it complete when you finish.</p>
              </div>
              <div className="max-h-[24rem] overflow-y-auto px-4 py-2 space-y-2">
                {derivedLessons.map((lesson, index) => {
                  const completed = Boolean(lessonProgressMap[lesson.slug]?.completed)
                  const isActive = lesson.slug === activeLesson.slug
                  return (
                    <button
                      key={lesson.slug}
                      type="button"
                      onClick={() => setSelectedLessonSlug(lesson.slug)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${
                        isActive ? 'border-green-500 bg-green-50 dark:bg-slate-700' : 'border-transparent hover:border-green-300 hover:bg-green-50/60 dark:hover:bg-slate-700/60'
                      } ${completed ? 'opacity-100' : 'opacity-95'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Lesson {index + 1}</span>
                        {completed ? (
                          <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            Completed
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">radio_button_unchecked</span>
                            Pending
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">{lesson.title}</h4>
                      {lesson.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{lesson.description}</p>
                      )}
                    </button>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer
