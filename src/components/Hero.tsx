
import { motion } from "framer-motion";
import { Code, Brain, Globe, FileText, Github, Linkedin, Instagram, Twitter, Youtube, Mail } from "lucide-react";
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
          
          {/* Social Media Connection */}
          <div className="flex flex-wrap gap-6 justify-center items-center mb-10">
            {/* GitHub */}
            <SocialMediaCard 
              icon={<Github className="h-5 w-5" />} 
              title="GitHub" 
              subtitle="Code" 
              url="https://github.com/trananh-duc" 
            />
            
            {/* LinkedIn */}
            <SocialMediaCard 
              icon={<Linkedin className="h-5 w-5" />} 
              title="LinkedIn" 
              subtitle="Connect" 
              url="https://linkedin.com/in/trananh-duc" 
            />
            
            {/* Instagram */}
            <SocialMediaCard 
              icon={<Instagram className="h-5 w-5" />} 
              title="Instagram" 
              subtitle="Photos" 
              url="https://instagram.com/trananh-duc" 
            />
            
            {/* Twitter */}
            <SocialMediaCard 
              icon={<Twitter className="h-5 w-5" />} 
              title="Twitter" 
              subtitle="Updates" 
              url="https://twitter.com/trananh-duc" 
            />
            
            {/* Mail */}
            <SocialMediaCard 
              icon={<Mail className="h-5 w-5" />} 
              title="Email" 
              subtitle="Contact" 
              url="mailto:trananhduc522005@gmail.com" 
            />
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

// Social Media Card Component with the checkbox UI effect
const SocialMediaCard = ({ 
  icon, 
  title, 
  subtitle, 
  url 
}: { 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string; 
  url: string;
}) => {
  return (
    <label className="text-gray-400 cursor-pointer">
      <input 
        type="checkbox" 
        className="hidden peer" 
        onChange={(e) => {
          if(e.target.checked) {
            window.open(url, "_blank");
            // Uncheck after a delay to reset the animation
            setTimeout(() => {
              e.target.checked = false;
            }, 600);
          }
        }} 
      />
      <div className="group flex flex-col gap-4 w-32 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 shadow-xl border-2 border-transparent transition-all duration-300 ease-in-out hover:border-indigo-500 hover:shadow-indigo-500/20 peer-checked:border-indigo-500 peer-checked:from-indigo-900/50 peer-checked:to-gray-900 peer-checked:translate-y-[-0.5rem]">
        <div className="relative">
          <div className="w-12 h-12 mx-auto bg-indigo-500/20 rounded-lg border-2 border-indigo-500/40 group-hover:border-indigo-400 group-hover:bg-indigo-500/30 peer-checked:border-indigo-400 peer-checked:bg-indigo-500/30 transition-all duration-300 flex items-center justify-center">
            {icon}
          </div>
          <div className="absolute top-0 right-6 w-3 h-3 rounded-full bg-gray-600 group-hover:bg-indigo-400 group-hover:animate-pulse peer-checked:bg-indigo-400 peer-checked:animate-pulse transition-all duration-300"></div>
        </div>

        <div className="text-center">
          <p className="font-medium text-sm group-hover:text-indigo-400 peer-checked:text-indigo-400 transition-colors duration-300">
            {title}
          </p>
          <p className="text-xs mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            {subtitle}
          </p>
        </div>

        <div className="h-1 w-0 bg-indigo-500 rounded-full mx-auto group-hover:w-full peer-checked:w-full transition-all duration-300"></div>
      </div>
    </label>
  );
};
