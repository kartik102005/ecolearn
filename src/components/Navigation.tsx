import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Info, Users, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/about", label: "About", icon: Info },
    { path: "/community", label: "Community", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-xl">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EcoLearn</span>
              <span className="text-xs text-gray-600 font-medium -mt-1">Transform • Learn • Impact</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} to={item.path} className="relative group">
                  {isActive ? (
                    <div className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 px-6 py-3 shadow-lg">
                      <Icon className="w-5 h-5" />
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 py-3 px-4 text-gray-600 hover:text-indigo-700 transition-all duration-300 rounded-2xl hover:bg-indigo-50/50 hover:backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                      <span className="font-semibold text-sm">{item.label}</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/signin" className="text-sm font-semibold text-gray-600 hover:text-indigo-700 transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-indigo-50/50">
              Sign In
            </Link>
            <Link to="/signup" className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/50 flex items-center justify-center transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <X className="w-5 h-5 text-indigo-600" /> : 
              <Menu className="w-5 h-5 text-indigo-600" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <div 
                        className={`px-4 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 group ${
                          isActive 
                            ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 shadow-lg" 
                            : "text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-700"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'}`} />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
                
                <div className="border-t border-gray-200/60 mt-4 pt-4 flex flex-col gap-3">
                  <Link to="/signin" className="text-left px-4 py-3 rounded-xl font-semibold text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};