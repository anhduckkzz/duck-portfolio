
import { motion } from "framer-motion";
import { Code, Brain, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const handleResumeClick = () => {
    document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center container-padding">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-2 text-gradient">
            Trần Anh Đức
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Portfolio
          </h2>
          <p className="text-xl md:text-2xl text-secondary/80 mb-8">
            Specializing in AI, Data Science, and Computer Vision
          </p>
          <div className="flex justify-center gap-6 mb-10">
            <Code size={32} className="text-accent" />
            <Brain size={32} className="text-accent" />
            <Globe size={32} className="text-accent" />
          </div>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={handleResumeClick}
              className="flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              View Resume
            </Button>
            <Button 
              variant="outline"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              See Projects
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
