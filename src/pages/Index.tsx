import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WhyChooseEcoLearn } from "@/components/WhyChooseEcoLearn";
import { LearningTopics } from "@/components/LearningTopics";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <WhyChooseEcoLearn />
      <LearningTopics />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
