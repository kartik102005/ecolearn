import React, { useMemo, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getInitialsAvatar, type LeaderboardEntry, type LeaderboardScope } from '@/services/leaderboardService';
import { useLeaderboardData } from '@/hooks/useLeaderboardData';

// UI helpers
const toDisplayName = (entry: LeaderboardEntry): string => {
  return entry.full_name || entry.username || 'Student';
}

const Leaderboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [scope, setScope] = useState<LeaderboardScope>('global');

  // Helper: get display name similar to Header
  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name.split(' ')[0];
    if (profile?.username) return profile.username;
    if (user?.email) return user.email.split('@')[0];
    return 'Student';
  };

  // Helper: avatar URL — prefer uploaded URL, fallback to initials
  const getAvatarForEntry = (entry: LeaderboardEntry) => {
    return entry.avatar_url || getInitialsAvatar(toDisplayName(entry));
  };

  const getCurrentUserAvatar = () => {
    return (profile?.avatar_url && profile.avatar_url !== '')
      ? profile.avatar_url
      : getInitialsAvatar(getDisplayName());
  }

  const institution = useMemo(() => profile?.institution || null, [profile?.institution]);
  const {
    entries,
    scopeUsed,
    currentRank,
    isLoading,
    isFetching,
    leaderboardError,
    rankError,
    refetchLeaderboard,
    refetchRank,
    isSchoolScopeDisabled,
  } = useLeaderboardData({
    scope,
    institution,
    userId: user?.id ?? null,
    limit: 100,
    enabled: Boolean(user),
  });

  // Dynamic achievements derived from live profile and rank
  const achievements = useMemo(() => {
    const lvl = profile?.level || 1
    const xp = profile?.total_xp || 0
    const coins = profile?.eco_coins || 0
    const rank = currentRank || null
    return [
      {
        title: 'Top Performer',
        description: 'Currently ranked #1',
        icon: '🏆',
        unlocked: rank === 1
      },
      {
        title: 'Level 5 Reached',
        description: 'Reach level 5',
        icon: '🌿',
        unlocked: lvl >= 5
      },
      {
        title: 'Level 10 Reached',
        description: 'Reach level 10',
        icon: '🌳',
        unlocked: lvl >= 10
      },
      {
        title: 'XP Milestone 5k',
        description: 'Accumulate 5,000 total XP',
        icon: '⚡',
        unlocked: xp >= 5000
      },
      {
        title: 'Eco Saver',
        description: 'Collect 500 eco-coins',
        icon: '🪙',
        unlocked: coins >= 500
      }
    ]
  }, [profile?.level, profile?.total_xp, profile?.eco_coins, currentRank])

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return null;
    }
  };

  const getCurrentUserRank = () => currentRank;

  const effectiveScope = scopeUsed ?? scope;
  const showSchoolScopeBanner = scope === 'school' && isSchoolScopeDisabled;
  const showError = leaderboardError || rankError;
  const isDataLoading = isLoading && entries.length === 0;
  const isUpdating = isFetching && entries.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">emoji_events</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400">See how you rank among eco-warriors</p>
        </div>

      {/* Guidance when School scope selected but institution not set */}
      {showSchoolScopeBanner && (
        <div className="mb-6 p-4 rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined">info</span>
            <div>
              <p className="font-semibold">Set your institution to see the School/College leaderboard.</p>
              <p className="text-sm opacity-80">Go to Settings → Institution (School/College) and enter your school or college name.</p>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Current User Stats */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={getCurrentUserAvatar()} alt="Your avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white/50" />
            <div>
              <h3 className="text-xl font-bold">Your Current Rank</h3>
              <p className="opacity-80">Keep climbing to the top!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">#{getCurrentUserRank() ?? '—'}</p>
            <p className="text-sm opacity-80">in {effectiveScope === 'school' ? 'school/college' : 'global'}</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Scope Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setScope('school')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            scope === 'school' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
          }`}
        >
          School/College Leaderboard
        </button>
        <button
          onClick={() => setScope('global')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            scope === 'global' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
          }`}
        >
          Global Leaderboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            {effectiveScope === 'school' ? 'School/College' : 'Global'} Rankings
          </h3>
          
          <div className="space-y-3">
            {isDataLoading && (
              <div className="p-4 text-gray-600 dark:text-gray-300">Loading leaderboard...</div>
            )}
            {showError && (
              <div className="p-4 text-red-600 flex items-center justify-between gap-4">
                <span>{(leaderboardError || rankError)?.message ?? 'Failed to load leaderboard. Please try again.'}</span>
                <button
                  onClick={() => {
                    void refetchLeaderboard();
                    void refetchRank();
                  }}
                  className="px-3 py-1 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
            {!isDataLoading && !showError && scope === 'school' && isSchoolScopeDisabled && (
              <div className="p-4 text-gray-600 dark:text-gray-300">Set your institution in Settings to view School/College rankings.</div>
            )}
            {isUpdating && (
              <div className="p-4 text-sm text-gray-500 dark:text-gray-400">Updating leaderboard...</div>
            )}
            {!isDataLoading && !showError && entries.map((entry, index) => (
              <div 
                key={entry.id} 
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                  entry.id === user?.id 
                    ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-8">
                    {getRankMedal(index + 1) || (
                      <span className="font-bold text-lg text-gray-600 dark:text-gray-400">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  
                  <img
                    src={getAvatarForEntry(entry)}
                    alt={`${toDisplayName(entry)} avatar`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  
                  <div className="flex-1">
                    <p className={`font-semibold ${entry.id === user?.id ? 'text-green-600' : 'text-gray-800 dark:text-gray-200'}`}>
                      {toDisplayName(entry)}
                      {entry.id === user?.id && <span className="text-sm ml-2 text-green-500">(You)</span>}
                    </p>
                    {effectiveScope === 'school' && entry.institution && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{entry.institution}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-gray-800 dark:text-gray-200">{entry.total_xp.toLocaleString()} XP</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Level {entry.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Stats */}
        <div className="space-y-6">
          {/* Quick Stats (live from profile) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total XP</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{(profile?.total_xp || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Current Level</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{profile?.level || 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Eco-Coins</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{(profile?.eco_coins || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Institution</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{profile?.institution || '—'}</span>
              </div>
            </div>
          </div>

          {/* Ranking Achievements (live) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Rank Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-gray-50 dark:bg-gray-700 opacity-50'
                  }`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
