
import React from 'react';

interface PDFViewerProps {
  pdfUrl: string | null;
}

export const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  if (!pdfUrl) return null;
  
  return (
    <div className="w-full mt-4 rounded overflow-hidden shadow-lg">
      <iframe 
        src={pdfUrl} 
        className="w-full h-[600px] dark:border dark:border-darkmode-border dark:bg-white" 
        title="CV PDF Viewer"
      />
    </div>
  );
};
