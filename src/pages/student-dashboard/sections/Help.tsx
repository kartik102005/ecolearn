import React, { useState } from 'react';

type FaqCategory =
  | 'getting-started'
  | 'account'
  | 'learning'
  | 'gamification'
  | 'challenges'
  | 'community'
  | 'technical'
  | 'privacy'
  | 'educators';

type HelpTab = 'overview' | 'faq' | 'tutorials' | 'contact';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: FaqCategory;
  tags?: string[];
}

interface TutorialItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
  type: 'video' | 'guide' | 'activity';
  focus: string;
}

interface QuickStartStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface PlatformPillar {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ContactOption {
  title: string;
  description: string;
  icon: string;
  email: string;
  subject: string;
  responseTime: string;
  scope: string;
}

const Help: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HelpTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | 'all'>('all');

  const handleTabChange = (tabId: HelpTab) => {
    setActiveTab(tabId);
  };

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: 'What is EcoLearn and who is it for?',
      answer: 'EcoLearn is a gamified environmental education platform designed for students, educators, and eco-clubs. The Student Dashboard gives each learner a personalized path with quests, challenges, and real-time progress tracking.',
      category: 'getting-started',
      tags: ['mission', 'overview', 'students']
    },
    {
      id: 2,
      question: 'How do I set up my EcoLearn account for the first time?',
      answer: 'Use the sign-up page provided by your teacher or school, verify your email, and then visit the Settings section of the Student Dashboard to complete your profile, choose an avatar, and review notification preferences.',
      category: 'getting-started',
      tags: ['setup', 'profile', 'onboarding']
    },
    {
      id: 3,
      question: 'How do I reset my password or recover access?',
      answer: 'From the sign-in screen, select “Forgot password” to receive a secure reset link. If you no longer have access to the email on file, contact your teacher or the EcoLearn support team to help verify your account.',
      category: 'account',
      tags: ['password', 'security', 'login']
    },
    {
      id: 4,
      question: 'How can I update my name, bio, or avatar?',
      answer: 'Open the Settings section inside the Student Dashboard. Profile changes save instantly and update across the header, leaderboards, and team spaces. Educators can also manage student profiles from their admin view.',
      category: 'account',
      tags: ['settings', 'profile', 'avatar']
    },
    {
      id: 5,
      question: 'How are courses and quests structured?',
      answer: 'EcoLearn breaks content into beginner, intermediate, and advanced modules. Each quest contains short lessons, hands-on eco activities, and reflection prompts that award XP, eco-coins, and badges when completed.',
      category: 'learning',
      tags: ['courses', 'modules', 'quests']
    },
    {
      id: 6,
      question: 'Can I revisit completed lessons or track growth over time?',
      answer: 'Yes. Your Student Dashboard keeps a history of completed lessons, streaks, and XP milestones. You can replay any lesson for additional practice while keeping your original completion credit.',
      category: 'learning',
      tags: ['progress', 'history', 'replay']
    },
    {
      id: 7,
      question: 'How do XP, levels, and eco-coins work together?',
      answer: 'XP measures learning progress and unlocks new levels. Levels release advanced quests and cosmetic rewards. Eco-coins are earned alongside XP and can be redeemed for virtual badges or community challenge boosts.',
      category: 'gamification',
      tags: ['xp', 'levels', 'eco-coins']
    },
    {
      id: 8,
      question: 'How often are quests and challenges refreshed?',
      answer: 'Daily, weekly, and monthly challenges rotate automatically. Featured eco missions are curated by the EcoLearn team and your educators so there is always a new opportunity to earn XP and support the planet.',
      category: 'challenges',
      tags: ['daily challenge', 'missions', 'rewards']
    },
    {
      id: 9,
      question: 'How do I collaborate with classmates or eco-teams?',
      answer: 'Visit the Community section to join or create teams, compare progress on team leaderboards, and share eco-journal updates. Team captains can invite classmates using secure join codes provided by educators.',
      category: 'community',
      tags: ['teams', 'collaboration', 'community']
    },
    {
      id: 10,
      question: 'Which devices and browsers does EcoLearn support?',
      answer: 'EcoLearn runs on modern browsers (Chrome, Edge, Firefox, Safari) across laptops, Chromebooks, tablets, and mobile phones. For the smoothest experience, keep your browser updated and enable audio for interactive lessons.',
      category: 'technical',
      tags: ['devices', 'browser', 'requirements']
    },
    {
      id: 11,
      question: 'What data does EcoLearn collect and how is it protected?',
      answer: 'We store only the information needed to personalize learning—name, email, class, progress metrics, and optional avatar details. Data is encrypted, protected with row-level security policies, and never shared with advertisers.',
      category: 'privacy',
      tags: ['data', 'security', 'policies']
    },
    {
      id: 12,
      question: 'What tools does EcoLearn provide for educators?',
      answer: 'Educators receive dashboards to assign courses, monitor class progress, publish challenges, and export reports. They can also reset student progress, update profiles, and create custom eco-missions aligned to curriculum goals.',
      category: 'educators',
      tags: ['teachers', 'analytics', 'reports']
    }
  ];

  const categoryCounts = faqs.reduce<Record<FaqCategory, number>>(
    (acc, faq) => {
      acc[faq.category] = (acc[faq.category] ?? 0) + 1;
      return acc;
    },
    {
      'getting-started': 0,
      account: 0,
      learning: 0,
      gamification: 0,
      challenges: 0,
      community: 0,
      technical: 0,
      privacy: 0,
      educators: 0
    }
  );

  const categoryFilters: Array<{
    id: FaqCategory | 'all';
    label: string;
    icon: string;
    description: string;
  }> = [
    { id: 'all', label: 'All questions', icon: 'apps', description: 'Browse every topic' },
    { id: 'getting-started', label: 'Getting started', icon: 'rocket_launch', description: 'Account creation & onboarding' },
    { id: 'account', label: 'Account & security', icon: 'lock_reset', description: 'Passwords, profiles, settings' },
    { id: 'learning', label: 'Learning experience', icon: 'menu_book', description: 'Courses, lessons, progress' },
    { id: 'gamification', label: 'Gamification', icon: 'military_tech', description: 'XP, levels, eco-coins' },
    { id: 'challenges', label: 'Challenges & quests', icon: 'flag', description: 'Daily missions & events' },
    { id: 'community', label: 'Community', icon: 'diversity_2', description: 'Teams & collaboration' },
    { id: 'technical', label: 'Technical help', icon: 'devices', description: 'Requirements & troubleshooting' },
    { id: 'privacy', label: 'Privacy & safety', icon: 'shield_lock', description: 'Data protection policies' },
    { id: 'educators', label: 'For educators', icon: 'school', description: 'Classroom management tools' }
  ];

  const categoryLabelMap = categoryFilters.reduce<Record<FaqCategory, string>>((acc, category) => {
    if (category.id !== 'all') {
      acc[category.id] = category.label;
    }
    return acc;
  }, {} as Record<FaqCategory, string>);

  const tutorials: TutorialItem[] = [
    {
      id: 1,
      title: 'EcoLearn orientation tour',
      description: 'Walk through the Student Dashboard, navigation, and mission control in under five minutes.',
      duration: '5 min',
      icon: '🚀',
      type: 'video',
      focus: 'Platform essentials'
    },
    {
      id: 2,
      title: 'Customize your profile & avatar',
      description: 'Update your bio, choose avatars, and sync preferences so your identity shines across EcoLearn.',
      duration: '4 min',
      icon: '🎨',
      type: 'guide',
      focus: 'Profile personalization'
    },
    {
      id: 3,
      title: 'Master XP, levels, and eco-coins',
      description: 'Understand how progression works, how to earn faster, and where to spend eco-coins responsibly.',
      duration: '6 min',
      icon: '💎',
      type: 'video',
      focus: 'Gamification strategy'
    },
    {
      id: 4,
      title: 'Host engaging classroom challenges',
      description: 'Educator walkthrough for launching daily, weekly, and community missions with live tracking.',
      duration: '7 min',
      icon: '🏫',
      type: 'activity',
      focus: 'Educator toolkit'
    },
    {
      id: 5,
      title: 'Technology readiness checklist',
      description: 'Ensure devices, browsers, and accessibility settings are configured for a seamless experience.',
      duration: '3 min',
      icon: '🛠️',
      type: 'guide',
      focus: 'Technical setup'
    }
  ];

  const tutorialTypeMeta: Record<TutorialItem['type'], { icon: string; label: string }> = {
    video: { icon: 'play_circle', label: 'Video' },
    guide: { icon: 'menu_book', label: 'Guide' },
    activity: { icon: 'emoji_events', label: 'Activity' }
  };

  const quickStartSteps: QuickStartStep[] = [
    {
      id: 1,
      title: 'Create or join your class',
      description: 'Use the invite link from your teacher or admin to activate your EcoLearn account.',
      icon: '🧑‍🏫'
    },
    {
      id: 2,
      title: 'Complete your profile',
      description: 'Visit Settings to add your bio, choose an avatar, and set communication preferences.',
      icon: '✨'
    },
    {
      id: 3,
      title: 'Launch your first quest',
      description: 'Open the Dashboard to pick a beginner quest and track your XP against weekly goals.',
      icon: '🎯'
    },
    {
      id: 4,
      title: 'Invite your teammates',
      description: 'Share your team code or join eco-clubs to collaborate on community missions.',
      icon: '🤝'
    }
  ];

  const platformPillars: PlatformPillar[] = [
    {
      id: 1,
      title: 'Personalized learning',
      description: 'Adaptive quests and dashboards tailor environmental topics to each learner.',
      icon: 'auto_awesome'
    },
    {
      id: 2,
      title: 'Real-world impact',
      description: 'Hands-on eco missions connect digital lessons with measurable community change.',
      icon: 'public'
    },
    {
      id: 3,
      title: 'Collaborative community',
      description: 'Teams, leaderboards, and journals keep climate action social, fun, and motivating.',
      icon: 'diversity_3'
    }
  ];

  const emergencyMailHref = `mailto:safety@ecolearners.edu?subject=${encodeURIComponent('Urgent Safety Alert')}`;

  const contactOptions: ContactOption[] = [
    {
      title: 'Student & classroom support',
      description: 'Account access, profile updates, and progress troubleshooting for learners.',
      icon: '🧑‍🎓',
      email: 'support@ecolearners.edu',
      subject: 'Student Support Request',
      responseTime: 'Within 12 hours',
      scope: 'Accounts, progress resets, enrollment codes'
    },
    {
      title: 'Technical operations',
      description: 'Platform performance, bug reports, and device compatibility checks.',
      icon: '🛠️',
      email: 'tech@ecolearners.edu',
      subject: 'Technical Support Request',
      responseTime: 'Within 6 hours',
      scope: 'Bugs, outages, integrations'
    },
    {
      title: 'Safety & data protection',
      description: 'Report inappropriate content or request privacy documentation.',
      icon: '🛡️',
      email: 'safety@ecolearners.edu',
      subject: 'Safety or Privacy Inquiry',
      responseTime: 'Priority · under 2 hours',
      scope: 'Safety concerns, safeguarding, data requests'
    },
    {
      title: 'Partnerships & programs',
      description: 'School rollouts, grants, and regional sustainability initiatives.',
      icon: '🌍',
      email: 'partnerships@ecolearners.edu',
      subject: 'Partnership Inquiry',
      responseTime: 'Within 24 hours',
      scope: 'District onboarding, NGO collaborations'
    }
  ];

  const tabs: Array<{ id: HelpTab; label: string; icon: string; badge?: number; description?: string }> = [
    { id: 'overview', label: 'Overview', icon: 'dashboard_customize' },
    { id: 'faq', label: 'FAQs', icon: 'quiz', badge: faqs.length, description: 'Key platform questions' },
    { id: 'tutorials', label: 'Tutorials', icon: 'school', badge: tutorials.length, description: 'Step-by-step guides' },
    { id: 'contact', label: 'Support', icon: 'support_agent', description: 'Reach our team' }
  ];

  const getCategoryCount = (id: FaqCategory | 'all') => (id === 'all' ? faqs.length : categoryCounts[id]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    if (!normalizedQuery) {
      return matchesCategory;
    }
    const haystack = `${faq.question} ${faq.answer} ${(faq.tags ?? []).join(' ')}`.toLowerCase();
    return matchesCategory && haystack.includes(normalizedQuery);
  });

  const activeCategoryLabel =
    categoryFilters.find((category) => category.id === selectedCategory)?.label ?? 'All questions';

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-green-600">help</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Help Center</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to make the most of EcoLearn’s Student Dashboard.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-base text-green-600">bolt</span>
            Live product support
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-base text-green-600">lock</span>
            FERPA & GDPR compliant
          </span>
        </div>
      </div>

      {/* Help Tabs */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`group relative flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20'
                : 'border-gray-200 bg-white text-gray-700 hover:border-green-200 hover:bg-green-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-green-500/40 dark:hover:bg-gray-700'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            {tab.label}
            {tab.badge != null && (
              <span
                className={`flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border px-2 text-xs ${
                  activeTab === tab.id
                    ? 'border-white/30 bg-white/20 text-white'
                    : 'border-green-200 bg-green-100 text-green-700 dark:border-green-400/40 dark:bg-green-500/20 dark:text-green-200'
                }`}
              >
                {tab.badge}
              </span>
            )}
            {tab.description && (
              <span className="absolute bottom-[-1.75rem] left-1/2 hidden -translate-x-1/2 rounded-xl bg-gray-900 px-3 py-1 text-xs text-white shadow-lg group-hover:block">
                {tab.description}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Quick start checklist</h2>
                <span className="material-symbols-outlined text-green-500">checklist</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                New to EcoLearn? Follow these steps to launch your environmental learning journey in minutes.
              </p>
              <div className="space-y-4">
                {quickStartSteps.map((step) => (
                  <div key={step.id} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                    <span className="text-2xl" aria-hidden>{step.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Why EcoLearn works</h2>
                <span className="material-symbols-outlined text-green-500">compost</span>
              </div>
              <div className="space-y-4">
                {platformPillars.map((pillar) => (
                  <div key={pillar.id} className="flex items-start gap-3 rounded-xl bg-green-50/80 p-4 dark:bg-green-900/20">
                    <span className="material-symbols-outlined text-2xl text-green-600" aria-hidden>
                      {pillar.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{pillar.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <div className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              <span className="material-symbols-outlined text-green-500">info</span>
              Need something else?
            </div>
            <p className="mt-2">
              Our team is continuously adding new lessons, impact missions, and accessibility features based on student
              and educator feedback. Reach out through the support tab if you have a request or idea to share.
            </p>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                type="search"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>
                Showing {filteredFaqs.length} of {faqs.length} answers · {activeCategoryLabel}
              </span>
              {normalizedQuery && <span>Search term: “{normalizedQuery}”</span>}
            </div>
            <div className="-mx-2 flex snap-x gap-3 overflow-x-auto pb-2">
              {categoryFilters.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`snap-start rounded-2xl border px-4 py-3 text-left text-xs transition-all sm:text-sm ${
                      isActive
                        ? 'border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-green-300 hover:bg-green-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">{category.icon}</span>
                      <span className="font-semibold">{category.label}</span>
                      <span
                        className={`inline-flex min-w-[2rem] justify-center rounded-full border px-2 text-[0.65rem] font-medium ${
                          isActive
                            ? 'border-white/30 bg-white/20 text-white'
                            : 'border-green-200 bg-white text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-200'
                        }`}
                      >
                        {getCategoryCount(category.id)}
                      </span>
                    </div>
                    <p className={`mt-2 text-[0.7rem] leading-snug ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {category.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <article key={faq.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{faq.question}</h3>
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700 dark:bg-green-900/30 dark:text-green-200">
                      <span className="material-symbols-outlined text-xs">label_important</span>
                      {categoryLabelMap[faq.category]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  {faq.tags && faq.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                      {faq.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-900/60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-gray-700 dark:bg-gray-900">
              <span className="material-symbols-outlined text-6xl text-gray-300">search_off</span>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">No answers found</h3>
              <p className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
                Try broadening your search keywords or reset the category filter to see all available answers.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500 bg-white px-5 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50 dark:border-green-400 dark:bg-transparent dark:text-green-300"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Reset filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tutorials Tab */}
      {activeTab === 'tutorials' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tutorials.map((tutorial) => (
            <article key={tutorial.id} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-400 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <div className="text-4xl" aria-hidden>{tutorial.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-300">
                    <span className="material-symbols-outlined text-sm">{tutorialTypeMeta[tutorial.type].icon}</span>
                    {tutorialTypeMeta[tutorial.type].label} · {tutorial.focus}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">{tutorial.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{tutorial.description}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-200">
                  <span className="material-symbols-outlined text-sm">timer</span>
                  {tutorial.duration}
                </span>
                <button className="inline-flex items-center gap-2 rounded-full border border-green-500 px-4 py-2 font-semibold text-green-600 transition hover:bg-green-50 dark:border-green-400 dark:text-green-300">
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  Start learning
                </button>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 scale-x-0 transform bg-green-500 transition-all duration-300 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {contactOptions.map((option) => (
              <article key={option.email} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-green-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start gap-4">
                  <span className="text-3xl" aria-hidden>{option.icon}</span>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{option.title}</h3>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700 dark:bg-green-900/40 dark:text-green-200">
                        Response: {option.responseTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{option.description}</p>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Covers: {option.scope}</p>
                    <a
                      href={`mailto:${option.email}?subject=${encodeURIComponent(option.subject)}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 underline underline-offset-4 hover:text-green-700 dark:text-green-300"
                    >
                      <span className="material-symbols-outlined text-sm">email</span>
                      {option.email}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-3xl text-red-600">emergency</span>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-100">Urgent safety support</h3>
                  <p className="text-sm text-red-700 dark:text-red-200">
                    If you witness unsafe behavior, bullying, or content that needs immediate review, alert your
                    educator right away and file an urgent safety ticket. These requests are routed to our duty team 24/7.
                  </p>
                  <a
                    href={emergencyMailHref}
                    className="inline-flex items-center gap-2 rounded-full border border-red-500 bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    <span className="material-symbols-outlined text-sm">notification_important</span>
                    Submit safety alert
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100">Tips before reaching out</h3>
              <ul className="mt-4 space-y-3 text-sm text-blue-700 dark:text-blue-200">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Confirm whether the answer exists in the FAQs or tutorials.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base">restart_alt</span>
                  Refresh your browser or test another device to rule out local issues.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base">sensors</span>
                  Note the lesson, quest, or device where the issue occurs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base">bug_report</span>
                  Attach screenshots or error IDs when submitting technical reports.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;