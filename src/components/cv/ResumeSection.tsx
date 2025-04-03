
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Phone, Mail, Github, Linkedin, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PDFViewerSection } from "./PDFViewerSection";
import { downloadRealCV } from "@/utils/PDFGenerator";

export const ResumeSection = ({ isAdminMode = false }) => {
  const credentialsRef = useRef<HTMLDivElement>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
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
    setScrollPosition(credentialsRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !credentialsRef.current) return;
    
    const x = e.pageX - credentialsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    credentialsRef.current.scrollLeft = scrollPosition - walk;
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

  const scrollToLeft = () => {
    if (!credentialsRef.current) return;
    credentialsRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };
  
  const scrollToRight = () => {
    if (!credentialsRef.current) return;
    credentialsRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    downloadRealCV();
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
          {/* Header/Contact Information */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4">
            <div>
              <h3 className="text-3xl font-bold">TRAN ANH DUC</h3>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col space-y-2">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+84815420855</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>Ho Chi Minh City, Viet Nam</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:duc.trananh0502@hcmut.edu.vn" className="text-blue-500 hover:underline">
                  duc.trananh0502@hcmut.edu.vn
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://linkedin.com/in/trananh-duc" className="flex items-center text-blue-500 hover:underline">
                  <Linkedin size={16} className="mr-1" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/trananh-duc" className="flex items-center text-blue-500 hover:underline">
                  <Github size={16} className="mr-1" />
                  <span>Github</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Objective Section */}
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Objective</h4>
            <p className="text-gray-700 ml-2">
              Passionate second-year Computer Science major with a strong foundation in AI, machine learning, and
              Computer Vision. I actively research AI applications in various domains such as agriculture, medicine,
              and the environment while exploring advancements from software to architecture. Eager to apply my
              skills in AI/ML, software development, and research through hands-on projects and industry collaboration.
            </p>
          </div>
          
          {/* Education Section */}
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Education</h4>
            <div className="ml-2">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h5 className="text-lg font-semibold">Bachelor of Computer Science</h5>
                  <p className="text-gray-700">Ho Chi Minh City University of Technology - VNU HCM (Expected 2027)</p>
                  <p className="text-gray-700">Major: Computer Science &nbsp;&nbsp; Minor: Artificial Intelligence</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Skills</h4>
            <div className="ml-2 space-y-2">
              <div>
                <p><span className="font-semibold">Programming Languages:</span> C++, Python, LaTeX, Markdown</p>
              </div>
              <div>
                <p><span className="font-semibold">Libraries and Frameworks:</span> C++ xtensor, Python Data Visualization (pandas, numpy, matplotlib, scikit-learn, YOLO)</p>
              </div>
              <div>
                <p><span className="font-semibold">Tools:</span> CVAT, Roboflow, basic Docker</p>
              </div>
              <div>
                <p><span className="font-semibold">Research Skills:</span> Hands-on Experimental Research, Academic Paper Writing, Literature Review</p>
              </div>
              <div>
                <p><span className="font-semibold">Version Control:</span> Git, GitHub</p>
              </div>
              <div>
                <p><span className="font-semibold">MLOps:</span> Actively Learning</p>
              </div>
              <div>
                <p><span className="font-semibold">IELTS:</span> Academic 7.0 Overall</p>
              </div>
            </div>
          </div>
          
          {/* Projects Section */}
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Projects</h4>
            <div className="ml-2 space-y-6">
              <div>
                <h5 className="text-lg font-semibold">Towards an IoT-Based Intelligent Waste Classification System Using YOLOv8 and Pixel Intensity Normalization Algorithm</h5>
                <p className="text-gray-700">Vietnam National University Ho Chi Minh University of Technology</p>
                <p className="text-gray-700"><strong>Role:</strong> Mentor - 2024-2025 Science and Engineering Fair for High School Students</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Mentored and supported a high school team in developing a friendly trash density system using instance segmentation.</li>
                  <li>Reviewed paperwork and guided teams in writing and researching.</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold">Real-Time Traffic Monitoring System Featuring IntDetX and Consistent Weighted Dual Label Assignment</h5>
                <p className="text-gray-700"><strong>Advisor:</strong> Assoc. Prof. Tran Minh Quang</p>
                <p className="text-gray-700">Vietnam National University Ho Chi Minh University of Technology</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Developed IntDetX, an architecture combining YOLOv8's speed and EfficientDet-B7's accuracy for traffic detection.</li>
                  <li>Improved the Level of Service (LOS) framework for real-time traffic analysis with more precise criteria.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Experience Section */}
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Experience</h4>
            <div className="ml-2 space-y-6">
              <div>
                <h5 className="text-lg font-semibold">Research Assistant - Vietnam National University Ho Chi Minh University of Technology</h5>
                <p className="text-gray-700">(Feb 2024 - Present)</p>
                <p className="text-gray-700"><strong>Advisor:</strong> M.Sc. Le Nhat Tan</p>
                <p className="text-gray-700">Geometrical, Graphical, and Transformer-based Approaches for Recognizing Naturalistic Depression in Facial Behavior</p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Developed and implemented a Deep Learning model to analyze and predict depression on the FaceSpy dataset.</li>
                  <li>Addressed complex scheduling tasks, optimizing resource allocation.</li>
                  <li>Demonstrated the effectiveness of genetic algorithm-based scheduling in industrial applications.</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold">Technical Reviewer - ROBUSTO AI (May 2024 - Dec 2024)</h5>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Assisted in developing LaTeX templates for lessons, courses, and homework for <a href="https://fullstackdata-science.com" className="text-blue-500 hover:underline">fullstackdata-science.com</a>.</li>
                  <li>Developed online notebooks for lab practice in Computer Vision, including Object Detection and Object Tracking Algorithm.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Credentials Section */}
          <div className="mb-6">
            <h4 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-4">Credentials</h4>
            <div className="relative">
              {showLeftScroll && (
                <button 
                  onClick={scrollToLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 p-1 rounded-full opacity-70 hover:opacity-100 shadow-md"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              
              {showRightScroll && (
                <button 
                  onClick={scrollToRight}
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
              onClick={handleDownloadCV}
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
