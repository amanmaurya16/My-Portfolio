import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

interface PdfCanvasViewerProps {
  pdfUrl?: string;
  className?: string;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({ pdfUrl, className = '' }) => {
  if (!pdfUrl) {
    return (
      <div className={`p-8 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-center space-y-3 ${className}`}>
        <FileText className="w-12 h-12 text-slate-400 mx-auto" />
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Digital Resume Viewer
        </h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Please download the official PDF copy or view the interactive resume breakdown below.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md ${className}`}>
      <iframe
        src={`${pdfUrl}#toolbar=0`}
        title="Aman Maurya Resume"
        className="w-full h-[650px] border-0"
      />
    </div>
  );
};
