
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, PlayCircle, Database, Cloud, Brain, Camera, Bot, BarChart, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Projects = () => {
  const projects = [
    {
      title: "AI Image Generator",
      description: "Deep learning model for generating artistic images",
      category: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      githubUrl: "https://github.com/trananh-duc/ai-image-generator",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Computer Vision Analyzer",
      description: "Real-time object detection and tracking system",
      category: "Computer Vision",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      githubUrl: "https://github.com/trananh-duc/cv-analyzer",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Camera className="h-5 w-5" />
    },
    {
      title: "Natural Language Processor",
      description: "Advanced NLP model for text analysis and generation",
      category: "Natural Language Processing",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      githubUrl: "https://github.com/trananh-duc/nlp-processor",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Sentiment Analysis Tool",
      description: "Analyzes emotions and sentiments in text using ML algorithms",
      category: "Natural Language Processing",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      githubUrl: "https://github.com/trananh-duc/sentiment-analyzer",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Big Data Platform",
      description: "Scalable data processing and analysis platform",
      category: "Big Data",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      githubUrl: "https://github.com/trananh-duc/big-data-platform",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Database className="h-5 w-5" />
    },
    {
      title: "Cloud MLOps Pipeline",
      description: "Automated machine learning operations pipeline",
      category: "MLOps",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
      githubUrl: "https://github.com/trananh-duc/mlops-pipeline",
      demoUrl: "https://anhduc.vercel.app/",
      icon: <Server className="h-5 w-5" />
    },
  ];

  return (
    <section className="container-padding" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card overflow-hidden hover-scale h-[400px] flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 mb-2">
                    {project.icon}
                    <span className="text-sm text-accent font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-secondary/80 mt-2 flex-grow line-clamp-3">{project.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => window.open(project.demoUrl, "_blank")}
                    >
                      <PlayCircle className="h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
