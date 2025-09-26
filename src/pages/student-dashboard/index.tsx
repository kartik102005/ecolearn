import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './sections/Dashboard';
import Courses from './sections/Courses';
import Games from './sections/Games';
import Challenges from './sections/Challenges';
import Leaderboard from './sections/Leaderboard';
import Settings from './sections/Settings';
import Help from './sections/Help';

const StudentDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'challenges':
        return <Challenges />;
      case 'games':
        return <Games />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-green-50 dark:bg-gray-900">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
