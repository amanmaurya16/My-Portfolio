import React, { useRef, useState } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';

interface ProjectVideoControlProps {
  videoUrl: string;
  onOpenModal?: () => void;
  className?: string;
}

export const ProjectVideoControl: React.FC<ProjectVideoControlProps> = ({
  videoUrl,
  onOpenModal,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`relative group overflow-hidden rounded-xl bg-black ${className}`}>
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        {onOpenModal && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/50 hover:bg-black/80 text-white transition-colors"
            title="Fullscreen Modal"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
