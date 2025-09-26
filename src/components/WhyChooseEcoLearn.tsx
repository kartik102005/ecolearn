import { BookOpen, Shield, Users, Play, Award, TrendingUp } from "lucide-react";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: BookOpen,
    title: "Gamified Learning",
    description: "Transform your learning experience with our game-based approach that makes environmental education engaging and fun."
  },
  {
    icon: Shield,
    title: "Expert Content",
    description: "Learn from industry professionals and academic experts who bring real-world insights to our comprehensive curriculum."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with fellow learners, share insights, and participate in collaborative projects to build a sustainable future."
  },
  {
    icon: Play,
    title: "Interactive Modules",
    description: "Engage with hands-on simulations, virtual labs, and interactive scenarios that bring environmental concepts to life."
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn recognized certifications and industry credentials that validate your environmental knowledge and commitment."
  },
  {
    icon: TrendingUp,
    title: "Real Impact",
    description: "Track your real-world environmental impact and see how your learning translates into meaningful change."
  }
];

export const WhyChooseEcoLearn = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={ref}
      className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Modern decorative elements */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-slate-200/20 to-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute top-20 left-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 left-20 w-1 h-1 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 right-20 w-3 h-3 bg-slate-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EcoLearn</span>? 🌟
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Experience the future of environmental education with cutting-edge technology and engaging gameplay
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = [
              { gradient: 'from-emerald-500 to-green-600', bg: 'from-emerald-50/50 to-green-50/30', text: 'text-emerald-600' },
              { gradient: 'from-blue-500 to-cyan-600', bg: 'from-blue-50/50 to-cyan-50/30', text: 'text-blue-600' },
              { gradient: 'from-purple-500 to-violet-600', bg: 'from-purple-50/50 to-violet-50/30', text: 'text-purple-600' },
              { gradient: 'from-orange-500 to-red-600', bg: 'from-orange-50/50 to-red-50/30', text: 'text-orange-600' },
              { gradient: 'from-indigo-500 to-blue-600', bg: 'from-indigo-50/50 to-blue-50/30', text: 'text-indigo-600' },
              { gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50/50 to-rose-50/30', text: 'text-pink-600' }
            ];
            
            return (
              <div 
                key={index}
                className={`group ${isVisible ? 'scroll-animate' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full flex flex-col">
                  {/* Card background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index].bg} rounded-3xl`}></div>
                  
                  {/* Floating icon background */}
                  <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                      {feature.description}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200/50 rounded-full h-1 overflow-hidden mt-auto">
                      <div 
                        className={`h-full bg-gradient-to-r ${colors[index].gradient} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                        style={{ width: '85%' }}
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
  );
};
