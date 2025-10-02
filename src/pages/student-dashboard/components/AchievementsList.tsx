import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { courseService } from '@/services/courseService';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  unlocked: boolean;
  category: 'course' | 'level' | 'streak' | 'progress' | 'special';
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  xpReward: number;
}

interface UserProgress {
  id: string;
  user_id: string;
  progress: number;
  completed: boolean;
  started_at: string;
  completed_at?: string;
}

const AchievementsList: React.FC = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch user progress data
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        const progressData = await courseService.getUserCourseProgress(user.id);
        setUserProgress(progressData);
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProgress();
  }, [user?.id]);
  
  // Calculate user statistics
  const calculateUserStats = () => {
    const completedCourses = userProgress.filter(p => p.completed);
    const totalCourses = userProgress.length;
    const totalXP = completedCourses.length * 250;
    const level = Math.floor(totalXP / 500) + 1;
    const beginnerCourses = completedCourses.filter(p => {
      // You can enhance this by fetching actual course difficulty data
      return p.id.includes('beginner') || completedCourses.indexOf(p) < 3;
    });
    const intermediateCourses = completedCourses.filter(p => {
      return p.id.includes('intermediate') || (completedCourses.indexOf(p) >= 3 && completedCourses.indexOf(p) < 6);
    });
    const advancedCourses = completedCourses.filter(p => {
      return p.id.includes('advanced') || completedCourses.indexOf(p) >= 6;
    });
    
    return {
      completedCourses: completedCourses.length,
      totalCourses,
      totalXP,
      level,
      beginnerCompleted: beginnerCourses.length,
      intermediateCompleted: intermediateCourses.length,
      advancedCompleted: advancedCourses.length
    };
  };
  
  const stats = calculateUserStats();
  
  // Define all available achievements with dynamic unlocking logic
  const allAchievements: Achievement[] = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: 'footprint',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-100/50 dark:bg-green-900/30',
      unlocked: stats.completedCourses >= 1,
      category: 'course',
      xpReward: 100,
      progress: Math.min(stats.completedCourses, 1),
      maxProgress: 1
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Complete 3 courses',
      icon: 'trending_up',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/30',
      unlocked: stats.completedCourses >= 3,
      category: 'course',
      xpReward: 250,
      progress: Math.min(stats.completedCourses, 3),
      maxProgress: 3
    },
    {
      id: 'eco-warrior',
      title: 'Eco Warrior',
      description: 'Complete 5 courses',
      icon: 'eco',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-100/50 dark:bg-emerald-900/30',
      unlocked: stats.completedCourses >= 5,
      category: 'course',
      xpReward: 500,
      progress: Math.min(stats.completedCourses, 5),
      maxProgress: 5
    },
    {
      id: 'level-up',
      title: 'Level Up!',
      description: 'Reach Level 2',
      icon: 'star',
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-100/50 dark:bg-yellow-900/30',
      unlocked: stats.level >= 2,
      category: 'level',
      xpReward: 200,
      progress: Math.min(stats.level - 1, 1),
      maxProgress: 1
    },
    {
      id: 'rising-star',
      title: 'Rising Star',
      description: 'Reach Level 3',
      icon: 'star_rate',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-100/50 dark:bg-orange-900/30',
      unlocked: stats.level >= 3,
      category: 'level',
      xpReward: 300,
      progress: Math.min(stats.level - 2, 1),
      maxProgress: 1
    },
    {
      id: 'beginner-master',
      title: 'Beginner Master',
      description: 'Complete 3 beginner courses',
      icon: 'school',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100/50 dark:bg-green-900/30',
      unlocked: stats.beginnerCompleted >= 3,
      category: 'progress',
      xpReward: 300,
      progress: Math.min(stats.beginnerCompleted, 3),
      maxProgress: 3
    },
    {
      id: 'knowledge-seeker',
      title: 'Knowledge Seeker',
      description: 'Start an intermediate course',
      icon: 'search',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/30',
      unlocked: stats.intermediateCompleted >= 1,
      category: 'progress',
      xpReward: 400,
      progress: Math.min(stats.intermediateCompleted, 1),
      maxProgress: 1
    },
    {
      id: 'xp-collector',
      title: 'XP Collector',
      description: 'Earn 1,000 XP',
      icon: 'bolt',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100/50 dark:bg-yellow-900/30',
      unlocked: stats.totalXP >= 1000,
      category: 'special',
      xpReward: 500,
      progress: Math.min(stats.totalXP, 1000),
      maxProgress: 1000
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Complete all available courses',
      icon: 'verified',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/30',
      unlocked: stats.totalCourses > 0 && stats.completedCourses === stats.totalCourses,
      category: 'special',
      xpReward: 1000,
      progress: stats.completedCourses,
      maxProgress: stats.totalCourses || 1
    }
  ];
  
  // Sort achievements: unlocked first, then by category
  const sortedAchievements = allAchievements.sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return 0;
  });
  
  // Show top 6 achievements
  const displayedAchievements = sortedAchievements.slice(0, 6);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Achievements</h3>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }
  
  const unlockedCount = displayedAchievements.filter(a => a.unlocked).length;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Achievements</h3>
        <div className="text-sm text-green-600 font-semibold">
          {unlockedCount}/{allAchievements.length} Unlocked
        </div>
      </div>
      
      {/* Achievement Stats */}
      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total XP from Achievements:</span>
          <span className="font-bold text-green-600">
            +{displayedAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0)} XP
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        {displayedAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
              achievement.unlocked 
                ? `${achievement.bgColor} hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md` 
                : `bg-gray-100 dark:bg-gray-700 opacity-60`
            }`}
          >
            {/* Achievement Icon */}
            <div className="relative">
              <span className={`material-symbols-outlined text-3xl ${
                achievement.unlocked ? achievement.iconColor : 'text-gray-400'
              }`}>
                {achievement.unlocked ? achievement.icon : 'lock'}
              </span>
              {achievement.unlocked && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xs">check</span>
                </div>
              )}
            </div>
            
            {/* Achievement Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className={`font-bold ${
                  achievement.unlocked ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.title}
                </p>
                {achievement.unlocked && (
                  <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    +{achievement.xpReward} XP
                  </span>
                )}
              </div>
              
              <p className={`text-sm mb-2 ${
                achievement.unlocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-500'
              }`}>
                {achievement.description}
              </p>
              
              {/* Progress Bar */}
              {achievement.maxProgress && achievement.maxProgress > 1 && (
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">
                      Progress: {achievement.progress || 0}/{achievement.maxProgress}
                    </span>
                    <span className="text-gray-500">
                      {Math.round(((achievement.progress || 0) / achievement.maxProgress) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                      style={{ 
                        width: `${Math.min(((achievement.progress || 0) / achievement.maxProgress) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Unlocked Timestamp */}
            {achievement.unlocked && (
              <div className="absolute top-2 right-2">
                <span className="text-xs text-green-600 opacity-75">
                  ✓
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Show All Button */}
      {allAchievements.length > 6 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-green-600 font-semibold hover:text-green-700 transition-colors px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20">
            View All {allAchievements.length} Achievements
          </button>
        </div>
      )}
    </div>
  );
};

export default AchievementsList;
