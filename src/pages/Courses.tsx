import { Navigation } from "@/components/Navigation";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { SVGProps, ComponentType } from 'react';
import { BookOpen, Clock, Users as UsersIcon, Star, Play, Leaf, Droplet, Recycle, Globe, Sun, Cpu, Factory } from "lucide-react";

type Course = {
  id: number;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  level: string;
  duration: string;
  students: string;
  rating: number;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Environment",
    description: "Explore the fundamentals of environmental science and understand our planet's complex systems.",
    icon: Leaf,
    level: "Beginner",
    duration: "2h",
    students: "18k",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Ecosystems and Biodiversity",
    description: "Learn about forest ecosystems, species interactions, and the delicate balance of natural habitats.",
    icon: Droplet,
    level: "Beginner",
    duration: "2h",
    students: "21.5k",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Natural Resources",
    description: "Master the management and conservation of Earth's valuable natural resources.",
    icon: Recycle,
    level: "Beginner",
    duration: "2h",
    students: "76k",
    rating: 4.6,
  },
];

const intermediateCourses: Course[] = [
  {
    id: 4,
    title: "Pollution and Its Effects",
    description: "Study various types of pollution and their devastating impacts on our environment and health.",
    icon: Globe,
    level: "Intermediate",
    duration: "2h",
    students: "18k",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Climate Change and Global Warming",
    description: "Understand global warming, greenhouse effects, and climate patterns that shape our planet's future.",
    icon: Sun,
    level: "Intermediate",
    duration: "2h",
    students: "16k",
    rating: 4.8,
  },
  {
    id: 6,
    title: "Environmental Laws and Policies",
    description: "Explore legal frameworks and policies designed to protect our environment.",
    icon: Factory,
    level: "Intermediate",
    duration: "2h",
    students: "14k",
    rating: 4.7,
  },
];

const advancedCourses: Course[] = [
  {
    id: 7,
    title: "Sustainable Development",
    description: "Master the principles of sustainable development and create solutions for a better future.",
    icon: Leaf,
    level: "Advanced",
    duration: "3h",
    students: "26k",
    rating: 4.6,
  },
  {
    id: 8,
    title: "Emerging Environmental Technologies",
    description: "Explore cutting-edge innovations in clean tech, sustainable manufacturing, and eco-friendly design.",
    icon: Cpu,
    level: "Advanced",
    duration: "3h",
    students: "18k",
    rating: 4.5,
  },
  {
    id: 9,
    title: "Global Environmental Issues",
    description: "Study worldwide environmental challenges and develop strategies for global solutions.",
    icon: Globe,
    level: "Advanced",
    duration: "3h",
    students: "20k",
    rating: 4.4,
  },
];

const Courses = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLElement>();
  const { ref: beginnerRef, isVisible: beginnerVisible } = useScrollAnimation<HTMLElement>();
  const { ref: intermediateRef, isVisible: intermediateVisible } = useScrollAnimation<HTMLElement>();
  const { ref: advancedRef, isVisible: advancedVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header Section */}
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
                <BookOpen className="w-4 h-4" />
              </div>
              📚 Our Courses
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Master <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Environmental</span> Science ✨
            </h1>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 font-medium">
              Explore our comprehensive collection of environmental learning modules designed to transform you into an eco-champion
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 shadow-md">
                📖 8 Interactive Courses
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-purple-700 shadow-md">
                🎯 3 Skill Levels
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-pink-700 shadow-md">
                🏆 Expert-Led Content
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beginner Courses Section */}
      <section 
        ref={beginnerRef}
        className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden transition-opacity duration-1000 ${beginnerVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg mb-8">
              🌱 BEGINNER LEVEL
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Start Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Learning</span> Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div 
                  key={course.id}
                  className={`group ${beginnerVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full flex flex-col">
                    {/* Card background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 rounded-3xl"></div>
                    
                    {/* Floating icon background */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors duration-300">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-sm mb-6 flex-grow">
                        {course.description}
                      </p>
                      
                      {/* Course Meta */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          <span>{course.duration} duration</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <UsersIcon className="w-4 h-4 text-indigo-500" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{course.rating} rating</span>
                        </div>
                      </div>
                      
                      {/* Level badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
                          {course.level}
                        </span>
                      </div>
                      
                      {/* Start button */}
                      <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mt-auto">
                        <Play className="w-5 h-5" />
                        Start Course
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intermediate Courses Section */}
      <section 
        ref={intermediateRef}
        className={`py-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden transition-opacity duration-1000 ${intermediateVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-fuchsia-200/20 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-32 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-fuchsia-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold shadow-lg mb-8">
              🎓 INTERMEDIATE LEVEL
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Advance Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Knowledge</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {intermediateCourses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div 
                  key={course.id}
                  className={`group ${intermediateVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-3xl"></div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-sm mb-6 flex-grow">
                        {course.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span>{course.duration} duration</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <UsersIcon className="w-4 h-4 text-purple-500" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{course.rating} rating</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wide">
                          {course.level}
                        </span>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mt-auto">
                        <Play className="w-5 h-5" />
                        Start Course
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Courses Section */}
      <section 
        ref={advancedRef}
        className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden transition-opacity duration-1000 ${advancedVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold shadow-lg mb-8">
              🚀 ADVANCED LEVEL
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Master <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Expert</span> Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedCourses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div 
                  key={course.id}
                  className={`group ${advancedVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2 h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/30 rounded-3xl"></div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-700 transition-colors duration-300">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-sm mb-6 flex-grow">
                        {course.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Clock className="w-4 h-4 text-pink-500" />
                          <span>{course.duration} duration</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <UsersIcon className="w-4 h-4 text-pink-500" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{course.rating} rating</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold uppercase tracking-wide">
                          {course.level}
                        </span>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mt-auto">
                        <Play className="w-5 h-5" />
                        Start Course
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
