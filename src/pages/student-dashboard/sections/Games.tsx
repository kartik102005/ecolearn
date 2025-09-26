import React, { useState } from 'react';
import { getAccessibleGradient, focusRingClasses } from '@/utils/colorAccessibility';

interface Game {
  id: number;
  title: string;
  description: string;
  category: 'quiz' | 'puzzle' | 'simulation' | 'adventure' | 'memory';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  players: 'single' | 'multiplayer';
  points: number;
  icon: string;
  color: string;
  status: 'available' | 'playing' | 'completed' | 'locked';
  progress?: number;
  highScore?: number;
}

type GameFilter = 'all' | Game['category'];

const Games: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<GameFilter>('all');

  const games: Game[] = [];

  const filteredGames = activeFilter === 'all' 
    ? games 
    : games.filter(game => game.category === activeFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'playing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'locked':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">sports_esports</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Environmental Games</h1>
          <p className="text-gray-600 dark:text-gray-400">Learn about the environment through fun and interactive games</p>
        </div>
      </div>

      {/* Game Category Tabs */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {([
          { id: 'all', label: 'All Games', count: games.length },
          { id: 'quiz', label: 'Quiz', count: games.filter(g => g.category === 'quiz').length },
          { id: 'puzzle', label: 'Puzzle', count: games.filter(g => g.category === 'puzzle').length },
          { id: 'simulation', label: 'Simulation', count: games.filter(g => g.category === 'simulation').length },
          { id: 'adventure', label: 'Adventure', count: games.filter(g => g.category === 'adventure').length },
          { id: 'memory', label: 'Memory', count: games.filter(g => g.category === 'memory').length }
        ] as { id: GameFilter; label: string; count: number }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${focusRingClasses} ${
              activeFilter === tab.id
                ? `bg-gradient-to-r ${getAccessibleGradient('from-green-500 to-emerald-600')} text-white`
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeFilter === tab.id 
                ? 'bg-white/20' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Gaming Progress Overview */}
      <div className={`bg-gradient-to-r ${getAccessibleGradient('from-green-500 to-emerald-600')} rounded-2xl p-6 mb-8 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Your Gaming Progress</h3>
            <p className="text-green-100">
              {filteredGames.filter(g => g.status === 'completed').length} games completed • 
              {filteredGames.filter(g => g.status === 'playing').length} in progress
            </p>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <p className="text-3xl font-bold">
                {filteredGames.filter(g => g.status === 'completed').reduce((total, game) => total + game.points, 0)}
              </p>
              <p className="text-green-100 text-sm">Points Earned</p>
            </div>
            <div className="w-px h-12 bg-green-400/50"></div>
            <div>
              <p className="text-3xl font-bold">
                {Math.max(...filteredGames.map(g => g.highScore || 0))}
              </p>
              <p className="text-green-100 text-sm">Best Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const headerGradient = getAccessibleGradient(game.color);
          const actionGradient =
            game.status === 'completed'
              ? getAccessibleGradient('from-blue-600 to-indigo-600')
              : game.status === 'locked'
                ? undefined
                : game.status === 'playing'
                  ? getAccessibleGradient('from-orange-500 to-red-500')
                  : getAccessibleGradient('from-green-600 to-emerald-600');

          return (
            <div 
              key={game.id} 
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-full ${
                game.status === 'locked' ? 'opacity-60' : ''
              }`}
            >
              {/* Game Header */}
              <div className={`bg-gradient-to-r ${headerGradient} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{game.icon}</div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize bg-white/20`}>
                      {game.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize bg-white/20`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-white/90 text-sm">{game.description}</p>
              </div>

              {/* Game Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Game Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {game.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        {game.players === 'single' ? 'person' : 'group'}
                      </span>
                      {game.players}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">+{game.points}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {game.progress !== undefined && game.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{game.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${game.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* High Score */}
                {game.highScore && game.highScore > 0 && (
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">High Score:</span>
                    <span className="font-bold text-yellow-600">{game.highScore.toLocaleString()}</span>
                  </div>
                )}

                {/* Spacer to push status and button to bottom */}
                <div className="flex-1"></div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(game.status)}`}>
                    {game.status === 'available' ? 'Ready to Play' : 
                     game.status === 'playing' ? 'In Progress' : 
                     game.status === 'completed' ? 'Completed' : 'Locked'}
                  </span>
                </div>

                {/* Action Button */}
                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                    game.status === 'locked'
                      ? `bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed ${focusRingClasses}`
                      : `bg-gradient-to-r ${actionGradient} text-white hover:brightness-110 ${focusRingClasses}`
                  }`}
                  disabled={game.status === 'locked'}
                  tabIndex={game.status === 'locked' ? -1 : 0}
                >
                  {game.status === 'completed' 
                    ? '🎮 Play Again' 
                    : game.status === 'locked'
                    ? '🔒 Unlock Required'
                    : game.status === 'playing'
                    ? '▶️ Continue Game'
                    : '🎮 Start Game'
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <div className="material-symbols-outlined text-6xl text-gray-400 mb-4">sports_esports</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No games found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try selecting a different game category.</p>
        </div>
      )}
    </div>
  );
};

export default Games;