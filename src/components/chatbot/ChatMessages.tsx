
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '@/types/chat';

interface ChatMessagesProps {
  messages: Message[];
  isDarkMode: boolean;
}

export const ChatMessages = ({ messages, isDarkMode }: ChatMessagesProps) => {
  return (
    <div className="h-60 overflow-y-auto space-y-2 mb-4 p-4 rounded bg-white/50 dark:bg-darkmode-card/50">
      {messages.map((msg, index) => (
        <ChatMessage 
          key={index}
          message={msg} 
          isDarkMode={isDarkMode} 
          index={index} 
        />
      ))}
    </div>
  );
};
