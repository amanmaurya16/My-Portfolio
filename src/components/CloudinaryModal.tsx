import React, { useState } from 'react';
import { X, Cloud, Key, CheckCircle2 } from 'lucide-react';
import { getCloudinaryConfig } from '../utils/cloudinary';
import { PortfolioData } from '../types';

interface CloudinaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
}

export const CloudinaryModal: React.FC<CloudinaryModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
}) => {
  const current = getCloudinaryConfig();
  const [cloudName, setCloudName] = useState(data.settings.cloudinaryCloudName || current.cloudName);
  const [preset, setPreset] = useState(data.settings.cloudinaryPreset || current.uploadPreset);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PortfolioData = {
      ...data,
      settings: {
        ...data.settings,
        cloudinaryCloudName: cloudName.trim(),
        cloudinaryPreset: preset.trim(),
      },
    };
    onUpdateData(updated);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-900">
            <Cloud className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Media Cloud Storage (Cloudinary)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Configure permanent cloud storage for CAD renders and portfolio images.
          </p>
        </div>

        {saved ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Cloud Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={cloudName}
                  onChange={(e) => setCloudName(e.target.value)}
                  placeholder="e.g. your_cloud_name"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Unsigned Upload Preset *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={preset}
                  onChange={(e) => setPreset(e.target.value)}
                  placeholder="e.g. portfolio_preset"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                In Cloudinary Console → Settings → Upload → Add upload preset → Signing Mode: Unsigned.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Save Cloudinary Configuration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
