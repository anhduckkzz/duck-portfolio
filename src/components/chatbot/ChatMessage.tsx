
import React from 'react';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import { Components } from 'react-markdown';
import { Message } from '@/types/chat';

// Custom components for ReactMarkdown
const components: Components = {
  p: ({ node, children }) => <p className="prose-p">{children}</p>,
  code: ({ node, className, children }) => (
    <code className={`${className || ""} block-code`}>
      {children}
    </code>
  ),
  pre: ({ node, children }) => <pre className="prose-pre bg-gray-100 p-2 rounded">{children}</pre>,
};

interface ChatMessageProps {
  message: Message;
  isDarkMode: boolean;
  index: number;
}

export const ChatMessage = ({ message, isDarkMode, index }: ChatMessageProps) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-2 rounded ${
        message.role === "user" 
          ? isDarkMode ? 'bg-blue-900/30 ml-auto' : 'bg-accent/10 ml-auto' 
          : isDarkMode ? 'bg-gray-700' : 'bg-white'
      } max-w-[80%] ${message.role === "user" ? "ml-auto" : "mr-auto"}`}
    >
      {message.role === "bot" ? (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      ) : (
        message.content
      )}
    </motion.div>
  );
};
