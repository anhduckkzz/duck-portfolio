
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary">
      <Hero />
      <About />
      <Projects />
    </div>
  );
};

export default Index;
