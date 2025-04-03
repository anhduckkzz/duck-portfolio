
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Github, PlayCircle, Sun, Moon } from 'lucide-react';
import { SettingsPopover } from './SettingsPopover';
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatHeaderProps {
  modelName: string;
  isAdminMode: boolean;
  apiKey: string;
  setApiKey: (key: string) => void;
  setModelName: (name: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ChatHeader = ({ 
  modelName, 
  isAdminMode, 
  apiKey, 
  setApiKey, 
  setModelName,
  isDarkMode,
  toggleDarkMode
}: ChatHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`absolute top-6 right-6 flex ${isMobile ? 'gap-1' : 'gap-2'}`}>
      {/* Dark Mode Toggle Button */}
      <Button 
        variant="ghost" 
        size={isMobile ? "sm" : "icon"} 
        onClick={toggleDarkMode}
        className="text-current"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      
      {!isMobile && (
        <>
          <Button variant="ghost" size="icon" onClick={() => window.open('/docs', '_blank')}>
            <FileText className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => window.open('https://github.com/your-repo', '_blank')}>
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => window.open('/demo', '_blank')}>
            <PlayCircle className="h-5 w-5" />
          </Button>
        </>
      )}
      
      <SettingsPopover
        isAdminMode={isAdminMode}
        apiKey={apiKey}
        setApiKey={setApiKey}
        modelName={modelName}
        setModelName={setModelName}
      />
    </div>
  );
};
