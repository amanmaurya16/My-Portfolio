import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h3 className="text-sm sm:text-base font-bold truncate">
            {title || 'Mechanical CAD Simulation & Animation'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
