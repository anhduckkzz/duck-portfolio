
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Message = {
  role: "user" | "bot";
  content: string;
};

const MODEL_NAME = "google/gemini-flash-1.5-8b-exp";
const DEFAULT_API_KEY = "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";

// Function to add preamble to help model understand formatting
const addSystemContext = (messages: Message[]) => {
  const systemMessage = {
    role: "system",
    content: "You can use markdown for formatting, including code blocks with syntax highlighting. For mathematical expressions, use LaTeX syntax between $$ symbols for display math or $ symbols for inline math. Example: $$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$"
  };
  return [systemMessage, ...messages.map(msg => ({
    role: msg.role === "bot" ? "assistant" : "user",
    content: msg.content
  }))];
};

export const ChatbotProject = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [streamingText, setStreamingText] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

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
          model: MODEL_NAME,
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
      const errorMessage: Message = {
        role: "bot",
        content: "Sorry, I encountered an error. Please try again."
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setStreamingText("");
    }
  };

  return (
    <Card className="glass-card p-6 relative">
      <div className="absolute top-6 right-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Settings</h4>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  OpenRouter API Key
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
                <p className="text-xs text-muted-foreground">
                  Current model: {MODEL_NAME}
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <h3 className="text-xl font-semibold mb-4">OpenRouter AI Assistant</h3>
      <p className="text-secondary/80 mb-6">
        Model: {MODEL_NAME}
      </p>
      <div className="space-y-4">
        <div className="h-60 overflow-y-auto space-y-2 mb-4 p-4 bg-white/50 rounded">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2 rounded ${
                msg.role === "user" ? "bg-accent/10 ml-auto" : "bg-white"
              } max-w-[80%] ${msg.role === "user" ? "ml-auto" : "mr-auto"}`}
            >
              {msg.role === "bot" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                  className="prose prose-sm max-w-none dark:prose-invert"
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
