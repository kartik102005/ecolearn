import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'courses', label: 'Courses', icon: 'school' },
    { id: 'challenges', label: 'Challenges', icon: 'military_tech' },
    { id: 'games', label: 'Games', icon: 'sports_esports' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'emoji_events' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const bottomMenuItems = [
    { id: 'help', label: 'Help', icon: 'help' },
    { id: 'logout', label: 'Log Out', icon: 'logout' },
  ];

  const handleMenuClick = async (id: string) => {
    if (id === 'logout') {
      if (loggingOut) return;
      const confirmed = window.confirm(
        'Are you sure you want to log out? You will need to sign in again to access the dashboard.'
      );
      if (!confirmed) return;
      try {
        setLoggingOut(true);
        await signOut();
      } catch (e) {
        console.error('Logout failed:', e);
        setLoggingOut(false);
      }
      return;
    }
    setActiveSection(id);
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between rounded-r-2xl shadow-lg">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12">
          <span className="material-symbols-outlined text-4xl text-green-600">eco</span>
          <h1 className="text-2xl font-bold text-green-600" style={{ fontFamily: 'Fredoka One, cursive' }}>
            EcoLearners
          </h1>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-4">
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-green-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-gray-700'
            }`}
            disabled={item.id === 'logout' && loggingOut}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>
              {item.id === 'logout' && loggingOut ? 'Logging out...' : item.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
