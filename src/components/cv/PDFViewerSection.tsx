
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { motion } from "framer-motion";
import { PDFViewer } from './PDFViewer';

interface PDFViewerSectionProps {
  pdfFile: File | null;
  pdfUrl: string | null;
  onPdfUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PDFViewerSection = ({ pdfFile, pdfUrl, onPdfUpload }: PDFViewerSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-6 p-4 border border-dashed rounded-lg dark:border-darkmode-border"
    >
      <h4 className="text-lg font-medium mb-2 text-secondary dark:text-white">CV PDF Uploader (Admin Only)</h4>
      <div className="flex items-center gap-3">
        <Input 
          type="file" 
          accept="application/pdf" 
          onChange={onPdfUpload}
          className="flex-1 text-secondary dark:bg-darkmode-card dark:text-white"
        />
        <Button variant="outline" onClick={() => document.getElementById('pdf-upload')?.click()} className="text-secondary dark:text-white dark:hover:text-white">
          <Upload className="h-4 w-4 mr-2" />
          Upload PDF
        </Button>
      </div>
      
      {/* PDF Viewer */}
      <PDFViewer pdfUrl={pdfUrl} />
    </motion.div>
  );
};
