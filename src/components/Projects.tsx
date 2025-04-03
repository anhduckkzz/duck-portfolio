
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, PlayCircle, Database, Cloud, Brain, Camera, Bot, BarChart, Server, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Projects = () => {
  const projects = [
    {
      title: "AI Image Generator",
      description: "Deep learning model for generating artistic images based on text prompts. Utilizes a combination of GANs and transformers to create high-quality images from descriptive text.",
      category: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1865&q=80",
      techStack: ["PyTorch", "TensorFlow", "CUDA", "Python", "React"],
      githubUrl: "https://github.com/trananh-duc/ai-image-generator",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Computer Vision Analyzer",
      description: "Real-time object detection and tracking system designed for security applications. Features multi-object tracking, activity recognition, and anomaly detection with high performance on edge devices.",
      category: "Computer Vision",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      techStack: ["OpenCV", "YOLO", "PyTorch", "C++", "CUDA"],
      githubUrl: "https://github.com/trananh-duc/cv-analyzer",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Camera className="h-5 w-5" />
    },
    {
      title: "Natural Language Processor",
      description: "Advanced NLP model for text analysis and generation with support for multiple languages. Capable of sentiment analysis, named entity recognition, language translation, and context-aware text generation.",
      category: "Natural Language Processing",
      image: "https://images.unsplash.com/photo-1655720031554-a77a93c56d1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      techStack: ["Transformers", "BERT", "HuggingFace", "Python", "FastAPI"],
      githubUrl: "https://github.com/trananh-duc/nlp-processor",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Sentiment Analysis Tool",
      description: "Analyzes emotions and sentiments in text using ML algorithms with real-time processing capabilities. Includes dashboard visualization of sentiment trends, emotion classification, and text summarization features.",
      category: "Natural Language Processing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      techStack: ["RNN", "LSTM", "SpaCy", "Flask", "React"],
      githubUrl: "https://github.com/trananh-duc/sentiment-analyzer",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Bot className="h-5 w-5" />
    },
    {
      title: "Big Data Platform",
      description: "Scalable data processing and analysis platform designed for petabyte-scale operations. Integrates streaming and batch processing with advanced analytics capabilities and distributed computing resources.",
      category: "Big Data",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
      techStack: ["Hadoop", "Spark", "Kafka", "MongoDB", "Airflow"],
      githubUrl: "https://github.com/trananh-duc/big-data-platform",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Database className="h-5 w-5" />
    },
    {
      title: "Cloud MLOps Pipeline",
      description: "Automated machine learning operations pipeline with CI/CD integration for ML models. Features automated testing, deployment, monitoring, and infrastructure management for production ML workloads.",
      category: "MLOps",
      image: "https://images.unsplash.com/photo-1639322537231-2f206e06af84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1832&q=80",
      techStack: ["Kubernetes", "Docker", "TensorFlow", "Kubeflow", "AWS"],
      githubUrl: "https://github.com/trananh-duc/mlops-pipeline",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Server className="h-5 w-5" />
    },
  ];

  const [currentProject, setCurrentProject] = useState(0);

  const handlePrevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const project = projects[currentProject];

  return (
    <section className="container-padding" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Projects</h2>
        <div className="flex items-center justify-center mb-6">
          <span className="text-secondary/60 text-sm">
            {currentProject + 1} of {projects.length}
          </span>
        </div>
        
        <div className="relative">
          <button 
            onClick={handlePrevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6 text-secondary" />
          </button>
          
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Card className="glass-card overflow-hidden hover-scale w-full">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="flex items-center gap-1.5 mb-2">
                    {project.icon}
                    <span className="text-sm text-accent font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-secondary/80 mb-6">{project.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-secondary/10 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1.5"
                      onClick={() => window.open(project.githubUrl, "_blank", "noopener,noreferrer")}
                    >
                      <Github className="h-4 w-4" />
                      GitHub Repository
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1.5"
                      onClick={() => window.open(project.demoUrl, "_blank", "noopener,noreferrer")}
                    >
                      <PlayCircle className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <button 
            onClick={handleNextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6 text-secondary" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full ${
                currentProject === index ? "bg-accent" : "bg-secondary/20"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
