
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ThreeAnimation } from "@/components/ThreeAnimation";
import { ChatbotProject } from "@/components/ChatbotProject";
import { Resume } from "@/components/Resume";
import { useState } from "react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary">
      <ThreeAnimation />
      <Hero />
      <Resume />
      <Projects />
      <section className="container-padding" id="chatbots">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">AI Assistant</h2>
          <ChatbotProject isDarkMode={isDarkMode} />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-16 py-8 border-t-4 border-black bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            Trần Anh Đức
          </p>
          <p className="text-sm text-gray-300 mt-1">
            AI Engineer, HCMUT-VNU Undergraduate
          </p>
          <p className="text-xs text-gray-400 mt-3">
            @2025 Trần Anh Đức
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
