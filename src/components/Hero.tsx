import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket, Target, Users, BookOpen, Trophy } from "lucide-react";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={ref}
      className={`pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden min-h-screen flex items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Modern decorative elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-32 w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 right-16 w-6 h-6 border border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/3 left-16 w-5 h-5 bg-purple-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto relative z-10 text-center px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            🌍 Transform Tomorrow, Today
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 mb-8 leading-tight px-4">
            Master <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Environmental</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Science</span> with Impact ✨
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Join thousands of change-makers learning through interactive experiences, 
            gamified challenges, and real-world environmental solutions
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 px-4">
            <button className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-3 overflow-hidden w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Start Learning Journey</span>
            </button>
            <button className="group bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/20 flex items-center gap-3 transform hover:scale-105 w-full sm:w-auto">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
              Explore Courses
            </button>
          </div>
          
          {/* Feature Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            {[
              { 
                icon: Users,
                title: "Global Community", 
                description: "Connect with 50K+ eco-learners worldwide",
                color: "from-indigo-500 to-purple-600",
                bg: "from-indigo-50/60 to-purple-50/40"
              },
              { 
                icon: BookOpen,
                title: "Interactive Learning", 
                description: "25+ gamified courses & real-world projects",
                color: "from-purple-500 to-pink-600",
                bg: "from-purple-50/60 to-pink-50/40"
              },
              { 
                icon: Trophy,
                title: "Earn Recognition", 
                description: "100+ achievements & industry certificates",
                color: "from-pink-500 to-rose-600",
                bg: "from-pink-50/60 to-rose-50/40"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-3 h-full flex flex-col">
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} rounded-3xl`}></div>
                    
                    {/* Floating icon background */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200/50 rounded-full h-1 overflow-hidden mt-6">
                        <div 
                          className={`h-full bg-gradient-to-r ${feature.color} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Ready to become an environmental champion? 🏆
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-indigo-700 shadow-lg flex items-center gap-2">
                ⭐ 4.9/5 Rating
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-purple-700 shadow-lg flex items-center gap-2">
                🚀 95% Success Rate
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-pink-700 shadow-lg flex items-center gap-2">
                🌍 180+ Countries
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};