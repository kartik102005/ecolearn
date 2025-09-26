import { Navigation } from "@/components/Navigation";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Award,
  Globe,
  Lightbulb,
  Share,
  BookOpen,
  Target,
  Zap,
  Leaf,
  Star,
  Shield,
  TrendingUp,
  Camera,
  Calendar,
  Trophy
} from "lucide-react";

const Community = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLElement>();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLElement>();
  const { ref: membersRef, isVisible: membersVisible } = useScrollAnimation<HTMLElement>();
  const { ref: activitiesRef, isVisible: activitiesVisible } = useScrollAnimation<HTMLElement>();
  const { ref: joinRef, isVisible: joinVisible } = useScrollAnimation<HTMLElement>();

  // Community Stats
  const communityStats = [
    {
      number: "15K+",
      label: "Active Members"
    },
    {
      number: "500+",
      label: "Daily Discussions"
    },
    {
      number: "25+",
      label: "Countries"
    },
    {
      number: "1M+",
      label: "Ideas Shared"
    }
  ];

  // Community Features
  const features = [
    {
      icon: MessageCircle,
      title: "Global Discussions",
      description: "Connect with eco-enthusiasts worldwide and share your environmental insights in our vibrant discussion forums."
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Collaborate on groundbreaking environmental projects and turn your green ideas into reality with fellow innovators."
    },
    {
      icon: Share,
      title: "Knowledge Sharing",
      description: "Learn from experts and share your own experiences through our comprehensive resource library and peer mentoring."
    },
    {
      icon: Award,
      title: "Recognition Program",
      description: "Earn badges, certificates, and recognition for your environmental contributions and community participation."
    }
  ];

  // Featured Members
  const featuredMembers = [
    {
      initials: "AS",
      name: "Arjun Sharma",
      role: "Sustainability Expert",
      contribution: "Led 15+ community cleanup drives",
      badge: "Eco Champion",
      color: "from-emerald-500 to-green-600"
    },
    {
      initials: "PG",
      name: "Priya Gupta",
      role: "Climate Researcher",
      contribution: "Shared 200+ research insights",
      badge: "Knowledge Leader",
      color: "from-blue-500 to-cyan-600"
    },
    {
      initials: "RK",
      name: "Rajesh Kumar",
      role: "Green Tech Innovator",
      contribution: "Launched 3 eco-friendly solutions",
      badge: "Innovation Pioneer",
      color: "from-purple-500 to-violet-600"
    },
    {
      initials: "SM",
      name: "Sneha Mehta",
      role: "Environmental Educator",
      contribution: "Trained 1000+ community members",
      badge: "Mentor Master",
      color: "from-orange-500 to-red-600"
    }
  ];

  // Community Activities
  const activities = [
    {
      icon: Globe,
      title: "Global Challenges",
      description: "Join monthly environmental challenges and compete with members worldwide",
      participants: "12K+ participants"
    },
    {
      icon: Camera,
      title: "Eco Photography",
      description: "Share stunning nature photography and document environmental changes",
      participants: "8K+ photos shared"
    },
    {
      icon: Calendar,
      title: "Virtual Events",
      description: "Attend expert webinars, workshops, and community meetups",
      participants: "300+ events monthly"
    },
    {
      icon: BookOpen,
      title: "Study Groups",
      description: "Join collaborative learning sessions and course discussions",
      participants: "150+ active groups"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={headerRef}
        className={`pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden transition-opacity duration-1000 ${headerVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-16 w-4 h-4 border border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        
        <div className="container mx-auto relative z-10 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              Our Community
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Join Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Global</span> Eco Family 👥
            </h1>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 font-medium">
              Connect with passionate environmental advocates from around the world and be part of the movement creating real change for our planet
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {communityStats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 shadow-md">
                  🌍 {stat.number} {stat.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Features Section */}
      <section 
        ref={featuresRef}
        className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden transition-opacity duration-1000 ${featuresVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Why Join Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Community</span>? 🌟
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Experience the power of collective environmental action
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors = [
                { gradient: 'from-indigo-500 to-purple-600', bg: 'from-indigo-50/50 to-purple-50/30', text: 'text-indigo-600' },
                { gradient: 'from-purple-500 to-pink-600', bg: 'from-purple-50/50 to-pink-50/30', text: 'text-purple-600' },
                { gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50/50 to-rose-50/30', text: 'text-pink-600' },
                { gradient: 'from-violet-500 to-indigo-600', bg: 'from-violet-50/50 to-indigo-50/30', text: 'text-violet-600' }
              ];
              
              return (
                <div 
                  key={index}
                  className={`group ${featuresVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full flex flex-col">
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index].bg} rounded-3xl`}></div>
                    
                    {/* Floating icon background */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-20 h-20 bg-gradient-to-br ${colors[index].gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-sm mb-6 flex-grow">
                        {feature.description}
                      </p>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200/50 rounded-full h-1 overflow-hidden mt-auto">
                        <div 
                          className={`h-full bg-gradient-to-r ${colors[index].gradient} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Members Section */}
      <section 
        ref={membersRef}
        className={`py-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden transition-opacity duration-1000 ${membersVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-fuchsia-200/20 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-32 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-fuchsia-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Meet Our <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Champions</span> 🏆
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Inspiring members making real environmental impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMembers.map((member, index) => (
              <div 
                key={index}
                className={`group ${membersVisible ? 'scroll-animate' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-3 text-center h-full flex flex-col">
                  {/* Card background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/30 rounded-3xl"></div>
                  
                  {/* Floating background */}
                  <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${member.color} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <span className="text-2xl font-bold text-white">
                        {member.initials}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    
                    <p className="text-violet-600 font-semibold mb-3 text-sm">
                      {member.role}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed text-xs mb-4 flex-grow">
                      {member.contribution}
                    </p>
                    
                    {/* Badge */}
                    <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 mt-auto">
                      <Trophy className="w-3 h-3" />
                      {member.badge}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Activities Section */}
      <section 
        ref={activitiesRef}
        className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden transition-opacity duration-1000 ${activitiesVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Community <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Activities</span> 🎯
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Engage in meaningful activities that drive environmental change
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const colors = [
                { gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50/50 to-rose-50/30' },
                { gradient: 'from-violet-500 to-purple-600', bg: 'from-violet-50/50 to-purple-50/30' },
                { gradient: 'from-fuchsia-500 to-pink-600', bg: 'from-fuchsia-50/50 to-pink-50/30' },
                { gradient: 'from-purple-500 to-violet-600', bg: 'from-purple-50/50 to-violet-50/30' }
              ];
              
              return (
                <div 
                  key={index}
                  className={`group ${activitiesVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index].bg} rounded-3xl`}></div>
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-700 transition-colors duration-300">
                        {activity.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {activity.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-pink-600 font-semibold text-sm">
                        <Users className="w-4 h-4" />
                        {activity.participants}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section 
        ref={joinRef}
        className={`py-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden transition-opacity duration-1000 ${joinVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10 text-center">
          <div className={`max-w-4xl mx-auto ${joinVisible ? 'scroll-animate' : 'opacity-0'}`}>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 rounded-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  Ready to Make a <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Difference</span>?
                </h2>
                
                <p className="text-xl text-gray-700 mb-8 font-medium">
                  Join thousands of environmental advocates and start your journey towards a sustainable future today
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    Join Community
                  </button>
                  
                  <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 flex items-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    Start Chatting
                  </button>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-500" />
                    <span>Safe & Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Friendly Community</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
