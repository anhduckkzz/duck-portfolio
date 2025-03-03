import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, FileText, Github, PlayCircle, Lock, Unlock, Upload, Sun, Moon } from "lucide-react";
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
import { Components } from 'react-markdown';
import * as THREE from 'three';

type Message = {
  role: "user" | "bot";
  content: string;
};

const INITIAL_MODEL_NAME = "google/gemini-flash-1.5-8b-exp";
const DEFAULT_API_KEY = "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";

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

// Admin mode animation component
const AdminModeAnimation = ({ show }: { show: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!show || !containerRef.current) return;
    
    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create wave geometry
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const waveMaterial = new THREE.MeshPhongMaterial({
      color: 0x1EAEDB,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = Math.PI / 2;
    scene.add(wave);
    
    // Create robot head (simplified)
    const robotHead = new THREE.Group();
    
    // Head cube
    const headGeometry = new THREE.BoxGeometry(2, 2, 2);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x33C3F0,
      emissive: 0x0EA5E9,
      emissiveIntensity: 0.5,
      shininess: 80
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    robotHead.add(head);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x0FA0CE, emissive: 0x0FA0CE });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.5, 0.3, 1.1);
    robotHead.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 0.3, 1.1);
    robotHead.add(rightEye);
    
    robotHead.position.set(0, 2, 0);
    scene.add(robotHead);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x0EA5E9, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    camera.position.z = 10;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);
    
    // Animation
    let frame = 0;
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      frame += 0.03;
      
      // Animate wave
      const positions = waveGeometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const distance = Math.sqrt(x * x + y * y);
        
        const z = Math.sin(distance * 0.5 + frame) * 0.5;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
      
      // Animate robot
      robotHead.rotation.y = Math.sin(frame * 0.5) * 0.5;
      robotHead.position.y = 2 + Math.sin(frame) * 0.2;
      
      renderer.render(scene, camera);
      
      // Stop animation after 3 seconds
      if (frame > 6) {
        cancelAnimationFrame(animationId);
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      headGeometry.dispose();
      headMaterial.dispose();
      eyeGeometry.dispose();
      eyeMaterial.dispose();
    };
  }, [show]);
  
  return <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none" />;
};

// PDF Viewer Component
const PDFViewer = ({ pdfUrl }: { pdfUrl: string | null }) => {
  if (!pdfUrl) return null;
  
  return (
    <div className="w-full mt-4 rounded overflow-hidden shadow-lg">
      <iframe 
        src={pdfUrl} 
        className="w-full h-[600px]" 
        title="CV PDF Viewer"
      />
    </div>
  );
};

export const ChatbotProject = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [modelName, setModelName] = useState(INITIAL_MODEL_NAME);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [isColorMode, setIsColorMode] = useState(false);
  // Add dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // New state for PDF handling
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Apply dark mode class to body when dark mode is toggled
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      setSecretCode(prev => {
        const newCode = prev + e.key;
        if (newCode.includes("anhduc522005")) {
          setIsAdminMode(true);
          setShowAnimation(true);
          // Reset animation after 3 seconds
          setTimeout(() => setShowAnimation(false), 3000);
          return "";
        }
        return newCode.slice(-11); // Keep only last 11 characters
      });
    };

    window.addEventListener("keypress", handleKeyPress);
    
    const handleScroll = () => {
      setIsColorMode(true);
      document.body.classList.add('scrolling');
      
      // Reset color mode after 1 second of no scrolling
      const timeout = setTimeout(() => {
        setIsColorMode(false);
        document.body.classList.remove('scrolling');
      }, 1000);
      
      return () => clearTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDarkMode]);

  // Handle PDF file upload
  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setPdfFile(file);
        // Create a URL for the file
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
        
        // Clean up the URL when component unmounts or when a new PDF is uploaded
        return () => {
          URL.revokeObjectURL(fileUrl);
        };
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'dark-theme' : ''}`}>
      <AnimatePresence>
        {showAnimation && <AdminModeAnimation show={showAnimation} />}
      </AnimatePresence>
      
      {isAdminMode && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 px-4 py-2 rounded-md bg-blue-500 text-white font-medium"
        >
          Admin Mode Activated
        </motion.div>
      )}
      
      <Card className={`glass-card p-6 relative ${isDarkMode ? 'dark-card' : ''}`}>
        {/* PDF Upload Section - Only visible in admin mode */}
        {isAdminMode && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 border border-dashed rounded-lg"
          >
            <h4 className="text-lg font-medium mb-2">CV PDF Uploader (Admin Only)</h4>
            <div className="flex items-center gap-3">
              <Input 
                type="file" 
                accept="application/pdf" 
                onChange={handlePdfUpload}
                className="flex-1"
              />
              <Button variant="outline" onClick={() => document.getElementById('pdf-upload')?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
            </div>
            
            {/* PDF Viewer */}
            <PDFViewer pdfUrl={pdfUrl} />
          </motion.div>
        )}
        
        <div className="absolute top-6 right-6 flex gap-2">
          {/* Dark Mode Toggle Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="text-current"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => window.open('/docs', '_blank')}>
            <FileText className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => window.open('https://github.com/your-repo', '_blank')}>
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => window.open('/demo', '_blank')}>
            <PlayCircle className="h-5 w-5" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-80 popover-content ${isDarkMode ? 'dark-popover' : ''}`}>
              <div className="space-y-4">
                <h4 className="font-medium">Settings</h4>
                <div className="space-y-2">
                  {isAdminMode ? (
                    <>
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Unlock className="h-4 w-4" /> OpenRouter API Key 
                      </label>
                      <Input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key"
                        className="bg-background"
                      />
                      <label className="text-sm text-muted-foreground">
                        Model Name
                      </label>
                      <Input
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        placeholder="Enter model name"
                        className="bg-background"
                      />
                    </>
                  ) : (
                    <div className="py-2 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Current model: {modelName}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <h3 className="text-xl font-semibold mb-4">OpenRouter AI Assistant</h3>
        <p className="mb-6 text-secondary/80">
          Model: {modelName}
        </p>
        <div className="space-y-4">
          <div className={`h-60 overflow-y-auto space-y-2 mb-4 p-4 rounded ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2 rounded ${
                  msg.role === "user" 
                    ? isDarkMode ? 'bg-blue-900/30 ml-auto' : 'bg-accent/10 ml-auto' 
                    : isDarkMode ? 'bg-gray-700' : 'bg-white'
                } max-w-[80%] ${msg.role === "user" ? "ml-auto" : "mr-auto"}`}
              >
                {msg.role === "bot" ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={components}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex, rehypeHighlight]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
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
              className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-background'}`}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading}
              className={isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
