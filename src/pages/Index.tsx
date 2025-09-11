import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { GameStats } from "@/components/GameStats";
import { LearningTopics } from "@/components/LearningTopics";

const Index = () => {
  // Sample user progress data
  const userStats = {
    totalPoints: 1847,
    completedTopics: 3,
    currentStreak: 12,
    ecoImpact: 89,
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navigation />
      <Hero />
      
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your <span className="text-transparent bg-gradient-primary bg-clip-text">Progress</span>
            </h2>
            <p className="text-muted-foreground">Track your environmental learning journey</p>
          </div>
          
          <GameStats
            totalPoints={userStats.totalPoints}
            completedTopics={userStats.completedTopics}
            currentStreak={userStats.currentStreak}
            ecoImpact={userStats.ecoImpact}
          />
        </div>
      </section>
      
      <LearningTopics />
      
      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning to protect our planet through interactive, 
            gamified environmental education.
          </p>
          <button className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-medium text-lg transition-organic hover:shadow-glow hover:scale-105">
            Start Your Eco Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
