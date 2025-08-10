
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
