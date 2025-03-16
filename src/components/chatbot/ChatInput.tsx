
import React, { useState, useRef, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => Promise<void>;
  isLoading: boolean;
  isDarkMode: boolean;
  onImageUpload: (file: File) => void;
}

export const ChatInput = ({ 
  message, 
  setMessage, 
  handleSendMessage, 
  isLoading, 
  isDarkMode,
  onImageUpload
}: ChatInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Handle file selection from the file picker
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  // Handle click on the image icon
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Handle paste events (for image pasting)
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          onImageUpload(file);
        }
      }
    }
  }, [onImageUpload]);

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.classList.add('border-primary');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.classList.remove('border-primary');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.classList.remove('border-primary');
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  };

  // Set up paste event listener
  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return (
    <div 
      className="flex gap-2 relative" 
      ref={inputRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        disabled={isLoading}
        className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-background text-secondary'}`}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={handleImageClick} 
              disabled={isLoading}
              variant="outline"
              size="icon"
              type="button"
              className="min-w-10"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload image (or paste/drop)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
