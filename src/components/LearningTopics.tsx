import { TreePine, Droplets, Recycle, Sun, Wind, Leaf, Globe, Factory } from "lucide-react";
import { TopicCard } from "./TopicCard";

const topics = [
  {
    id: 1,
    title: "Climate Science",
    description: "Understand global warming, greenhouse effects, and climate patterns that shape our planet's future.",
    icon: Globe,
    progress: 75,
    difficulty: "Intermediate" as const,
    points: 250,
    isLocked: false,
  },
  {
    id: 2,
    title: "Ecosystems & Biodiversity",
    description: "Explore forest ecosystems, species interactions, and the delicate balance of natural habitats.",
    icon: TreePine,
    progress: 45,
    difficulty: "Beginner" as const,
    points: 180,
    isLocked: false,
  },
  {
    id: 3,
    title: "Water Conservation",
    description: "Learn about water cycles, pollution prevention, and sustainable water management practices.",
    icon: Droplets,
    progress: 90,
    difficulty: "Beginner" as const,
    points: 200,
    isLocked: false,
  },
  {
    id: 4,
    title: "Renewable Energy",
    description: "Discover solar, wind, and sustainable energy technologies powering our green future.",
    icon: Sun,
    progress: 30,
    difficulty: "Intermediate" as const,
    points: 300,
    isLocked: false,
  },
  {
    id: 5,
    title: "Waste Management",
    description: "Master recycling, composting, and circular economy principles for zero-waste living.",
    icon: Recycle,
    progress: 60,
    difficulty: "Beginner" as const,
    points: 220,
    isLocked: false,
  },
  {
    id: 6,
    title: "Carbon Footprint",
    description: "Calculate and reduce your environmental impact through conscious lifestyle choices.",
    icon: Leaf,
    progress: 0,
    difficulty: "Advanced" as const,
    points: 400,
    isLocked: true,
  },
  {
    id: 7,
    title: "Green Technology",
    description: "Explore innovations in clean tech, sustainable manufacturing, and eco-friendly design.",
    icon: Wind,
    progress: 0,
    difficulty: "Advanced" as const,
    points: 350,
    isLocked: true,
  },
  {
    id: 8,
    title: "Pollution Control",
    description: "Study air, water, and soil pollution sources and effective remediation strategies.",
    icon: Factory,
    progress: 0,
    difficulty: "Advanced" as const,
    points: 280,
    isLocked: true,
  },
];

export const LearningTopics = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-transparent bg-gradient-primary bg-clip-text">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Progress through interactive modules designed to build your environmental expertise step by step
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div 
              key={topic.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TopicCard
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                progress={topic.progress}
                difficulty={topic.difficulty}
                points={topic.points}
                isLocked={topic.isLocked}
                onClick={() => console.log(`Starting ${topic.title}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};