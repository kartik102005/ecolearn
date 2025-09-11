import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopicCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  points: number;
  isLocked?: boolean;
  onClick?: () => void;
}

export const TopicCard = ({ 
  title, 
  description, 
  icon: Icon, 
  progress, 
  difficulty, 
  points, 
  isLocked = false, 
  onClick 
}: TopicCardProps) => {
  const difficultyColor = {
    Beginner: "bg-accent/20 text-accent-foreground",
    Intermediate: "bg-primary/20 text-primary",
    Advanced: "bg-destructive/20 text-destructive"
  };

  return (
    <div className={`topic-card ${isLocked ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-primary ${isLocked ? 'grayscale' : ''}`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <Badge className={difficultyColor[difficulty]}>
          {difficulty}
        </Badge>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="progress-bar h-2 transition-organic" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-accent">+{points}</span>
          <span className="text-xs text-muted-foreground">points</span>
        </div>
        <Button 
          onClick={onClick}
          disabled={isLocked}
          variant={isLocked ? "outline" : "default"}
          className={!isLocked ? "btn-nature" : ""}
        >
          {isLocked ? "Locked" : progress > 0 ? "Continue" : "Start"}
        </Button>
      </div>
    </div>
  );
};