
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "bot";
  content: string;
};

export const ChatbotProject = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "google/gemini-flash-1.5-8b-exp",
          messages: newMessages.map(msg => ({
            role: msg.role === "bot" ? "assistant" : "user",
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();
      const botResponse: Message = {
        role: "bot",
        content: data.choices[0].message.content
      };

      setMessages([...newMessages, botResponse]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "bot",
        content: "Sorry, I encountered an error. Please try again."
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-4">OpenRouter AI Assistant</h3>
      <p className="text-secondary/80 mb-6">
        Powered by Google's Gemini Flash model through OpenRouter
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
              {msg.content}
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
