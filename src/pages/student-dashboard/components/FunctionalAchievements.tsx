import React from 'react';
import type { Course } from '@/lib/mockData';
import type { CourseProgressEntry } from '@/services/courseService';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (data: AchievementData) => boolean;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

type SimplifiedProgress = Pick<CourseProgressEntry, 'id' | 'progress' | 'completed'>;
type SimplifiedCourse = Pick<Course, 'id' | 'difficulty'>;

interface AchievementData {
  completedCourses: number;
  totalCourses: number;
  userProgress: SimplifiedProgress[];
  courses: SimplifiedCourse[];
}

type FunctionalAchievementsProps = AchievementData;

const FunctionalAchievements: React.FC<FunctionalAchievementsProps> = ({
  completedCourses,
  totalCourses,
  userProgress,
  courses
}) => {
  
  // Define all possible achievements
  const allAchievements: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
    {
      id: 'first-step',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: '🌱',
      condition: (data) => data.completedCourses >= 1,
      rarity: 'common'
    },
    {
      id: 'beginner-graduate',
      title: 'Beginner Graduate',
      description: 'Complete all beginner courses',
      icon: '🎓',
      condition: (data) => {
        const beginnerCourses = data.courses.filter(c => c.difficulty === 'beginner');
        const completedBeginner = data.userProgress.filter(p => {
          const course = data.courses.find(c => c.id === p.id);
          return course?.difficulty === 'beginner' && p.completed;
        });
        return beginnerCourses.length > 0 && completedBeginner.length === beginnerCourses.length;
      },
      rarity: 'rare'
    },
    {
      id: 'eco-warrior',
      title: 'Eco Warrior',
      description: 'Complete 5 courses',
      icon: '🛡️',
      condition: (data) => data.completedCourses >= 5,
      rarity: 'rare'
    },
    {
      id: 'knowledge-seeker',
      title: 'Knowledge Seeker',
      description: 'Start 3 different courses',
      icon: '🔍',
      condition: (data) => data.userProgress.filter(p => p.progress > 0).length >= 3,
      rarity: 'common'
    },
    {
      id: 'intermediate-master',
      title: 'Intermediate Master',
      description: 'Complete all intermediate courses',
      icon: '🏆',
      condition: (data) => {
        const intermediateCourses = data.courses.filter(c => c.difficulty === 'intermediate');
        const completedIntermediate = data.userProgress.filter(p => {
          const course = data.courses.find(c => c.id === p.id);
          return course?.difficulty === 'intermediate' && p.completed;
        });
        return intermediateCourses.length > 0 && completedIntermediate.length === intermediateCourses.length;
      },
      rarity: 'epic'
    },
    {
      id: 'advanced-expert',
      title: 'Advanced Expert',
      description: 'Complete all advanced courses',
      icon: '👑',
      condition: (data) => {
        const advancedCourses = data.courses.filter(c => c.difficulty === 'advanced');
        const completedAdvanced = data.userProgress.filter(p => {
          const course = data.courses.find(c => c.id === p.id);
          return course?.difficulty === 'advanced' && p.completed;
        });
        return advancedCourses.length > 0 && completedAdvanced.length === advancedCourses.length;
      },
      rarity: 'legendary'
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Complete ALL courses',
      icon: '💎',
      condition: (data) => data.completedCourses === data.totalCourses && data.totalCourses > 0,
      rarity: 'legendary'
    },
    {
      id: 'dedicated-learner',
      title: 'Dedicated Learner',
      description: 'Complete 3 courses',
      icon: '📚',
      condition: (data) => data.completedCourses >= 3,
      rarity: 'common'
    }
  ];

  // Calculate which achievements are unlocked
  const achievements: Achievement[] = allAchievements.map(achievement => {
    const unlocked = achievement.condition({ completedCourses, totalCourses, userProgress, courses });
    return {
      ...achievement,
      unlocked,
      unlockedAt: unlocked ? new Date().toISOString() : undefined
    };
  });

  // Get rarity colors
  const getRarityStyle = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6">
      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🎉 Earned Achievements ({unlockedAchievements.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-gradient-to-br ${getRarityStyle(achievement.rarity)} p-4 rounded-xl text-white shadow-lg transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h5 className="font-bold text-sm">{achievement.title}</h5>
                    <span className="text-xs opacity-80 capitalize">{achievement.rarity}</span>
                  </div>
                </div>
                <p className="text-xs opacity-90">{achievement.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Unlocked!</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🔒 Locked Achievements ({lockedAchievements.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gray-300 dark:bg-gray-700 p-4 rounded-xl shadow-lg opacity-60"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl grayscale">🔒</span>
                  <div>
                    <h5 className="font-bold text-sm text-gray-700 dark:text-gray-300">???</h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{achievement.rarity}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Keep learning to unlock!</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {achievements.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Start Learning to Earn Achievements!
          </h4>
          <p className="text-gray-500 dark:text-gray-500">
            Complete courses to unlock badges and show off your progress.
          </p>
        </div>
      )}
    </div>
  );
};

export default FunctionalAchievements;
