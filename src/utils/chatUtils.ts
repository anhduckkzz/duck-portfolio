
import { Message, SystemMessage } from '@/types/chat';

export const INITIAL_MODEL_NAME = "google/gemini-flash-1.5-8b-exp";
export const DEFAULT_API_KEY = "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";

// Function to add preamble to help model understand formatting
export const addSystemContext = (messages: Message[]) => {
  const systemMessage: SystemMessage = {
    role: "system",
    content: "You can use markdown for formatting, including code blocks with syntax highlighting. For mathematical expressions, use LaTeX syntax between $$ symbols for display math or $ symbols for inline math. Example: $$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$"
  };
  
  return [systemMessage, ...messages.map(msg => ({
    role: msg.role === "bot" ? "assistant" : msg.role,
    content: msg.content
  }))];
};
