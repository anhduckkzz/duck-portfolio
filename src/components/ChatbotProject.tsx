
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { AdminModeAnimation } from './chatbot/AdminModeAnimation';
import { ChatMessages } from './chatbot/ChatMessages';
import { ChatInput } from './chatbot/ChatInput';
import { ChatHeader } from './chatbot/ChatHeader';
import { RateLimitDisplay } from './chatbot/RateLimitInfo';
import { useIsMobile } from "@/hooks/use-mobile";
import { useChatState } from "@/hooks/use-chat-state";
import { useSecretCode } from "@/hooks/use-secret-code";

export const ChatbotProject = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const isMobile = useIsMobile();
  
  const {
    message,
    setMessage,
    messages,
    isLoading,
    apiKey,
    setApiKey,
    modelName,
    setModelName,
    isRateLimited,
    rateLimitInfo,
    handleSendMessage
  } = useChatState();
  
  const { showAnimation } = useSecretCode("anhduc522005", () => setIsAdminMode(true));

  return (
    <div className="transition-colors duration-300">
      <AnimatePresence>
        {showAnimation && <AdminModeAnimation show={showAnimation} />}
      </AnimatePresence>
      
      {isAdminMode && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 px-4 py-2 rounded-md bg-blue-500 text-white font-medium text-sm"
        >
          Admin Mode Activated
        </motion.div>
      )}
      
      <Card className={`glass-card ${isMobile ? 'p-3' : 'p-6'} relative`}>
        <RateLimitDisplay 
          isRateLimited={isRateLimited}
          rateLimitInfo={rateLimitInfo}
        />
        
        <ChatHeader 
          modelName={modelName}
          isAdminMode={isAdminMode}
          apiKey={apiKey}
          setApiKey={setApiKey}
          setModelName={setModelName}
          isDarkMode={false}
          toggleDarkMode={() => {}}
        />

        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-2 dark:text-darkmode-text`}>OpenRouter AI Assistant</h3>
        <p className="mb-4 text-secondary/80 dark:text-darkmode-text/80 text-sm">
          Model: {modelName}
        </p>
        <div className="space-y-4">
          <ChatMessages messages={messages} isDarkMode={false} />
          <ChatInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            isDarkMode={false}
          />
        </div>
      </Card>
    </div>
  );
};
