
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const Projects = () => {
  const projects = [
    {
      title: "AI Image Generator",
      description: "Deep learning model for generating artistic images",
      category: "AI",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for big data analysis",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      title: "3D Animation Portfolio",
      description: "Collection of 3D animations and models",
      category: "3D",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
  ];

  return (
    <section className="container-padding" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card overflow-hidden hover-scale">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-accent font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">{project.title}</h3>
                  <p className="text-secondary/80 mt-2">{project.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
