import React, { useState, useEffect, useMemo } from 'react';
import { useCourseProgressData } from '@/hooks/useCourseProgressData';
import type { Course } from '@/lib/mockData';
import QuestCard from '../components/QuestCard';
import ProgressChart from '../components/ProgressChart';
import AchievementsList from '../components/AchievementsList';
import { buildDynamicQuests, computeProgressOverview } from '@/lib/progressAnalytics';

const Dashboard: React.FC = () => {
  const {
    courses,
    courseProgress,
    isLoading,
    isFetching,
    error,
    refetchAll,
  } = useCourseProgressData();
  const [ignoreError, setIgnoreError] = useState(false);

  useEffect(() => {
    if (!error) {
      setIgnoreError(false);
    }
  }, [error]);

  const backgroundLoading = isFetching && !isLoading;

  const dynamicQuests = useMemo(
    () => buildDynamicQuests(courses, courseProgress),
    [courses, courseProgress]
  );

  const effectiveError = ignoreError ? null : error;
  const showInitialLoading = isLoading && courses.length === 0;

  // Calculate real-time statistics
  const progressOverview = useMemo(() => computeProgressOverview(courses, courseProgress), [courses, courseProgress]);
  const { totalCourses, completedCourses, inProgressCourses, totalXP, averageProgress } = progressOverview;

  // Only show loading screen if no data exists yet
  if (showInitialLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-3"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Enhanced error state with retry functionality
  if (effectiveError) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Dashboard Load Failed
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-4 text-center max-w-md">
            {effectiveError.message}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                void refetchAll();
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => {
                setIgnoreError(true);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Continue Without Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Your Progress Path */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Fredoka One, cursive' }}>
            Your Progress Path
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-green-600 font-semibold">
              {completedCourses}/{courses.length} Courses
            </span>
            {(backgroundLoading || showInitialLoading) && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                <span>{showInitialLoading ? 'Loading...' : 'Updating...'}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Progress Boxes for Each Difficulty Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => {
            const bucket = progressOverview.difficultyBreakdown[difficulty];
            const difficultyCourses = courses.filter(c => c.difficulty === difficulty);
            const completed = bucket.completed;
            const inProgress = bucket.inProgress;
            const progressPercent = bucket.progressPercent;
            
            const levelXP = bucket.totalXP;
            const isUnlocked = difficulty === 'beginner' || 
                              (difficulty === 'intermediate' && progressOverview.completedCourses >= 2) ||
                              (difficulty === 'advanced' && progressOverview.completedCourses >= 4);
            
            const colorMap = {
              beginner: {
                gradient: 'from-green-400 to-green-600',
                hoverGradient: 'from-green-500 to-green-700',
                icon: '🌱',
                bgLight: 'bg-green-50',
                bgDark: 'bg-green-900/20',
                textColor: 'text-green-800 dark:text-green-200',
                unlockLevel: 0,
                title: 'Foundation Builder',
                subtitle: 'Master the basics'
              },
              intermediate: {
                gradient: 'from-yellow-400 to-orange-500',
                hoverGradient: 'from-yellow-500 to-orange-600',
                icon: '🌿',
                bgLight: 'bg-yellow-50',
                bgDark: 'bg-yellow-900/20',
                textColor: 'text-yellow-800 dark:text-yellow-200',
                unlockLevel: 2,
                title: 'Knowledge Expander',
                subtitle: 'Dive deeper into concepts'
              },
              advanced: {
                gradient: 'from-red-400 to-purple-600',
                hoverGradient: 'from-red-500 to-purple-700',
                icon: '🌳',
                bgLight: 'bg-purple-50',
                bgDark: 'bg-purple-900/20',
                textColor: 'text-purple-800 dark:text-purple-200',
                unlockLevel: 4,
                title: 'Expert Mastery',
                subtitle: 'Become an eco-expert'
              }
            };
            
            const colors = colorMap[difficulty as keyof typeof colorMap];
            
            return (
              <div 
                key={difficulty} 
                className={`relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 cursor-pointer ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${colors.gradient} hover:${colors.hoverGradient} hover:scale-105 hover:shadow-2xl text-white`
                    : 'bg-gray-300 dark:bg-gray-700 hover:scale-102 text-gray-600 dark:text-gray-400'
                }`}
              >
                {/* Unlock Overlay for Locked Levels */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-4xl mb-2 text-white">lock</span>
                      <p className="text-white font-semibold text-sm">
                        Complete {colors.unlockLevel} courses to unlock
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Level Progress Ring */}
                <div className="absolute top-4 right-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="6"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="white"
                        strokeWidth="6"
                        strokeDasharray={`${progressPercent * 1.76} 176`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                        {progressPercent}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Header Section */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <span className="text-4xl">{colors.icon}</span>
                      {progressPercent === 100 && isUnlocked && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-sm">star</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold capitalize mb-1">{difficulty} Level</h4>
                      <p className={`text-sm font-medium mb-1 ${isUnlocked ? 'text-white/90' : 'text-gray-500'}`}>
                        {colors.title}
                      </p>
                      <p className={`text-xs ${isUnlocked ? 'text-white/70' : 'text-gray-500'}`}>
                        {colors.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-sm font-medium ${isUnlocked ? 'text-white/90' : 'text-gray-500'}`}>
                        Course Progress
                      </span>
                      <span className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                        {completed}/{difficultyCourses.length}
                      </span>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className={`w-full rounded-full h-3 ${isUnlocked ? 'bg-white/30' : 'bg-gray-400/50'} overflow-hidden`}>
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                          isUnlocked ? 'bg-white shadow-lg' : 'bg-gray-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20"></div>
                      </div>
                    </div>
                    
                    {inProgress > 0 && (
                      <p className={`text-xs mt-2 ${isUnlocked ? 'text-white/70' : 'text-gray-500'}`}>
                        {inProgress} course{inProgress > 1 ? 's' : ''} in progress
                      </p>
                    )}
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className={`text-center p-3 rounded-xl ${
                      isUnlocked ? 'bg-white/20' : 'bg-gray-500/20'
                    }`}>
                      <p className={`text-2xl font-bold ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                        {levelXP.toLocaleString()}
                      </p>
                      <p className={`text-xs ${isUnlocked ? 'text-white/80' : 'text-gray-500'}`}>
                        XP Earned
                      </p>
                    </div>
                    <div className={`text-center p-3 rounded-xl ${
                      isUnlocked ? 'bg-white/20' : 'bg-gray-500/20'
                    }`}>
                      <p className={`text-2xl font-bold ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                        {difficultyCourses.length}
                      </p>
                      <p className={`text-xs ${isUnlocked ? 'text-white/80' : 'text-gray-500'}`}>
                        Available
                      </p>
                    </div>
                  </div>
                  
                  {/* Status and Rewards */}
                  <div className="flex items-center justify-between">
                    <div>
                      {!isUnlocked ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/30 text-gray-600">
                          🔒 Locked
                        </span>
                      ) : progressPercent === 100 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                          🏆 Mastered
                        </span>
                      ) : progressPercent > 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                          📚 Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                          🚀 Start Now
                        </span>
                      )}
                    </div>
                    
                    {/* Milestone Rewards */}
                    {isUnlocked && progressPercent === 100 && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-300 text-sm">emoji_events</span>
                        <span className="text-xs font-bold text-yellow-300">
                          +{levelXP + 500} Bonus XP
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Sparkle Effects for Completed Levels */}
                {isUnlocked && progressPercent === 100 && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Overall Progress Summary */}
        {courses.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold mb-2">Overall Learning Progress</h4>
                <p className="text-green-100">
                  {completedCourses} of {courses.length} courses completed • {totalXP} XP earned
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">
                  {Math.round((completedCourses / courses.length) * 100)}%
                </p>
                <p className="text-green-100 text-sm">Total Progress</p>
              </div>
            </div>
            
            {/* Overall Progress Bar */}
            <div className="w-full bg-green-400/30 rounded-full h-4 mt-4">
              <div 
                className="bg-white h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.round((completedCourses / courses.length) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Empty State for New Users */}
        {courses.length === 0 && (
          <div className="text-center py-16 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
            <div className="text-6xl mb-4">🌱</div>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Your Learning Journey Starts Here!
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete courses to see your progress grow across different difficulty levels.
            </p>
            <button 
              onClick={() => void refetchAll()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Learning
            </button>
          </div>
        )}
      </section>

      {/* Dynamic Quests Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200" style={{ fontFamily: 'Fredoka One, cursive' }}>
            Your Quests
          </h3>
          <span className="text-green-600 font-semibold">
            {dynamicQuests.filter(q => q.isCompleted).length}/{dynamicQuests.length} Completed
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </section>

      {/* Progress and Achievements Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="lg:col-span-2">
          <ProgressChart />
        </div>
        
        {/* Achievements */}
        <div className="lg:col-span-1">
          <AchievementsList />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
