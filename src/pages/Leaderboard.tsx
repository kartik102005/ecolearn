import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Users, 
  Zap,
  Crown,
  Star,
  Target,
  Leaf,
  TreePine
} from "lucide-react";

const Leaderboard = () => {
  const globalLeaders = [
    {
      id: 1,
      name: "Emma Chen",
      avatar: "/placeholder.svg",
      points: 4250,
      level: 12,
      completedTopics: 8,
      streak: 45,
      badges: 15,
      country: "🇸🇬",
      weeklyGain: 380
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "/placeholder.svg", 
      points: 3890,
      level: 11,
      completedTopics: 7,
      streak: 32,
      badges: 12,
      country: "🇺🇸",
      weeklyGain: 245
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg",
      points: 3650,
      level: 10,
      completedTopics: 6,
      streak: 28,
      badges: 11,
      country: "🇪🇸",
      weeklyGain: 290
    },
    {
      id: 4,
      name: "Aiden Kumar",
      avatar: "/placeholder.svg",
      points: 3400,
      level: 10,
      completedTopics: 6,
      streak: 21,
      badges: 9,
      country: "🇮🇳",
      weeklyGain: 195
    },
    {
      id: 5,
      name: "Luna Park",
      avatar: "/placeholder.svg",
      points: 3180,
      level: 9,
      completedTopics: 5,
      streak: 19,
      badges: 8,
      country: "🇰🇷",
      weeklyGain: 160
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Climate Champion",
      description: "Complete all Climate Science lessons",
      icon: Crown,
      rarity: "Legendary",
      holders: 234,
      percentage: 4.2
    },
    {
      id: 2,
      title: "Ecosystem Explorer", 
      description: "Master 5 different ecosystem types",
      icon: TreePine,
      rarity: "Epic",
      holders: 892,
      percentage: 16.1
    },
    {
      id: 3,
      title: "Green Streak",
      description: "Maintain a 30-day learning streak",
      icon: Zap,
      rarity: "Rare",
      holders: 1456,
      percentage: 26.3
    },
    {
      id: 4,
      title: "Carbon Neutral",
      description: "Complete Carbon Footprint module",
      icon: Leaf,
      rarity: "Epic",
      holders: 567,
      percentage: 10.2
    }
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'Epic': return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
      case 'Rare': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'Common': return 'bg-green-500/20 text-green-600 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Global <span className="text-transparent bg-gradient-primary bg-clip-text">Leaderboard</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compete with eco-learners worldwide and showcase your environmental knowledge
            </p>
          </div>

          <Tabs defaultValue="rankings" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="rankings" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Rankings
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rankings" className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-3 mx-auto">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">5,542</div>
                  <div className="text-sm text-muted-foreground">Active Learners</div>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-3 mx-auto">
                    <TrendingUp className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">↑12%</div>
                  <div className="text-sm text-muted-foreground">Weekly Growth</div>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-3 mx-auto">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">847</div>
                  <div className="text-sm text-muted-foreground">Your Rank</div>
                </Card>
                
                <Card className="p-6 text-center achievement-glow">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-3 mx-auto">
                    <Leaf className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">1,847</div>
                  <div className="text-sm text-muted-foreground">Your Points</div>
                </Card>
              </div>

              {/* Top Performers */}
              <div className="space-y-4">
                {globalLeaders.map((leader, index) => (
                  <Card key={leader.id} className={`p-6 transition-organic hover:shadow-nature ${
                    index === 0 ? 'ring-2 ring-yellow-500/50 bg-gradient-to-r from-yellow-50/50 to-transparent' :
                    index === 1 ? 'ring-2 ring-gray-400/50 bg-gradient-to-r from-gray-50/50 to-transparent' :
                    index === 2 ? 'ring-2 ring-amber-600/50 bg-gradient-to-r from-amber-50/50 to-transparent' : ''
                  }`}>
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        {getRankIcon(index + 1)}
                      </div>
                      
                      {/* Avatar and Name */}
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={leader.avatar} alt={leader.name} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                            {leader.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-foreground">{leader.name}</h3>
                            <span className="text-lg">{leader.country}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Level {leader.level}</span>
                            <span>•</span>
                            <span>{leader.completedTopics} topics</span>
                            <span>•</span>
                            <span>{leader.streak}🔥 streak</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {leader.points.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          +{leader.weeklyGain} this week
                        </div>
                        <div className="flex items-center gap-1 justify-end mt-2">
                          <Award className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium">{leader.badges} badges</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <Card key={achievement.id} className="p-6 card-hover">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-primary rounded-xl">
                          <Icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">
                              {achievement.title}
                            </h3>
                            <Badge className={`border ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {achievement.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {achievement.holders.toLocaleString()} learners earned this
                            </div>
                            <div className="text-sm font-medium text-foreground">
                              {achievement.percentage}% completion rate
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;