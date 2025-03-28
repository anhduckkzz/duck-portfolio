import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Phone, Mail, Github, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PDFViewerSection } from "./PDFViewerSection";

export const ResumeSection = ({ isAdminMode = false }) => {
  const credentialsRef = useRef<HTMLDivElement>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setPdfFile(file);
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
        return () => {
          URL.revokeObjectURL(fileUrl);
        };
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!credentialsRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - credentialsRef.current.offsetLeft);
    setScrollLeft(credentialsRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !credentialsRef.current) return;
    
    const x = e.pageX - credentialsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    credentialsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const checkScrollPosition = () => {
    if (!credentialsRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = credentialsRef.current;
    
    setShowLeftScroll(scrollLeft > 10);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = credentialsRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (!credentialsRef.current) return;
    credentialsRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (!credentialsRef.current) return;
    credentialsRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <section className="container-padding" id="resume">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Resume</h2>
        
        {isAdminMode && (
          <PDFViewerSection 
            pdfFile={pdfFile} 
            pdfUrl={pdfUrl} 
            onPdfUpload={handlePdfUpload} 
          />
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 mb-8 text-left"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4">
            <div>
              <h3 className="text-3xl font-bold">Tran Anh Duc</h3>
              <p className="text-gray-700">Role: Undergraduate Student</p>
              <p className="text-gray-700">Bachelor of Technology</p>
              <p className="text-gray-700">Ho Chi Minh University of Technology - VNU HCM</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col space-y-2">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+84-815420855</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>trananhduc522005@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Github size={16} className="mr-2" />
                <span>GitHub Profile</span>
              </div>
              <div className="flex items-center">
                <Linkedin size={16} className="mr-2" />
                <span>LinkedIn Profile</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Education</h4>
            <div className="ml-2">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h5 className="text-lg font-semibold">• Bachelor of Computer Science (Artificial Intelligence)</h5>
                  <p className="text-gray-700">Ho Chi Minh University of Technology - VNU HCM</p>
                </div>
                <p className="text-gray-700">2023-current</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Personal Projects</h4>
            <div className="ml-2">
              <h5 className="text-lg font-semibold">• Trash-Density Detection with Image Intensity Normalization Algorithms</h5>
              <p className="text-gray-700 italic mb-2">A project utilizing to fine-tune the YOLOv8 nano version for classifying trash density across three different levels.</p>
              <ul className="list-none ml-4 text-gray-700">
                <li>– Use YOLOv8 to segment waste and create coverage areas (masks)</li>
                <li>– Use the pixel intensity algorithm on the masks to calculate the level of waste</li>
                <li>– Technology Used: Python, YOLO, Roboflow</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Experience</h4>
            <div className="ml-2 space-y-4">
              <div>
                <div className="flex flex-col md:flex-row justify-between">
                  <h5 className="text-lg font-semibold">• Technical Reviewer</h5>
                  <span className="text-gray-700">Remote</span>
                </div>
                <p className="text-gray-700">Robusto AI</p>
                <ul className="list-none ml-4 text-gray-700">
                  <li>– Support Project Manager in creating and developing Latex template for lesson, course and homework for capy-data.io</li>
                  <li>– Take charge of developing online notebook for lab practice in Computer Vision course such as Object Detection and Object Tracking Algorithm</li>
                </ul>
              </div>
              
              <div>
                <div className="flex flex-col md:flex-row justify-between">
                  <h5 className="text-lg font-semibold">• Research Assistant</h5>
                  <span className="text-gray-700">Hybrid</span>
                </div>
                <p className="text-gray-700">Ho Chi Minh University of Technology - VNU HCM</p>
                <ul className="list-none ml-4 text-gray-700">
                  <li>– Learned about various Machine Learning and Deep Learning method for developing problem in Computer Vision</li>
                  <li>– Learned basics of writing academic report for conference and meeting</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Technical Skills and Interests</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
              <div>
                <p><span className="font-semibold">Languages:</span> C/C++, Python, Markdown</p>
              </div>
              <div>
                <p><span className="font-semibold">Libraries and frameworks:</span> C++ xtensor, Python Data Visualization Libraries like pandas, numpy, matplotlib, scikit-learn, Pytorch</p>
              </div>
              <div>
                <p><span className="font-semibold">Version Control:</span> Git, Github</p>
              </div>
              <div>
                <p><span className="font-semibold">Areas of Interest:</span> AI training and deployment, Data Visualization, Feature Extraction, Cloud Basic on GCP</p>
              </div>
              <div>
                <p><span className="font-semibold">Soft Skills:</span> Problem Solving, Critical Thinking, Presentation, Adaptability</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Publications</h4>
            <div className="ml-2">
              <h5 className="text-lg font-semibold">• Real-Time Traffic Monitoring System Featuring IntDetX and Consistent Weighted Dual Label Assignment</h5>
              <ul className="list-none ml-4 text-gray-700">
                <li>– Develop an architecture combine between speed of YOLOv8 and accuracy of EfficientDet-B7 called IntDetX to maximimize the ability in detect traffic</li>
                <li>– Improve the Level of Service (LOS) framework to offer a more comprehensive and precise set of criteria for real-time traffic analysis.</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Credentials</h4>
            <div className="relative">
              {showLeftScroll && (
                <button 
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 p-1 rounded-full opacity-70 hover:opacity-100 shadow-md"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              
              {showRightScroll && (
                <button 
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 p-1 rounded-full opacity-70 hover:opacity-100 shadow-md"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
              
              <div 
                ref={credentialsRef}
                className="credentials-scroll-container overflow-x-scroll scrollbar-hide py-4 my-6 px-6"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <div className="credentials-scroll-content inline-flex gap-6 min-w-max px-4">
                  <div 
                    className="badge-container min-w-[150px] transform-gpu scale-100 hover:scale-105 transition-transform duration-300 p-2 bg-white/5 rounded-lg shadow-md"
                    data-iframe-width="150" 
                    data-iframe-height="270" 
                    data-share-badge-id="1ce4b007-91f1-4e6f-9ac2-26b95a67c89b" 
                    data-share-badge-host="https://www.credly.com"
                  ></div>
                  <div 
                    className="badge-container min-w-[150px] transform-gpu scale-100 hover:scale-105 transition-transform duration-300 p-2 bg-white/5 rounded-lg shadow-md"
                    data-iframe-width="150" 
                    data-iframe-height="270" 
                    data-share-badge-id="2d84b8bf-223e-482a-9549-9f470c68efdf" 
                    data-share-badge-host="https://www.credly.com"
                  ></div>
                  <div 
                    className="badge-container min-w-[150px] transform-gpu scale-100 hover:scale-105 transition-transform duration-300 p-2 bg-white/5 rounded-lg shadow-md"
                    data-iframe-width="150" 
                    data-iframe-height="270" 
                    data-share-badge-id="077bded0-bac6-4e37-87af-a7a0583e0af3" 
                    data-share-badge-host="https://www.credly.com"
                  ></div>
                  <div 
                    className="badge-container min-w-[150px] transform-gpu scale-100 hover:scale-105 transition-transform duration-300 p-2 bg-white/5 rounded-lg shadow-md"
                    data-iframe-width="150" 
                    data-iframe-height="270" 
                    data-share-badge-id="86e35940-3f03-4b8e-8f54-90dcdbe67eb0" 
                    data-share-badge-host="https://www.credly.com"
                  ></div>
                  <div 
                    className="badge-container min-w-[150px] transform-gpu scale-100 hover:scale-105 transition-transform duration-300 p-2 bg-white/5 rounded-lg shadow-md"
                    data-iframe-width="150" 
                    data-iframe-height="270" 
                    data-share-badge-id="90ca16d2-494f-4730-8207-7f8560f4b8e5" 
                    data-share-badge-host="https://www.credly.com"
                  ></div>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                Click and drag to scroll →
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              className="flex items-center gap-2"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="h-4 w-4" />
              Download Full CV
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
