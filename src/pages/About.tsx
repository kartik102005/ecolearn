import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Leaf, 
  Users, 
  Heart, 
  Target, 
  BookOpen, 
  Award,
  TrendingUp,
  Globe,
  Shield,
  Zap
} from "lucide-react";

const About = () => {
  const { ref: impactRef, isVisible: impactVisible } = useScrollAnimation<HTMLElement>();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation<HTMLElement>();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation<HTMLElement>();
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation<HTMLElement>();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation<HTMLElement>();

  // Our Impact Statistics
  const impactStats = [
    {
      number: "50K+",
      label: "Students Learning"
    },
    {
      number: "25+",
      label: "Interactive Lessons"
    },
    {
      number: "100+",
      label: "Achievements"
    }
  ];

  // Our Values
  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "We believe that sustainable practices start with education. Our platform prioritizes environmental consciousness in every aspect of learning."
    },
    {
      icon: Users,
      title: "Inclusive Learning",
      description: "Education should be accessible to everyone. We create inclusive environments where every student can thrive, regardless of their background, location, or learning style."
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "We believe in the power of community. Our platform brings learners, educators, and environmental advocates together to create meaningful change."
    },
    {
      icon: Target,
      title: "Action Oriented",
      description: "Learning without action is incomplete. We focus on practical skills and real-world applications that enable students to make a tangible environmental impact."
    }
  ];

  // Team Members
  const teamMembers = [
    {
      initials: "SG",
      name: "Sarthak Gite",
      role: "Team Leader",
      description: "Experienced team leader coordinating and driving development efforts; emotionally invested in environmental education initiatives."
    },
    {
      initials: "KC",
      name: "Kartik Chopade",
      role: "Developer",
      description: "Full-stack developer creating innovative technology solutions for enhancing and building sustainable ecosystems."
    },
    {
      initials: "SN",
      name: "Sahil Nangare",
      role: "UI/UX Designer",
      description: "Creative UI/UX designer crafting intuitive and engaging user experiences focused on environmental awareness."
    },
    {
      initials: "AT",
      name: "Aarti Thombare",
      role: "Content Developer",
      description: "Educational content expert creating engaging and informative programs on environmental awareness and learning programs."
    },
    {
      initials: "SD",
      name: "Sakshi Dadhale",
      role: "Community Manager",
      description: "Community engagement specialist managing outreach and nurturing user communities with a focus on environmental education and awareness."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* About EcoLearn Section */}
      <section 
        ref={aboutRef}
        className={`pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden transition-opacity duration-1000 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-16 w-4 h-4 border border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              ℹ️ About EcoLearn
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Transforming <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Environmental</span> Education ✨
            </h1>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 font-medium">
              EcoLearn is India's premier environmental education platform, dedicated to bridging the gap between theoretical knowledge and practical action. We believe that education is the foundation of sustainable change.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 shadow-md">
                🌱 50K+ Active Learners
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-purple-700 shadow-md">
                🎯 25+ Interactive Courses
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-pink-700 shadow-md">
                🏆 100+ Certifications
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className={`group ${aboutVisible ? 'scroll-animate' : 'opacity-0'}`}>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 hover:border-emerald-200/50 transform hover:-translate-y-2 h-full">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 rounded-3xl"></div>
                
                {/* Floating icon background */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors duration-300">
                    Our Mission 🎯
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed text-base mb-6 flex-grow">
                    To democratize environmental education and empower individuals with the knowledge and tools needed to create a sustainable future. We aim to make environmental literacy as fundamental as basic literacy, impacting communities and beyond.
                  </p>
                  
                  <div className="flex items-center gap-3 text-indigo-600 font-semibold text-sm mt-auto">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    Impacting communities worldwide
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`group ${aboutVisible ? 'scroll-animate' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 hover:border-blue-200/50 transform hover:-translate-y-2 h-full">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-3xl"></div>
                
                {/* Floating icon background */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl -rotate-12 opacity-10 group-hover:-rotate-6 transition-transform duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                    Our Vision 🌍
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed text-base mb-6 flex-grow">
                    A world where environmental consciousness is universal, sustainable living is the norm, and every individual contributes to planetary health and ecological balance for future generations.
                  </p>
                  
                  <div className="flex items-center gap-3 text-purple-600 font-semibold text-sm mt-auto">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4" />
                    </div>
                    Building a sustainable tomorrow
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Our Impact Section */}
      <section 
        ref={impactRef}
        className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden transition-opacity duration-1000 ${impactVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-32 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Impact</span> 📊
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
              Numbers that reflect our commitment to environmental education and positive change
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {impactStats.map((stat, index) => {
              const colors = [
                { gradient: 'from-indigo-500 to-purple-600', bg: 'from-indigo-50/50 to-purple-50/30', text: 'text-indigo-600' },
                { gradient: 'from-purple-500 to-pink-600', bg: 'from-purple-50/50 to-pink-50/30', text: 'text-purple-600' },
                { gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50/50 to-rose-50/30', text: 'text-pink-600' }
              ];
              return (
                <div 
                  key={index}
                  className={`group ${impactVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-3">
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index].bg} rounded-3xl`}></div>
                    
                    {/* Floating background */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${colors[index].gradient} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.number}
                      </div>
                      <div className={`text-lg font-bold ${colors[index].text} tracking-wide`}>
                        {stat.label}
                      </div>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
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

      {/* Our Values Section */}
      <section 
        ref={valuesRef}
        className={`py-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden transition-opacity duration-1000 ${valuesVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-fuchsia-200/20 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-fuchsia-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-16 w-4 h-4 border border-violet-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Values</span> 💎
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              The principles that guide everything we do at EcoLearn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colors = [
                { gradient: 'from-violet-500 to-purple-600', bg: 'from-violet-50/50 to-purple-50/30', text: 'text-violet-600' },
                { gradient: 'from-purple-500 to-fuchsia-600', bg: 'from-purple-50/50 to-fuchsia-50/30', text: 'text-purple-600' },
                { gradient: 'from-fuchsia-500 to-pink-600', bg: 'from-fuchsia-50/50 to-pink-50/30', text: 'text-fuchsia-600' },
                { gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50/50 to-rose-50/30', text: 'text-pink-600' }
              ];
              
              return (
                <div 
                  key={index}
                  className={`group ${valuesVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2">
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index].bg} rounded-3xl`}></div>
                    
                    {/* Floating icon background */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className={`text-xl font-bold text-gray-900 mb-4 group-hover:${colors[index].text} transition-colors duration-300`}>
                        {value.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-sm mb-4">
                        {value.description}
                      </p>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200/50 rounded-full h-1 overflow-hidden">
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

      {/* Our Story Section */}
      <section 
        ref={storyRef}
        className={`py-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden transition-opacity duration-1000 ${storyVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-fuchsia-200/20 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-32 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-fuchsia-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-16 w-4 h-4 border border-purple-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Story</span> 📚
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              How a small idea grew into India's leading environmental education platform
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className={`group ${storyVisible ? 'scroll-animate' : 'opacity-0'}`}>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 rounded-3xl"></div>
                
                {/* Floating background */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 group-hover:text-purple-700 transition-colors duration-300">
                    From Vision to Reality ✨
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6 text-gray-700 leading-relaxed text-lg">
                      <p>
                        Founded by a dedicated team led by <span className="font-semibold text-purple-600">Sarthak Gite</span>, EcoLearn emerged from a shared passion for environmental education and sustainable development. What started as a small group of environmental advocates and educators has evolved into a comprehensive educational platform.
                      </p>
                      
                      <p>
                        Our team combines expertise from environmental science, technology, education, and community engagement to create meaningful and impactful learning experiences. We recognized the urgent need for accessible environmental education that could bridge the gap between theoretical knowledge and practical action.
                      </p>
                      
                      <p>
                        What began as a collaborative project has evolved into a comprehensive platform that combines innovative technology with evidence-based environmental education, creating an ecosystem that not only teaches but also inspires real-world action for a sustainable future.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                        <h4 className="text-2xl font-bold mb-6 text-center">Our Journey 🚀</h4>
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                              <span className="text-lg font-bold">1</span>
                            </div>
                            <div>
                              <p className="font-bold text-lg">Platform Launch</p>
                              <p className="text-sm opacity-90">Building the foundation</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                              <span className="text-lg font-bold">2</span>
                            </div>
                            <div>
                              <p className="font-bold text-lg">Community Building</p>
                              <p className="text-sm opacity-90">Growing our learner network</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                              <span className="text-lg font-bold">3</span>
                            </div>
                            <div>
                              <p className="font-bold text-lg">Impact Scale</p>
                              <p className="text-sm opacity-90">Reaching thousands of students</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section 
        ref={teamRef}
        className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden transition-opacity duration-1000 ${teamVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-violet-200/20 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-16 w-4 h-4 border border-pink-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Meet Our <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Team</span> 👥
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Passionate environmentalists, educators, and technologists working together to create positive change
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => {
              const colors = [
                { gradient: 'from-indigo-500 to-purple-600', bg: 'from-indigo-50/50 to-purple-50/30', text: 'text-indigo-600' },
                { gradient: 'from-purple-500 to-fuchsia-600', bg: 'from-purple-50/50 to-fuchsia-50/30', text: 'text-purple-600' },
                { gradient: 'from-fuchsia-500 to-pink-600', bg: 'from-fuchsia-50/50 to-pink-50/30', text: 'text-fuchsia-600' },
                { gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50/50 to-rose-50/30', text: 'text-pink-600' },
                { gradient: 'from-rose-500 to-red-600', bg: 'from-rose-50/50 to-red-50/30', text: 'text-rose-600' }
              ];
              
              return (
                <div 
                  key={index}
                  className={`group ${teamVisible ? 'scroll-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-3 text-center h-full flex flex-col">
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index].bg} rounded-3xl`}></div>
                    
                    {/* Floating background */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-20 h-20 bg-gradient-to-br ${colors[index].gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <span className="text-2xl font-bold text-white">
                          {member.initials}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                        {member.name}
                      </h3>
                      
                      <p className={`${colors[index].text} font-bold mb-4 text-sm uppercase tracking-wider`}>
                        {member.role}
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed text-xs mb-4 flex-grow">
                        {member.description}
                      </p>
                      
                      {/* Skills indicator */}
                      <div className="flex justify-center gap-1 mb-3 mt-auto">
                        <div className={`w-2 h-2 bg-gradient-to-r ${colors[index].gradient} rounded-full`}></div>
                        <div className={`w-2 h-2 bg-gradient-to-r ${colors[index].gradient} rounded-full opacity-75`}></div>
                        <div className={`w-2 h-2 bg-gradient-to-r ${colors[index].gradient} rounded-full opacity-50`}></div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200/50 rounded-full h-1 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${colors[index].gradient} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                          style={{ width: '95%' }}
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

    </div>
  );
};

export default About;
