
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Resume = () => {
  return (
    <section className="container-padding" id="resume">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Resume</h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Trần Anh Đức</h3>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Full CV
            </Button>
          </div>
          
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Education</h4>
            <div className="border-l-2 border-accent pl-4 space-y-6">
              <div>
                <h5 className="text-lg font-medium">B.S. in Computer Science and Engineering</h5>
                <p className="text-secondary/70">Ho Chi Minh City University of Technology (HCMUT-VNU)</p>
                <p className="text-accent font-medium">2021 - Present</p>
                <p className="mt-2">Focusing on Artificial Intelligence and Data Science</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Skills</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium mb-2">Programming</h5>
                <ul className="list-disc list-inside text-secondary/70">
                  <li>Python</li>
                  <li>C/C++</li>
                  <li>JavaScript/TypeScript</li>
                  <li>Java</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">AI & Machine Learning</h5>
                <ul className="list-disc list-inside text-secondary/70">
                  <li>TensorFlow</li>
                  <li>PyTorch</li>
                  <li>Computer Vision</li>
                  <li>Natural Language Processing</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Other Technologies</h5>
                <ul className="list-disc list-inside text-secondary/70">
                  <li>Web Development</li>
                  <li>Database Management</li>
                  <li>Cloud Computing</li>
                  <li>Containerization</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Experience</h4>
            <div className="border-l-2 border-accent pl-4 space-y-6">
              <div>
                <h5 className="text-lg font-medium">AI Research Assistant</h5>
                <p className="text-secondary/70">University AI Research Lab</p>
                <p className="text-accent font-medium">2023 - Present</p>
                <p className="mt-2">Conducting research in computer vision and deep learning applications</p>
              </div>
              <div>
                <h5 className="text-lg font-medium">Software Engineering Intern</h5>
                <p className="text-secondary/70">Tech Company</p>
                <p className="text-accent font-medium">Summer 2022</p>
                <p className="mt-2">Developed and implemented machine learning algorithms for data analysis</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center">
          <Button 
            variant="outline"
            onClick={() => window.open("mailto:contact@anhduc.com", "_blank")}
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
};
