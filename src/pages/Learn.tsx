import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Award, 
  ArrowLeft, 
  ArrowRight,
  TreePine,
  Lightbulb,
  FileText,
  Video
} from "lucide-react";

const Learn = () => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([1, 2]);
  
  const courseData = {
    title: "Ecosystems & Biodiversity",
    description: "Explore the intricate web of life in forest ecosystems and learn how species interact to maintain ecological balance.",
    totalLessons: 8,
    estimatedTime: "2 hours",
    difficulty: "Beginner",
    points: 180
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to Ecosystems",
      type: "video",
      duration: "12 min",
      description: "What makes an ecosystem tick? Discover the basic components and relationships.",
      completed: true
    },
    {
      id: 2,
      title: "Forest Layers & Habitats",
      type: "interactive",
      duration: "15 min", 
      description: "Explore canopy, understory, and forest floor habitats through virtual tours.",
      completed: true
    },
    {
      id: 3,
      title: "Species Interactions",
      type: "lesson",
      duration: "18 min",
      description: "Learn about predation, competition, mutualism, and other ecological relationships.",
      completed: false
    },
    {
      id: 4,
      title: "Food Webs & Energy Flow",
      type: "activity",
      duration: "20 min",
      description: "Interactive simulation of energy transfer through trophic levels.",
      completed: false
    },
    {
      id: 5,
      title: "Biodiversity Hotspots",
      type: "lesson",
      duration: "16 min",
      description: "Discover the world's most biodiverse regions and why they're critical.",
      completed: false
    },
    {
      id: 6,
      title: "Human Impact Assessment",
      type: "activity",
      duration: "25 min",
      description: "Analyze real case studies of ecosystem disruption and restoration.",
      completed: false
    },
    {
      id: 7,
      title: "Conservation Strategies", 
      type: "video",
      duration: "14 min",
      description: "Modern approaches to ecosystem protection and restoration.",
      completed: false
    },
    {
      id: 8,
      title: "Final Challenge",
      type: "quiz",
      duration: "10 min",
      description: "Test your knowledge and earn your Ecosystem Expert badge!",
      completed: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'interactive': return Play;
      case 'lesson': return FileText;
      case 'activity': return Lightbulb;
      case 'quiz': return Award;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-500/20 text-blue-600';
      case 'interactive': return 'bg-purple-500/20 text-purple-600';
      case 'lesson': return 'bg-green-500/20 text-green-600';
      case 'activity': return 'bg-orange-500/20 text-orange-600';
      case 'quiz': return 'bg-red-500/20 text-red-600';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  const currentLessonData = lessons.find(l => l.id === currentLesson) || lessons[0];
  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Course Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="topic-card">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 bg-gradient-primary rounded-2xl">
                    <TreePine className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {courseData.title}
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {courseData.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="bg-accent/20 text-accent-foreground">
                    {courseData.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{courseData.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent font-medium">
                    <Award className="w-4 h-4" />
                    <span>+{courseData.points} points</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-medium text-foreground">
                      {completedLessons.length}/{courseData.totalLessons} lessons completed
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
              </div>
            </div>
            
            {/* Current Lesson Preview */}
            <div className="lg:col-span-1">
              <div className="topic-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">Current Lesson</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {(() => {
                      const Icon = getTypeIcon(currentLessonData.type);
                      return <Icon className="w-5 h-5 text-primary mt-0.5" />;
                    })()}
                    <div>
                      <h4 className="font-medium text-foreground">
                        {currentLessonData.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {currentLessonData.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getTypeColor(currentLessonData.type)}>
                          {currentLessonData.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {currentLessonData.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="btn-nature w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Lesson
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lessons List */}
          <div className="grid md:grid-cols-2 gap-6">
            {lessons.map((lesson, index) => {
              const Icon = getTypeIcon(lesson.type);
              const isCompleted = completedLessons.includes(lesson.id);
              const isCurrent = lesson.id === currentLesson;
              
              return (
                <Card 
                  key={lesson.id}
                  className={`p-6 cursor-pointer transition-organic hover:shadow-nature ${
                    isCurrent ? 'ring-2 ring-primary shadow-glow' : ''
                  } ${isCompleted ? 'bg-secondary/50' : ''}`}
                  onClick={() => setCurrentLesson(lesson.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      isCompleted ? 'bg-accent' : 'bg-gradient-primary'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-accent-foreground" />
                      ) : (
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${
                          isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                        }`}>
                          Lesson {lesson.id}: {lesson.title}
                        </h3>
                        <Badge className={getTypeColor(lesson.type)}>
                          {lesson.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </div>
                        
                        {isCompleted && (
                          <Badge className="bg-accent/20 text-accent-foreground">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Button variant="outline" className="transition-organic hover:shadow-nature">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Lesson
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Lesson {currentLesson} of {courseData.totalLessons}
              </p>
            </div>
            
            <Button className="btn-nature">
              Next Lesson
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;