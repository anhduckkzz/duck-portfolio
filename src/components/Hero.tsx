
import { motion } from "framer-motion";
import { Code, Brain, Globe, FileText, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIEngineerAnimation } from "./AIEngineerAnimation";

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
          
          {/* AI Engineer Animation */}
          <div className="mb-6">
            <AIEngineerAnimation />
          </div>
          
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
              icon={<Github className="h-5 w-5 text-white" />} 
              title="GitHub" 
              subtitle="Code" 
              url="https://github.com/trananh-duc" 
              bgFrom="from-gray-800"
              bgTo="to-black"
              highlightColor="bg-white"
              textColor="text-white"
            />
            
            {/* LinkedIn */}
            <SocialMediaCard 
              icon={<Linkedin className="h-5 w-5 text-white" />} 
              title="LinkedIn" 
              subtitle="Connect" 
              url="https://linkedin.com/in/trananh-duc" 
              bgFrom="from-[#0077B5]"
              bgTo="to-[#0A66C2]"
              highlightColor="bg-[#0A66C2]"
              textColor="text-white"
            />
            
            {/* Instagram */}
            <SocialMediaCard 
              icon={<Instagram className="h-5 w-5 text-white" />} 
              title="Instagram" 
              subtitle="Photos" 
              url="https://instagram.com/trananh-duc" 
              bgFrom="from-[#fd5949]"
              bgTo="to-[#FCAF45]"
              highlightColor="bg-gradient-to-r from-[#fd5949] to-[#FCAF45]"
              textColor="text-white"
            />
            
            {/* Gmail */}
            <SocialMediaCard 
              icon={<Mail className="h-5 w-5 text-white" />} 
              title="Gmail" 
              subtitle="Contact" 
              url="mailto:trananhduc522005@gmail.com" 
              bgFrom="from-[#EA4335]"
              bgTo="to-[#4285F4]"
              highlightColor="bg-gradient-to-r from-[#EA4335] via-[#FBBC05] via-[#34A853] to-[#4285F4]"
              textColor="text-white"
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
  url,
  bgFrom,
  bgTo,
  highlightColor,
  textColor
}: { 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string; 
  url: string;
  bgFrom: string;
  bgTo: string;
  highlightColor: string;
  textColor: string;
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
      <div className={`group flex flex-col gap-4 w-32 h-40 bg-gradient-to-b ${bgFrom} ${bgTo} rounded-2xl p-4 shadow-xl border-2 border-transparent transition-all duration-300 ease-in-out hover:border-white/50 hover:shadow-white/20 peer-checked:border-white/70 peer-checked:translate-y-[-0.5rem]`}>
        <div className="relative">
          <div className="w-12 h-12 mx-auto bg-white/20 rounded-lg border-2 border-white/40 group-hover:border-white/60 group-hover:bg-white/30 peer-checked:border-white/60 peer-checked:bg-white/30 transition-all duration-300 flex items-center justify-center">
            {icon}
          </div>
          <div className={`absolute top-0 right-6 w-3 h-3 rounded-full bg-gray-600 group-hover:${highlightColor.includes('gradient') ? highlightColor : highlightColor} group-hover:animate-pulse peer-checked:${highlightColor.includes('gradient') ? highlightColor : highlightColor} peer-checked:animate-pulse transition-all duration-300`}></div>
        </div>

        <div className="text-center">
          <p className={`font-medium text-sm group-hover:${textColor} peer-checked:${textColor} transition-colors duration-300`}>
            {title}
          </p>
          <p className={`text-xs mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${textColor}`}>
            {subtitle}
          </p>
        </div>

        <div className={`h-1 w-0 ${highlightColor} rounded-full mx-auto group-hover:w-full peer-checked:w-full transition-all duration-300`}></div>
      </div>
    </label>
  );
};
