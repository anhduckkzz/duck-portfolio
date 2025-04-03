
import React from 'react';
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
  setModelName
}: ChatHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`absolute top-6 right-6 flex ${isMobile ? 'gap-1' : 'gap-2'}`}>
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
