import React, { useState } from 'react';

const Help: React.FC = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      question: 'How do I earn XP points?',
      answer: 'You can earn XP by completing quests, participating in team activities, achieving milestones, and engaging with environmental challenges. Each quest has different XP rewards based on difficulty.',
      category: 'xp'
    },
    {
      id: 2,
      question: 'What are levels and how do I advance?',
      answer: 'Levels represent your overall progress in EcoLearners. You advance levels by earning XP points. Higher levels unlock new quests, features, and special recognition.',
      category: 'levels'
    },
    {
      id: 3,
      question: 'How do I join an Eco Team?',
      answer: 'Go to the Eco Teams section, browse available teams, and click "Join Team" on one that interests you. You can also create your own team and invite friends.',
      category: 'teams'
    },
    {
      id: 4,
      question: 'Can I change my quest once I start it?',
      answer: 'Yes, you can switch quests, but your progress on the current quest will be saved. You can return to it later and continue from where you left off.',
      category: 'quests'
    },
    {
      id: 5,
      question: 'How does the leaderboard work?',
      answer: 'The leaderboard ranks students by XP earned. There are separate leaderboards for your class, school, and globally. Rankings update in real-time as you complete activities.',
      category: 'leaderboard'
    },
    {
      id: 6,
      question: 'What if I forgot my password?',
      answer: 'Contact your teacher or school administrator to reset your password. They can help you regain access to your account safely.',
      category: 'account'
    },
    {
      id: 7,
      question: 'How do I report inappropriate content?',
      answer: 'Use the report button on any content, or contact your teacher immediately. We take all reports seriously and will investigate promptly.',
      category: 'safety'
    },
    {
      id: 8,
      question: 'Can I use EcoLearners on my phone?',
      answer: 'Yes! EcoLearners works on phones, tablets, and computers. Just visit the website through your browser for the best experience.',
      category: 'technical'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with EcoLearners',
      description: 'Learn the basics of navigation and completing your first quest',
      duration: '5 min',
      icon: '🚀'
    },
    {
      id: 2,
      title: 'Joining and Creating Teams',
      description: 'Discover how to collaborate with other eco-warriors',
      duration: '3 min',
      icon: '👥'
    },
    {
      id: 3,
      title: 'Understanding XP and Levels',
      description: 'Master the progression system and unlock achievements',
      duration: '4 min',
      icon: '⭐'
    },
    {
      id: 4,
      title: 'Quest Types and Strategies',
      description: 'Learn about different quest categories and completion tips',
      duration: '6 min',
      icon: '🎯'
    }
  ];

  const contactOptions = [
    {
      title: 'Teacher Support',
      description: 'Contact your classroom teacher for academic questions',
      icon: '👩‍🏫',
      action: 'teacher@school.edu'
    },
    {
      title: 'Technical Help',
      description: 'Report bugs or technical issues',
      icon: '🔧',
      action: 'tech@ecolearners.edu'
    },
    {
      title: 'Safety Concerns',
      description: 'Report inappropriate behavior or content',
      icon: '🛡️',
      action: 'safety@ecolearners.edu'
    },
    {
      title: 'General Questions',
      description: 'Ask questions about platform features',
      icon: '💬',
      action: 'help@ecolearners.edu'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">help</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Help Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Find answers and get support for your eco journey</p>
        </div>
      </div>

      {/* Help Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { id: 'faq', label: 'FAQ', icon: 'quiz' },
          { id: 'tutorials', label: 'Tutorials', icon: 'school' },
          { id: 'contact', label: 'Contact', icon: 'support_agent' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium capitalize">
                    {faq.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">search_off</span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try a different search term or browse all FAQs.</p>
            </div>
          )}
        </div>
      )}

      {/* Tutorials Tab */}
      {activeTab === 'tutorials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tutorial.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-semibold">
                      {tutorial.duration} read
                    </span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Start Tutorial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {option.description}
                    </p>
                    <a
                      href={`mailto:${option.action}`}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
                    >
                      <span className="material-symbols-outlined text-sm">email</span>
                      {option.action}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-red-600">emergency</span>
              <div>
                <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
                  Emergency or Safety Concerns
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  If you encounter any immediate safety concerns, inappropriate behavior, or feel unsafe, 
                  please contact your teacher or school administrator immediately.
                </p>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Report Emergency
                </button>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4">
              💡 Before Contacting Support
            </h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li>• Check the FAQ section for quick answers</li>
              <li>• Try refreshing your browser or clearing cache</li>
              <li>• Make sure you have a stable internet connection</li>
              <li>• Include specific details when reporting issues</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
