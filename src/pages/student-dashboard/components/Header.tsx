import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useNotifications, type NotificationEntity, type NotificationCategory } from '@/contexts/NotificationContext';
import { calculateLevel } from '@/services/xpService';

interface UserStats {
  totalXP: number;
  level: number;
  completedCourses: number;
  xpToNextLevel: number;
  levelProgress: number;
}

const Header: React.FC = () => {
  const { user, profile } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    totalXP: 0,
    level: 1,
    completedCourses: 0,
    xpToNextLevel: 0,
    levelProgress: 0
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const notificationRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAllAsRead, markAsRead, dismissNotification } = useNotifications();

  const categoryStyles: Record<NotificationCategory, { icon: string; accent: string; highlight: string }> = useMemo(() => ({
    course: {
      icon: 'school',
      accent: 'border-l-emerald-500',
      highlight: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    team: {
      icon: 'groups_3',
      accent: 'border-l-purple-500',
      highlight: 'bg-purple-50 dark:bg-purple-900/20',
    },
    streak: {
      icon: 'local_fire_department',
      accent: 'border-l-orange-500',
      highlight: 'bg-orange-50 dark:bg-orange-900/20',
    },
    system: {
      icon: 'notifications',
      accent: 'border-l-blue-500',
      highlight: 'bg-blue-50 dark:bg-blue-900/20',
    },
  }), []);

  const getNotificationStyle = useCallback(
    (notification: NotificationEntity) => categoryStyles[notification.category] ?? categoryStyles.system,
    [categoryStyles],
  );

  const formatTimestamp = useCallback((notification: NotificationEntity) => {
    try {
      return new Date(notification.createdAt).toLocaleString();
    } catch {
      return notification.createdAt;
    }
  }, []);
  
  // Compute stats based on profile.total_xp and profile.level
  const computeStatsFromProfile = (totalXP: number, levelFromProfile?: number): UserStats => {
    const lvl = calculateLevel(totalXP)
    return {
      totalXP,
      level: levelFromProfile || lvl.level,
      completedCourses: 0,
      xpToNextLevel: lvl.xpToNextLevel,
      levelProgress: lvl.levelProgress
    }
  }
  
  // Update current time every minute for dynamic greeting
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Update stats when profile changes (reflects realtime XP updates)
  useEffect(() => {
    const totalXP = profile?.total_xp || 0
    const levelFromProfile = profile?.level || 1
    const stats = computeStatsFromProfile(totalXP, levelFromProfile)
    setUserStats(stats)
  }, [profile?.total_xp, profile?.level])
  
  // Handle clicking outside notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Get user's display name
  const getDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0]; // First name only
    }
    if (profile?.username) {
      return profile.username;
    }
    if (user?.email) {
      return user.email.split('@')[0]; // Use email username as fallback
    }
    return 'Student';
  };
  
  // Get user avatar - prioritize uploaded URL, fallback to generated initials image
  const getUserIcon = () => {
    if (profile?.avatar_url && profile.avatar_url !== '') {
      return profile.avatar_url;
    }
    const displayName = getDisplayName();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=10b981&color=fff&size=64&rounded=true`;
  };
  
  // Get time-based greeting with more detailed time ranges
  const getGreeting = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  };
  
  return (
    <header className="flex justify-between items-center p-8 bg-green-50 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <img 
          alt="user avatar" 
          className="w-16 h-16 rounded-full border-4 border-yellow-400" 
          src={getUserIcon()}
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {getGreeting()}, {getDisplayName()}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Level {userStats.level} • {userStats.xpToNextLevel} XP to next level
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* XP Display */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow group">
          <span className="material-symbols-outlined text-yellow-500 group-hover:scale-110 transition-transform">bolt</span>
          <div className="text-right">
            <div className="font-bold text-lg text-gray-800 dark:text-gray-200">
              {userStats.totalXP.toLocaleString()} XP
            </div>
            <div className="text-xs text-gray-500">
              {userStats.xpToNextLevel} to level {userStats.level + 1}
            </div>
          </div>
        </div>
        
        {/* Level Display with Progress */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow group">
          <span className="material-symbols-outlined text-green-500 group-hover:scale-110 transition-transform">forest</span>
          <div className="text-right">
            <div className="font-bold text-lg text-gray-800 dark:text-gray-200">
              Level {userStats.level}
            </div>
            <div className="w-16 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${userStats.levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined text-3xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-green-50 dark:border-gray-900">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {/* Notification Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Notifications ({unreadCount} unread)
                </h3>
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Mark all read
                </button>
              </div>
              
              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">notifications_off</span>
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const style = getNotificationStyle(notification)
                    const cardClasses = [
                      'p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4',
                      style.accent,
                      notification.read ? '' : style.highlight,
                    ]
                      .filter(Boolean)
                      .join(' ')

                    return (
                      <div key={notification.id} className={cardClasses}>
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            className="flex-1 text-left"
                            onClick={() => !notification.read && markAsRead(notification.id)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="material-symbols-outlined text-base text-gray-500">
                                {style.icon}
                              </span>
                              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                {notification.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTimestamp(notification)}
                            </p>
                          </button>
                          <button
                            type="button"
                            onClick={() => dismissNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
