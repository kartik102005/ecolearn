import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const topics = [
  // Beginner Level
  {
    id: 1,
    title: "Introduction to Environment",
    description: "Explore the fundamentals of environmental science and understand our planet's complex systems.",
    icon: "🌱",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Ecosystems and Biodiversity", 
    description: "Learn about forest ecosystems, species interactions, and the delicate balance of natural habitats.",
    icon: "🌿",
    level: "Beginner"
  },
  {
    id: 3,
    title: "Natural Resources",
    description: "Master the management and conservation of Earth's valuable natural resources.", 
    icon: "💎",
    level: "Beginner"
  },
  // Intermediate Level
  {
    id: 4,
    title: "Pollution and Its Effects",
    description: "Study various types of pollution and their devastating impacts on our environment and health.",
    icon: "🏭",
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Climate Change and Global Warming",
    description: "Understand global warming, greenhouse effects, and climate patterns that shape our planet's future.",
    icon: "🌡️",
    level: "Intermediate"
  },
  {
    id: 6,
    title: "Environmental Laws and Policies",
    description: "Explore legal frameworks and policies designed to protect our environment.",
    icon: "⚖️",
    level: "Intermediate"
  },
  // Advanced Level
  {
    id: 7,
    title: "Sustainable Development",
    description: "Master the principles of sustainable development and create solutions for a better future.",
    icon: "🔄",
    level: "Advanced"
  },
  {
    id: 8,
    title: "Emerging Environmental Technologies",
    description: "Explore cutting-edge innovations in clean tech, sustainable manufacturing, and eco-friendly design.",
    icon: "🔬",
    level: "Advanced"
  },
  {
    id: 9,
    title: "Global Environmental Issues",
    description: "Study worldwide environmental challenges and develop strategies for global solutions.",
    icon: "🌍",
    level: "Advanced"
  },
];

export const LearningTopics = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={ref}
      className={`py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
            Choose Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Learning Path</span> 🎯
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Select from our comprehensive collection of environmental learning modules designed to take you from theory to application
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const colors = [
              { gradient: 'from-indigo-500 to-purple-600', bg: 'from-indigo-50/50 to-purple-50/30' },
              { gradient: 'from-purple-500 to-pink-600', bg: 'from-purple-50/50 to-pink-50/30' },
              { gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50/50 to-rose-50/30' },
              { gradient: 'from-violet-500 to-indigo-600', bg: 'from-violet-50/50 to-indigo-50/30' },
              { gradient: 'from-blue-500 to-indigo-600', bg: 'from-blue-50/50 to-indigo-50/30' },
              { gradient: 'from-fuchsia-500 to-purple-600', bg: 'from-fuchsia-50/50 to-purple-50/30' },
              { gradient: 'from-rose-500 to-pink-600', bg: 'from-rose-50/50 to-pink-50/30' },
              { gradient: 'from-indigo-500 to-blue-600', bg: 'from-indigo-50/50 to-blue-50/30' }
            ];
            
            return (
              <div 
                key={topic.id}
                className={`group cursor-pointer ${isVisible ? 'scroll-animate' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 transform hover:-translate-y-3 h-full flex flex-col">
                  {/* Card background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length].bg} rounded-3xl`}></div>
                  
                  {/* Floating background */}
                  <div className={`absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br ${colors[index % colors.length].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colors[index % colors.length].gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{topic.icon}</span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-indigo-700 transition-colors duration-300">
                      {topic.title}
                    </h3>
                    
                    <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                      {topic.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="w-full bg-gray-200/50 rounded-full h-1 overflow-hidden mt-4">
                      <div 
                        className={`h-full bg-gradient-to-r ${colors[index % colors.length].gradient} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                        style={{ width: '75%' }}
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