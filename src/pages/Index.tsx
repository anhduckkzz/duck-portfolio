
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ThreeAnimation } from "@/components/ThreeAnimation";
import { ChatbotProject } from "@/components/ChatbotProject";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary">
      <ThreeAnimation />
      <Hero />
      <section className="container-padding" id="chatbots">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">AI Assistant</h2>
          <ChatbotProject />
        </div>
      </section>
      <Projects />
    </div>
  );
};

export default Index;
