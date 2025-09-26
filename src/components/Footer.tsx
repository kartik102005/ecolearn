import { Facebook, Twitter, Instagram, Youtube, Heart, Sparkles, ArrowUpRight, Mail } from "lucide-react";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const Footer = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <footer 
      ref={ref}
      className={`py-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Modern decorative elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-32 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'scroll-animate' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            🌱 EcoLearn Platform
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Building a <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Sustainable</span> Future ✨
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Join thousands of eco-champions making a real difference through interactive environmental education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <div className={`group ${isVisible ? 'scroll-animate' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full">
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 rounded-3xl"></div>
              
              {/* Floating background */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EcoLearn</span>
                    <span className="text-sm text-indigo-600 font-bold -mt-1">Learn • Grow • Sustain</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                  Making environmental education accessible and engaging for everyone. Join our mission to create a sustainable future 🌍
                </p>
                
                <div className="flex gap-3">
                  <div className="group/social w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div className="group/social w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <div className="group/social w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="group/social w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learn */}
          <div className={`group ${isVisible ? 'scroll-animate' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-3xl"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  📚 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Learn</span>
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="/courses" className="group/link flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all duration-300 font-semibold">
                      <span>Courses</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group/link flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all duration-300 font-semibold">
                      <span>Certifications</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group/link flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all duration-300 font-semibold">
                      <span>Learning Paths</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group/link flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all duration-300 font-semibold">
                      <span>Resources</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className={`group ${isVisible ? 'scroll-animate' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/30 rounded-3xl"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  👥 <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Community</span>
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="/community" className="group/link flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-semibold">
                      <span>Discussion Forums</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group/link flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-semibold">
                      <span>Study Groups</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group/link flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-semibold">
                      <span>Events</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group/link flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-semibold">
                      <span>Eco Projects</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className={`group ${isVisible ? 'scroll-animate' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-indigo-50/30 rounded-3xl"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  📧 <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Stay Updated</span>
                </h4>
                <p className="text-gray-700 mb-6 font-medium">Get the latest environmental news and learning tips 🌱</p>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Mail className="h-5 w-5 text-violet-500" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-violet-200/50 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium relative"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`${isVisible ? 'scroll-animate' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/20 rounded-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-700 text-sm mb-4 md:mb-0 font-medium flex items-center gap-2">
                © 2024 EcoLearn. Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> for the planet 🌍
              </p>
              
              <div className="flex gap-6 text-sm mb-4 md:mb-0">
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-semibold hover:underline">Privacy Policy</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-semibold hover:underline">Terms of Service</a>
                <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-semibold hover:underline">Cookie Policy</a>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <span>Powered by</span>
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-black">🌱</span>
                </div>
                <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Nature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
