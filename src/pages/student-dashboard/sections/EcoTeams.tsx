import React, { useState } from 'react';

const EcoTeams: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-teams');

  const myTeams = [
    {
      id: 1,
      name: 'Green Warriors',
      description: 'Fighting climate change one step at a time',
      members: 8,
      level: 15,
      category: 'Climate Action',
      isLeader: true,
      avatar: '🌱',
      projects: ['School Garden Project', 'Energy Audit']
    },
    {
      id: 2,
      name: 'Ocean Protectors',
      description: 'Saving our seas and marine life',
      members: 12,
      level: 8,
      category: 'Marine Conservation',
      isLeader: false,
      avatar: '🌊',
      projects: ['Beach Cleanup', 'Plastic-Free Campaign']
    }
  ];

  const availableTeams = [
    {
      id: 3,
      name: 'Waste Busters',
      description: 'Zero waste lifestyle advocates',
      members: 6,
      level: 12,
      category: 'Waste Management',
      avatar: '♻️',
      openSlots: 4
    },
    {
      id: 4,
      name: 'Solar Seekers',
      description: 'Promoting renewable energy solutions',
      members: 10,
      level: 20,
      category: 'Renewable Energy',
      avatar: '☀️',
      openSlots: 2
    },
    {
      id: 5,
      name: 'Wildlife Friends',
      description: 'Protecting local biodiversity',
      members: 5,
      level: 7,
      category: 'Biodiversity',
      avatar: '🦋',
      openSlots: 5
    }
  ];

  const teamActivities = [
    {
      id: 1,
      teamName: 'Green Warriors',
      activity: 'Planted 25 trees in the school garden',
      timestamp: '2 hours ago',
      type: 'achievement'
    },
    {
      id: 2,
      teamName: 'Ocean Protectors',
      activity: 'Completed beach cleanup quest',
      timestamp: '5 hours ago',
      type: 'quest'
    },
    {
      id: 3,
      teamName: 'Green Warriors',
      activity: 'New member joined: Sarah Chen',
      timestamp: '1 day ago',
      type: 'member'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'emoji_events';
      case 'quest':
        return 'task_alt';
      case 'member':
        return 'person_add';
      default:
        return 'notifications';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'text-yellow-500';
      case 'quest':
        return 'text-green-500';
      case 'member':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">groups</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Eco Teams</h1>
          <p className="text-gray-600 dark:text-gray-400">Collaborate with fellow eco-warriors</p>
        </div>
      </div>

      {/* Team Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('my-teams')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'my-teams'
              ? 'bg-green-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
          }`}
        >
          My Teams ({myTeams.length})
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'discover'
              ? 'bg-green-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
          }`}
        >
          Discover Teams
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'activities'
              ? 'bg-green-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
          }`}
        >
          Recent Activities
        </button>
      </div>

      {/* My Teams Tab */}
      {activeTab === 'my-teams' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myTeams.map((team) => (
              <div key={team.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{team.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{team.name}</h3>
                      <span className="text-sm text-green-600 font-semibold">{team.category}</span>
                    </div>
                  </div>
                  {team.isLeader && (
                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
                      Leader
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">{team.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {team.members} members
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">star</span>
                      Level {team.level}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Current Projects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.projects.map((project, index) => (
                      <span key={index} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  View Team Details
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-2xl text-white">
            <h3 className="text-xl font-bold mb-2">Create Your Own Team</h3>
            <p className="mb-4">Start your own eco-team and invite friends to join your mission!</p>
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Team
            </button>
          </div>
        </div>
      )}

      {/* Discover Teams Tab */}
      {activeTab === 'discover' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTeams.map((team) => (
            <div key={team.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{team.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{team.name}</h3>
                  <span className="text-sm text-green-600 font-semibold">{team.category}</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">{team.description}</p>
              
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  {team.members} members
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">star</span>
                  Level {team.level}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-green-600 font-semibold">
                  {team.openSlots} open slots available
                </span>
              </div>
              
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Join Team
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Recent Team Activities</h3>
          <div className="space-y-4">
            {teamActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className={`material-symbols-outlined text-2xl ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{activity.teamName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{activity.activity}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoTeams;
