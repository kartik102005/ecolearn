import { Trophy, Target, Zap, Leaf } from "lucide-react";

interface GameStatsProps {
  totalPoints: number;
  completedTopics: number;
  currentStreak: number;
  ecoImpact: number;
}

export const GameStats = ({ totalPoints, completedTopics, currentStreak, ecoImpact }: GameStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="topic-card text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-3 mx-auto">
          <Trophy className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="text-2xl font-bold text-foreground">{totalPoints}</div>
        <div className="text-sm text-muted-foreground">Eco Points</div>
      </div>
      
      <div className="topic-card text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-3 mx-auto">
          <Target className="w-6 h-6 text-accent-foreground" />
        </div>
        <div className="text-2xl font-bold text-foreground">{completedTopics}</div>
        <div className="text-sm text-muted-foreground">Topics Mastered</div>
      </div>
      
      <div className="topic-card text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-3 mx-auto">
          <Zap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
        <div className="text-sm text-muted-foreground">Day Streak</div>
      </div>
      
      <div className="topic-card text-center achievement-glow">
        <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-3 mx-auto animate-pulse-glow">
          <Leaf className="w-6 h-6 text-accent-foreground" />
        </div>
        <div className="text-2xl font-bold text-foreground">{ecoImpact}</div>
        <div className="text-sm text-muted-foreground">Eco Impact</div>
      </div>
    </div>
  );
};