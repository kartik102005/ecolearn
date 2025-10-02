import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseProgressData } from '@/hooks/useCourseProgressData';
import { useCourseProgressMutations } from '@/hooks/useCourseProgressMutations';
import type { Course } from '@/lib/mockData';
import { getAccessibleGradient, focusRingClasses } from '@/utils/colorAccessibility';
import { useToast } from '@/components/ui/use-toast';

interface CourseWithProgress extends Course {
  progress?: number;
  hasProgressEntry?: boolean;
}

const Courses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const {
    userId,
    courses,
    courseProgress,
    isLoading,
    isFetching,
    error,
    refetchAll,
  } = useCourseProgressData();
  const {
    startOrAdvanceCourseAsync,
    isPending,
    pendingCourseId,
    error: mutationError,
  } = useCourseProgressMutations();

  const [previewCourseId, setPreviewCourseId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const coursesWithProgress = useMemo<CourseWithProgress[]>(() => {
    return courses.map(course => {
      const progressEntry = courseProgress.find(p => p.id === course.id);
      return {
        ...course,
        progress: progressEntry?.progress ?? 0,
        hasProgressEntry: Boolean(progressEntry),
      };
    });
  }, [courses, courseProgress]);

  const handleCourseEnrollment = useCallback(
    async (course: CourseWithProgress) => {
      const currentProgress = typeof course.progress === 'number' ? course.progress : 0;

      if (course.hasProgressEntry || currentProgress > 0) {
        return false;
      }

      await startOrAdvanceCourseAsync({ courseId: course.id, currentProgress });

      toast({
        title: '🎉 Enrollment Successful!',
        description: `You're all set to begin "${course.title}". Dive in and start learning!`,
        duration: 4000,
        className:
          'border border-emerald-400 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-200 animate-in slide-in-from-top-2 fade-in duration-300',
      });

      return true;
    },
    [startOrAdvanceCourseAsync, toast]
  );

  // Filter courses based on active filter
  const filteredCourses = useMemo(() => {
    return coursesWithProgress.filter(course =>
      activeFilter === 'all' || course.difficulty === activeFilter
    );
  }, [activeFilter, coursesWithProgress]);

  // Loading state with timeout protection
  if (isLoading && coursesWithProgress.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Fredoka One, cursive' }}>
            My Courses
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your courses...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Fredoka One, cursive' }}>
            My Courses
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center h-64">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Failed to load courses
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            {error.message}
          </p>
          <button 
            onClick={() => void refetchAll()}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors ${focusRingClasses}`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Helper function to get course counts
  const getCourseCountByDifficulty = (difficulty: string) => {
    if (difficulty === 'all') return coursesWithProgress.length;
    return coursesWithProgress.filter(course => course.difficulty === difficulty).length;
  };

  // Calculate progress stats
  const completedCourses = filteredCourses.filter(course => (course.progress || 0) >= 100);
  const inProgressCourses = filteredCourses.filter(course => (course.progress || 0) > 0 && (course.progress || 0) < 100);
  const totalXP = completedCourses.length * 250; // Assume 250 XP per completed course
  const averageProgress = coursesWithProgress.length > 0
    ? Math.round(coursesWithProgress.reduce((acc, course) => acc + (course.progress || 0), 0) / coursesWithProgress.length)
    : 0;

  return (
    <div className="space-y-8">
      {(mutationError) && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
          {mutationError.message}
        </div>
      )}
      {/* Header with Icon and Description */}
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">school</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Environmental Courses</h1>
          <p className="text-gray-600 dark:text-gray-400">Master environmental science through structured learning paths</p>
        </div>
      </div>
      {/* Course Level Filter Tabs */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {[
          { id: 'all', label: 'All Courses', count: getCourseCountByDifficulty('all') },
          { id: 'beginner', label: 'Beginner', count: getCourseCountByDifficulty('beginner') },
          { id: 'intermediate', label: 'Intermediate', count: getCourseCountByDifficulty('intermediate') },
          { id: 'advanced', label: 'Advanced', count: getCourseCountByDifficulty('advanced') }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${focusRingClasses} ${
              activeFilter === tab.id
                ? `bg-gradient-to-r ${getAccessibleGradient('from-green-500 to-emerald-600')} text-white`
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                activeFilter === tab.id
                  ? 'bg-white/20'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
      {/* Learning Progress Overview */}
      <div className={`bg-gradient-to-r ${getAccessibleGradient('from-green-500 to-emerald-600')} rounded-2xl p-6 mb-8 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Your Learning Progress</h3>
            <p className="text-green-100">
              {completedCourses.length} courses completed • 
              {inProgressCourses.length} in progress
            </p>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <p className="text-3xl font-bold">{totalXP}</p>
              <p className="text-green-100 text-sm">XP Earned</p>
            </div>
            <div className="w-px h-12 bg-green-400/50"></div>
            <div>
              <p className="text-3xl font-bold">{averageProgress}%</p>
              <p className="text-green-100 text-sm">Avg Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const courseProgressValue = typeof course.progress === 'number' ? course.progress : 0;
          const isCompleted = courseProgressValue >= 100;
          const isStarted = course.hasProgressEntry ?? courseProgressValue > 0;
          const difficultyColor = course.difficulty === 'beginner' ? 'text-green-600' : 
                                 course.difficulty === 'intermediate' ? 'text-yellow-600' : 'text-red-600';
          
          const headerGradient = getAccessibleGradient(course.color);

          const actionGradient = isCompleted
            ? getAccessibleGradient('from-emerald-500 to-teal-500')
            : isStarted
              ? getAccessibleGradient('from-sky-500 to-indigo-500')
              : getAccessibleGradient('from-rose-500 to-orange-500');

          const lessonModules = course.lessonModules ?? [];
          const topicsPreview = (course.topics ?? []).slice(0, 2);
          const isPreviewing = previewCourseId === course.id;

          return (
            <div
              key={course.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col h-full ${
                !isStarted ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : 'hover:shadow-xl hover:scale-105'
              }`}
              onClick={() => {
                if (!isStarted) {
                  setPreviewCourseId(course.id);
                }
              }}
            >
              {/* Course Header */}
              <div className={`bg-gradient-to-r ${headerGradient} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{course.icon || '📚'}</div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-white/20">
                      {course.difficulty}
                    </span>
                    {isCompleted && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                        ✓ Complete
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-white/90 text-sm">{course.description}</p>
              </div>

              {/* Course Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Course Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">book</span>
                      {course.lessons} lessons
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">+250</p>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {isStarted && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{courseProgressValue}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${courseProgressValue}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Course Topics Preview */}
                <div className="mb-4 flex-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Topics:</span>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                    {topicsPreview.join(' • ')}
                    {(course.topics?.length ?? 0) > 2 && ` • +${(course.topics?.length ?? 0) - 2} more`}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    isStarted ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {isCompleted ? '✅ Completed' : isStarted ? '📚 In Progress' : '🚀 Ready to Start'}
                  </span>
                  <span className={`text-sm font-medium ${difficultyColor}`}>
                    {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                  </span>
                </div>

                {/* Action Button */}
                <button 
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!isStarted) {
                      handleCourseEnrollment(course)
                        .then(success => {
                          if (!success) return;
                          setPreviewCourseId(null);
                          navigate(`/courses/${course.id}`);
                        })
                        .catch(() => {
                          toast({
                            title: 'Enrollment failed',
                            description: 'Something went wrong while enrolling. Please try again.',
                            variant: 'destructive',
                          });
                        });
                    } else {
                      navigate(`/courses/${course.id}`);
                    }
                  }}
                  disabled={pendingCourseId === course.id || isPending}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:brightness-110 shadow-lg bg-gradient-to-r ${actionGradient} text-white disabled:opacity-70 disabled:cursor-not-allowed ${focusRingClasses}`}
                >
                  {pendingCourseId === course.id
                    ? '⏳ Updating...'
                    : !isStarted
                      ? '🎓 Enroll Course'
                      : '▶️ Start Learning'
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {previewCourseId && (() => {
        const course = filteredCourses.find(c => c.id === previewCourseId);
        if (!course) return null;
        const lessonModules = course.lessonModules ?? [];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/85 backdrop-blur">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[32px] border border-emerald-500/30 bg-white shadow-emerald-500/30 shadow-2xl">
              <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">Full Syllabus</p>
                  <h3 className="text-2xl font-bold text-emerald-700">{course.title}</h3>
                  <p className="text-sm text-emerald-600/90">What you will learn throughout this course</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewCourseId(null)}
                  className="rounded-full border border-emerald-200 px-4 py-1.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-100"
                >
                  Close
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto px-6 py-6 space-y-4">
                {lessonModules.length === 0 ? (
                  <p className="text-sm text-emerald-600/80">Syllabus details coming soon.</p>
                ) : (
                  lessonModules.map((lesson, index) => (
                    <div key={lesson.id} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                      <div className="flex items-center justify-between text-emerald-500">
                        <span className="text-sm font-semibold uppercase tracking-wide">Lesson {index + 1}</span>
                        {lesson.duration && (
                          <span className="text-xs text-emerald-500">{lesson.duration}</span>
                        )}
                      </div>
                      <h4 className="mt-2 text-lg font-semibold text-emerald-800">{lesson.title}</h4>
                      {lesson.description && (
                        <p className="mt-1 text-sm text-emerald-600/80">{lesson.description}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <span className="material-symbols-outlined text-6xl text-green-400 mb-4">school</span>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No courses found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {activeFilter === 'all' 
              ? 'No courses available at the moment.' 
              : `Try selecting a different difficulty level.`
            }
          </p>
          <button 
            onClick={() => void refetchAll()}
            className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors ${focusRingClasses}`}
          >
            Refresh Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
        
