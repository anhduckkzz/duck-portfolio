import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";

// This function will be used to generate a dynamic PDF if needed
export const generateResumePDF = () => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    // Set font sizes and colors
    const titleSize = 16;
    const headingSize = 14;
    const textSize = 10;
    const smallTextSize = 8;
    
    // Add document title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(titleSize);
    doc.text("TRAN ANH DUC", 15, 20);
    
    // Add contact info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(textSize);
    doc.text("Phone: +84815420855", 15, 30);
    doc.text("Location: Ho Chi Minh City, Viet Nam", 15, 35);
    doc.text("Email: duc.trananh0502@hcmut.edu.vn", 15, 40);
    doc.text("LinkedIn: linkedin.com/in/trananh-duc", 15, 45);
    doc.text("Github: github.com/trananh-duc", 15, 50);
    
    // Objective
    doc.setFont("helvetica", "bold");
    doc.setFontSize(headingSize);
    doc.text("OBJECTIVE", 15, 60);
    doc.line(15, 62, 195, 62);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(textSize);
    const objective = "Passionate second-year Computer Science major with a strong foundation in AI, machine learning, and Computer Vision. I actively research AI applications in various domains such as agriculture, medicine, and the environment while exploring advancements from software to architecture. Eager to apply my skills in AI/ML, software development, and research through hands-on projects and industry collaboration.";
    const objectiveLines = doc.splitTextToSize(objective, 180);
    doc.text(objectiveLines, 15, 70);
    
    // Education
    doc.setFont("helvetica", "bold");
    doc.setFontSize(headingSize);
    doc.text("EDUCATION", 15, 85);
    doc.line(15, 87, 195, 87);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(textSize);
    doc.text("Bachelor of Computer Science", 15, 95);
    
    doc.setFont("helvetica", "normal");
    doc.text("Ho Chi Minh City University of Technology - VNU HCM (Expected 2027)", 15, 100);
    doc.text("Major: Computer Science    Minor: Artificial Intelligence", 15, 105);
    
    // Skills
    doc.setFont("helvetica", "bold");
    doc.setFontSize(headingSize);
    doc.text("SKILLS", 15, 115);
    doc.line(15, 117, 195, 117);
    
    doc.setFontSize(textSize);
    let yPos = 125;
    
    const skills = [
      { category: "Programming Languages:", items: "C++, Python, LaTeX, Markdown" },
      { category: "Libraries and Frameworks:", items: "C++ xtensor, Python Data Visualization (pandas, numpy, matplotlib, scikit-learn, YOLO)" },
      { category: "Tools:", items: "CVAT, Roboflow, Docker, Linux" },
      { category: "Research Skills:", items: "Hands-on Experimental Research, Academic Paper Writing, Literature Review" },
      { category: "Version Control:", items: "Git, GitHub" },
      { category: "MLOps:", items: "Actively Learning" },
      { category: "IELTS:", items: "Academic 7.0 Overall" }
    ];
    
    skills.forEach(skill => {
      doc.setFont("helvetica", "bold");
      doc.text(`${skill.category}`, 15, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(` ${skill.items}`, 15 + doc.getTextWidth(skill.category), yPos);
      yPos += 5;
    });
    
    // Projects
    yPos += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(headingSize);
    doc.text("PROJECTS", 15, yPos);
    yPos += 2;
    doc.line(15, yPos, 195, yPos);
    yPos += 8;
    
    // Project 1
    doc.setFont("helvetica", "bold");
    doc.setFontSize(textSize);
    doc.text("Towards an IoT-Based Intelligent Waste Classification System Using YOLOv8 and Pixel Intensity Normalization Algorithm", 15, yPos);
    yPos += 5;
    
    doc.setFont("helvetica", "normal");
    doc.text("Vietnam National University Ho Chi Minh University of Technology", 15, yPos);
    yPos += 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("Role:", 15, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(" Mentor - 2024-2025 Science and Engineering Fair for High School Students", 20, yPos);
    yPos += 5;
    
    doc.text("• Mentored and supported a high school team in developing a friendly trash density system using instance segmentation.", 20, yPos);
    yPos += 5;
    doc.text("• Reviewed paperwork and guided teams in writing and researching.", 20, yPos);
    yPos += 10;
    
    // Project 2
    doc.setFont("helvetica", "bold");
    doc.text("Real-Time Traffic Monitoring System Featuring IntDetX and Consistent Weighted Dual Label Assignment", 15, yPos);
    yPos += 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("Advisor:", 15, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(" Assoc. Prof. Tran Minh Quang", 30, yPos);
    yPos += 5;
    
    doc.text("Vietnam National University Ho Chi Minh University of Technology", 15, yPos);
    yPos += 5;
    
    doc.text("• Developed IntDetX, an architecture combining YOLOv8's speed and EfficientDet-B7's accuracy for traffic detection.", 20, yPos);
    yPos += 5;
    doc.text("• Improved the Level of Service (LOS) framework for real-time traffic analysis with more precise criteria.", 20, yPos);
    yPos += 10;
    
    // Experience
    doc.setFont("helvetica", "bold");
    doc.setFontSize(headingSize);
    doc.text("EXPERIENCE", 15, yPos);
    yPos += 2;
    doc.line(15, yPos, 195, yPos);
    yPos += 8;
    
    // Experience 1
    doc.setFont("helvetica", "bold");
    doc.setFontSize(textSize);
    doc.text("Research Assistant - Vietnam National University Ho Chi Minh University of Technology", 15, yPos);
    yPos += 5;
    
    doc.setFont("helvetica", "normal");
    doc.text("(Feb 2024 - Present)", 15, yPos);
    yPos += 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("Advisor:", 15, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(" M.Sc. Le Nhat Tan", 30, yPos);
    yPos += 5;
    
    doc.text("Geometrical, Graphical, and Transformer-based Approaches for Recognizing Naturalistic Depression in Facial Behavior", 15, yPos);
    yPos += 5;
    
    doc.text("• Developed and implemented a Deep Learning model to analyze and predict depression on the FaceSpy dataset.", 20, yPos);
    yPos += 5;
    doc.text("• Addressed complex scheduling tasks, optimizing resource allocation.", 20, yPos);
    yPos += 5;
    doc.text("• Demonstrated the effectiveness of genetic algorithm-based scheduling in industrial applications.", 20, yPos);
    yPos += 10;
    
    // Experience 2
    doc.setFont("helvetica", "bold");
    doc.text("Technical Reviewer - ROBUSTO AI (May 2024 - Dec 2024)", 15, yPos);
    yPos += 5;
    
    doc.setFont("helvetica", "normal");
    doc.text("• Assisted in developing LaTeX templates for lessons, courses, and homework for fullstackdata-science.com.", 20, yPos);
    yPos += 5;
    doc.text("• Developed online notebooks for lab practice in Computer Vision, including Object Detection and Object Tracking Algorithm.", 20, yPos);
    
    return doc;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

// New function to download a real PDF file
export const downloadRealCV = () => {
  try {
    // Try to generate and download the dynamic PDF instead
    const doc = generateResumePDF();
    doc.save('TranAnhDuc_CV.pdf');
  } catch (error) {
    console.error('Error downloading CV:', error);
    // Fallback: try to download from public directory
    try {
      const pdfFilePath = '/TranAnhDuc_CV.pdf';
      const link = document.createElement('a');
      link.href = pdfFilePath;
      link.download = 'TranAnhDuc_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (fallbackError) {
      console.error('Fallback download also failed:', fallbackError);
      alert('Unable to download CV. Please try again later.');
    }
  }
};
