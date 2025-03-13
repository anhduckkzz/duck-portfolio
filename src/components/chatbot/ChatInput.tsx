
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => Promise<void>;
  isLoading: boolean;
  isDarkMode: boolean;
}

export const ChatInput = ({ message, setMessage, handleSendMessage, isLoading, isDarkMode }: ChatInputProps) => {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        disabled={isLoading}
        className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-background text-secondary'}`}
      />
      <Button 
        onClick={handleSendMessage} 
        disabled={isLoading}
        variant={isDarkMode ? "default" : "default"}
      >
        {isLoading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
};
