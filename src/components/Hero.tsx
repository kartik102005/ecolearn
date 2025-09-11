import { Button } from "@/components/ui/button";
import { PlayCircle, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-environment.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-leaf-fall opacity-30">
        <div className="w-8 h-8 bg-accent rounded-full" />
      </div>
      <div className="absolute top-40 right-20 animate-leaf-fall opacity-20" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-primary-glow rounded-full" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float opacity-25">
        <div className="w-10 h-10 bg-accent/50 rounded-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Learn <span className="text-transparent bg-gradient-primary bg-clip-text">Green</span>,
            <br />
            Live <span className="text-transparent bg-gradient-primary bg-clip-text">Smart</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Embark on an interactive journey to master environmental science through 
            gamified learning. Earn points, unlock achievements, and become an eco-champion!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button className="btn-nature text-lg px-8 py-4 animate-pulse-glow">
              <PlayCircle className="w-6 h-6 mr-2" />
              Start Learning
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4 transition-organic hover:shadow-nature border-2">
              <Users className="w-6 h-6 mr-2" />
              Join Community
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <div className="animate-float">
              <div className="text-3xl font-bold text-accent">50K+</div>
              <div className="text-muted-foreground">Students Learning</div>
            </div>
            <div className="animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-muted-foreground">Interactive Lessons</div>
            </div>
            <div className="animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-accent flex items-center justify-center gap-1">
                <Award className="w-6 h-6" />
                100+
              </div>
              <div className="text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};