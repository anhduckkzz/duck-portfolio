
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ThreeAnimation } from "@/components/ThreeAnimation";
import { ChatbotProject } from "@/components/ChatbotProject";
import { Resume } from "@/components/Resume";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-white to-primary'}`}>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle onToggle={toggleTheme} />
      </div>
      <ThreeAnimation />
      <Hero />
      <Resume />
      <Projects />
      <section className="container-padding" id="chatbots">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">AI Assistant</h2>
          <ChatbotProject />
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
