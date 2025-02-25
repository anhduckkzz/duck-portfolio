
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "bot";
  content: string;
};

export const ChatbotProject = ({ title, description, apiKeyName }: { 
  title: string;
  description: string;
  apiKeyName: string;
}) => {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConfigured, setIsConfigured] = useState(false);

  const handleSubmitApiKey = () => {
    if (apiKey) {
      localStorage.setItem(apiKeyName, apiKey);
      setIsConfigured(true);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage: Message = { role: "user", content: message };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setMessage("");

    // Here we'll add the actual API integration in the next iteration
    setTimeout(() => {
      const botResponse: Message = { 
        role: "bot", 
        content: "This is a placeholder response. API integration coming soon!" 
      };
      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-secondary/80 mb-6">{description}</p>

      {!isConfigured ? (
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={handleSubmitApiKey} className="w-full">
            Configure Bot
          </Button>
        </div>
      ) : (
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
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      )}
    </Card>
  );
};
