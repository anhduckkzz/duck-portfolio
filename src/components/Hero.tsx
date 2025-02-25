
import { motion } from "framer-motion";
import { Code, Brain, Globe } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center container-padding">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient">
            Tech Innovation & Creative Solutions
          </h1>
          <p className="text-xl md:text-2xl text-secondary/80 mb-8">
            Specializing in AI, Data Science, and 3D Animation
          </p>
          <div className="flex justify-center gap-6">
            <Code size={32} className="text-accent" />
            <Brain size={32} className="text-accent" />
            <Globe size={32} className="text-accent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
