import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from '@/types/chat';
import { AdminModeAnimation } from './chatbot/AdminModeAnimation';
import { PDFUploader } from './chatbot/PDFUploader';
import { ChatMessages } from './chatbot/ChatMessages';
import { ChatInput } from './chatbot/ChatInput';
import { ChatHeader } from './chatbot/ChatHeader';
import { INITIAL_MODEL_NAME, DEFAULT_API_KEY, addSystemContext } from '@/utils/chatUtils';
import { checkRateLimit, formatResetTime } from '@/utils/rateLimiter';
import { useTheme } from "./ThemeProvider";
import { useToast } from "@/components/ui/use-toast";

export const ChatbotProject = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [modelName, setModelName] = useState(INITIAL_MODEL_NAME);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [isColorMode, setIsColorMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Rate limiting state
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState({
    minuteRemaining: 19,
    dayRemaining: 199,
    minuteResetTime: 0,
    dayResetTime: 0,
    minuteLimitExceeded: false,
    dayLimitExceeded: false
  });
  
  // New state for PDF handling
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { theme } = useTheme();
  const { toast } = useToast();
  
  useEffect(() => {
    // Apply dark mode class to body when dark mode is toggled
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      setSecretCode(prev => {
        const newCode = prev + e.key;
        if (newCode.includes("anhduc522005")) {
          setIsAdminMode(true);
          setShowAnimation(true);
          // Reset animation after 3 seconds
          setTimeout(() => setShowAnimation(false), 3000);
          return "";
        }
        return newCode.slice(-11); // Keep only last 11 characters
      });
    };

    window.addEventListener("keypress", handleKeyPress);
    
    const handleScroll = () => {
      setIsColorMode(true);
      document.body.classList.add('scrolling');
      
      // Reset color mode after 1 second of no scrolling
      const timeout = setTimeout(() => {
        setIsColorMode(false);
        document.body.classList.remove('scrolling');
      }, 1000);
      
      return () => clearTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);

  // Handle PDF file upload
  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setPdfFile(file);
        // Create a URL for the file
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
        
        // Clean up the URL when component unmounts or when a new PDF is uploaded
        return () => {
          URL.revokeObjectURL(fileUrl);
        };
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    // Check rate limit before processing request
    const rateStatus = checkRateLimit();
    
    // Update rate limit info state
    setRateLimitInfo({
      minuteRemaining: rateStatus.minuteRemaining,
      dayRemaining: rateStatus.dayRemaining,
      minuteResetTime: rateStatus.minuteResetTime,
      dayResetTime: rateStatus.dayResetTime,
      minuteLimitExceeded: rateStatus.minuteLimitExceeded,
      dayLimitExceeded: rateStatus.dayLimitExceeded
    });
    
    // If rate limited, show toast and return
    if (!rateStatus.allowed) {
      setIsRateLimited(true);
      
      // Show different messages based on which limit was exceeded
      if (rateStatus.minuteLimitExceeded) {
        toast({
          title: "Rate Limit Exceeded",
          description: `Reached rate limit for this model per minute. Next reset at ${formatResetTime(rateStatus.minuteResetTime)}.`,
          variant: "destructive"
        });
      } else if (rateStatus.dayLimitExceeded) {
        toast({
          title: "Rate Limit Exceeded",
          description: `Reached rate limit for this model per day. Next reset at ${formatResetTime(rateStatus.dayResetTime)}.`,
          variant: "destructive"
        });
      }
      
      return;
    }
    
    // Reset rate limited state if it was previously set
    setIsRateLimited(false);

    const newUserMessage: Message = { role: "user", content: message };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: addSystemContext(newMessages),
          stream: true
        })
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const streamingMessage: Message = { role: "bot", content: "" };
      setMessages([...newMessages, streamingMessage]);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonString = line.slice(6);
            if (jsonString === '[DONE]') continue;
            
            try {
              const jsonData = JSON.parse(jsonString);
              const content = jsonData.choices[0]?.delta?.content || '';
              accumulatedText += content;
              
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  ...newMessages[newMessages.length - 1],
                  content: accumulatedText
                };
                return newMessages;
              });
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

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
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 px-4 py-2 rounded-md bg-blue-500 text-white font-medium"
        >
          Admin Mode Activated
        </motion.div>
      )}
      
      <Card className="glass-card p-6 relative">
        {/* Rate limit info display */}
        {isRateLimited && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-300 text-sm">
            <p className="font-medium">Rate limit exceeded</p>
            {rateLimitInfo.minuteLimitExceeded && (
              <p>Reached rate limit for this model per minute. Resets at {formatResetTime(rateLimitInfo.minuteResetTime)}</p>
            )}
            {rateLimitInfo.dayLimitExceeded && (
              <p>Reached rate limit for this model per day. Resets at {formatResetTime(rateLimitInfo.dayResetTime)}</p>
            )}
            <p>Requests remaining today: {rateLimitInfo.dayRemaining}/199</p>
            <p>Requests remaining this minute: {rateLimitInfo.minuteRemaining}/19</p>
          </div>
        )}
        
        {/* Rate limit counter display (always visible) */}
        <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          <p>Requests: {19 - rateLimitInfo.minuteRemaining}/19 per minute | {199 - rateLimitInfo.dayRemaining}/199 per day</p>
        </div>
        
        {/* PDF Upload Section - Only visible in admin mode */}
        {isAdminMode && (
          <PDFUploader onPdfUpload={handlePdfUpload} pdfUrl={pdfUrl} />
        )}
        
        <ChatHeader 
          modelName={modelName}
          isAdminMode={isAdminMode}
          apiKey={apiKey}
          setApiKey={setApiKey}
          setModelName={setModelName}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <h3 className="text-xl font-semibold mb-4 dark:text-darkmode-text">OpenRouter AI Assistant</h3>
        <p className="mb-6 text-secondary/80 dark:text-darkmode-text/80">
          Model: {modelName}
        </p>
        <div className="space-y-4">
          <ChatMessages messages={messages} isDarkMode={isDarkMode} />
          <ChatInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            isDarkMode={isDarkMode}
          />
        </div>
      </Card>
    </div>
  );
};
