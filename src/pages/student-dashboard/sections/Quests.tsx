import React, { useState } from 'react';
import QuestCard from '../components/QuestCard';

const Quests: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const allQuests = [
    {
      id: 1,
      title: 'Water Warrior',
      category: 'Water Conservation',
      description: 'Learn 5 ways to save water at home and track your usage for a week.',
      progress: 75,
      xpReward: 50,
      gradient: 'from-blue-300 to-blue-400',
      icon: 'water_drop',
      difficulty: 'beginner',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Recycle Ranger',
      category: 'Waste Management',
      description: 'Start a recycling program in your classroom. Sort 3 types of waste.',
      progress: 40,
      xpReward: 75,
      gradient: 'from-green-400 to-green-500',
      icon: 'recycling',
      difficulty: 'intermediate',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Energy Expert',
      category: 'Energy Saving',
      description: 'Identify 5 devices that use phantom power and unplug them!',
      progress: 90,
      xpReward: 60,
      gradient: 'from-yellow-400 to-orange-400',
      icon: 'lightbulb',
      difficulty: 'beginner',
      status: 'in-progress'
    },
    {
      id: 4,
      title: 'Climate Champion',
      category: 'Climate Action',
      description: 'Research and present on one climate change solution.',
      progress: 0,
      xpReward: 100,
      gradient: 'from-purple-400 to-pink-400',
      icon: 'public',
      difficulty: 'advanced',
      status: 'available'
    },
    {
      id: 5,
      title: 'Green Guardian',
      category: 'Biodiversity',
      description: 'Create a habitat for local wildlife in your school garden.',
      progress: 100,
      xpReward: 85,
      gradient: 'from-emerald-400 to-teal-400',
      icon: 'pets',
      difficulty: 'intermediate',
      status: 'completed'
    },
    {
      id: 6,
      title: 'Plastic Fighter',
      category: 'Ocean Protection',
      description: 'Go plastic-free for one week and document your journey.',
      progress: 0,
      xpReward: 90,
      gradient: 'from-cyan-400 to-blue-500',
      icon: 'no_backpack',
      difficulty: 'advanced',
      status: 'available'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Quests', count: allQuests.length },
    { id: 'in-progress', label: 'In Progress', count: allQuests.filter(q => q.status === 'in-progress').length },
    { id: 'available', label: 'Available', count: allQuests.filter(q => q.status === 'available').length },
    { id: 'completed', label: 'Completed', count: allQuests.filter(q => q.status === 'completed').length }
  ];

  const filteredQuests = activeTab === 'all' 
    ? allQuests 
    : allQuests.filter(quest => quest.status === activeTab);

  const getQuestsByDifficulty = (difficulty: string) => {
    return filteredQuests.filter(quest => quest.difficulty === difficulty);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">task</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Your Quests</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete quests to earn XP and unlock achievements</p>
        </div>
      </div>

      {/* Quest Tabs */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex flex-wrap gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Quest Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="material-symbols-outlined text-3xl text-green-600 mb-2">emoji_events</span>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {allQuests.filter(q => q.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="material-symbols-outlined text-3xl text-blue-600 mb-2">pending</span>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {allQuests.filter(q => q.status === 'in-progress').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <span className="material-symbols-outlined text-3xl text-yellow-600 mb-2">bolt</span>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {allQuests.filter(q => q.status === 'completed').reduce((total, quest) => total + quest.xpReward, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">XP Earned</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <span className="material-symbols-outlined text-3xl text-purple-600 mb-2">auto_awesome</span>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {allQuests.filter(q => q.status === 'available').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
          </div>
        </div>
      </div>

      {/* Quests by Difficulty */}
      {['beginner', 'intermediate', 'advanced'].map((difficulty) => {
        const difficultyQuests = getQuestsByDifficulty(difficulty);
        if (difficultyQuests.length === 0) return null;

        return (
          <div key={difficulty}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 capitalize">
              {difficulty} Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {difficultyQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </div>
        );
      })}

      {filteredQuests.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">search_off</span>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No quests found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try selecting a different tab to see more quests.</p>
        </div>
      )}
    </div>
  );
};

export default Quests;
