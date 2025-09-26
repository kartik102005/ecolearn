import { Star } from "lucide-react";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: "Priya Sharma",
    title: "Environmental Student",
    image: "/api/placeholder/60/60",
    rating: 5,
    badge: "Youth Eco Leader",
    quote: "EcoLearn has completely changed how I understand environmental issues in India. Learning about local pollution problems and sustainable farming practices has inspired me to start a recycling program in my school."
  },
  {
    name: "Dr. Rajesh Kumar",
    title: "Science Professor",
    image: "/api/placeholder/60/60", 
    rating: 5,
    badge: "Academic Excellence",
    quote: "As a professor teaching in Delhi University, I'm amazed by the quality content on Indian environmental challenges. My students now understand the connection between local pollution and global climate change much better."
  },
  {
    name: "Ananya Patel",
    title: "Climate Activist",
    image: "/api/placeholder/60/60",
    rating: 5,
    badge: "Impact Champion", 
    quote: "The practical knowledge I've gained about water conservation and waste management has helped my NGO design successful community green initiatives. EcoLearn bridges the gap between theory and real-world action."
  }
];

export const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={ref}
      className={`py-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
            What Our Students <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Say</span> 💬
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Real stories from our eco-learning community across India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const colors = [
              { gradient: 'from-violet-500 to-purple-600', bg: 'from-violet-50/50 to-purple-50/30', initials: 'from-violet-500 to-purple-600' },
              { gradient: 'from-fuchsia-500 to-pink-600', bg: 'from-fuchsia-50/50 to-pink-50/30', initials: 'from-fuchsia-500 to-pink-600' },
              { gradient: 'from-indigo-500 to-violet-600', bg: 'from-indigo-50/50 to-violet-50/30', initials: 'from-indigo-500 to-violet-600' }
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
                  
                  {/* Floating background */}
                  <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${colors[index].gradient} rounded-2xl rotate-12 opacity-10 group-hover:rotate-6 transition-transform duration-500`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header with avatar and info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors[index].initials} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <span className="text-white font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                    
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 transform group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow text-base italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Badge */}
                    <div className={`inline-block bg-gradient-to-r ${colors[index].gradient} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg mt-auto`}>
                      ✨ {testimonial.badge}
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
