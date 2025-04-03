
import { useState } from "react";
import { Message } from '@/types/chat';
import { INITIAL_MODEL_NAME, DEFAULT_API_KEY, addSystemContext } from '@/utils/chatUtils';
import { checkRateLimit, formatResetTime } from '@/utils/rateLimiter';
import { useToast } from "@/components/ui/use-toast";

export interface RateLimitInfo {
  minuteRemaining: number;
  dayRemaining: number;
  minuteResetTime: number;
  dayResetTime: number;
  minuteLimitExceeded: boolean;
  dayLimitExceeded: boolean;
}

export function useChatState() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [modelName, setModelName] = useState(INITIAL_MODEL_NAME);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo>({
    minuteRemaining: 19,
    dayRemaining: 199,
    minuteResetTime: 0,
    dayResetTime: 0,
    minuteLimitExceeded: false,
    dayLimitExceeded: false
  });

  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const rateStatus = checkRateLimit();
    
    setRateLimitInfo({
      minuteRemaining: rateStatus.minuteRemaining,
      dayRemaining: rateStatus.dayRemaining,
      minuteResetTime: rateStatus.minuteResetTime,
      dayResetTime: rateStatus.dayResetTime,
      minuteLimitExceeded: rateStatus.minuteLimitExceeded,
      dayLimitExceeded: rateStatus.dayLimitExceeded
    });
    
    if (!rateStatus.allowed) {
      setIsRateLimited(true);
      
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
    
    setIsRateLimited(false);

    const newUserMessage: Message = { 
      role: "user", 
      content: message.trim()
    };
    
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

  return {
    message,
    setMessage,
    messages,
    setMessages,
    isLoading,
    apiKey,
    setApiKey,
    modelName,
    setModelName,
    isRateLimited,
    rateLimitInfo,
    handleSendMessage
  };
}
