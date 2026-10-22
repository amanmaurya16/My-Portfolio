import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, AlertCircle } from 'lucide-react';
import { uploadPortfolioImage } from '../utils/imageUpload';
import { validateAssetFile } from '../services/localAssetManager';

interface HomeImageUploaderProps {
  currentUrl: string;
  onSaveUrl: (newUrl: string) => void;
  label?: string;
}

export const HomeImageUploader: React.FC<HomeImageUploaderProps> = ({
  currentUrl,
  onSaveUrl,
  label = 'Change Image',
}) => {
  const [showInput, setShowInput] = useState(false);
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate using localAssetManager
    const validation = validateAssetFile(file, 'image');
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid image file.');
      return;
    }

    setErrorMessage(null);
    setUploading(true);
    try {
      const url = await uploadPortfolioImage(file);
      onSaveUrl(url);
      setShowInput(false);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onSaveUrl(urlInput.trim());
      setShowInput(false);
    }
  };

  return (
    <div className="relative inline-block">
      {!showInput ? (
        <button
          onClick={() => {
            setShowInput(true);
            setErrorMessage(null);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md backdrop-blur-sm transition-all cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{label}</span>
        </button>
      ) : (
        <div className="absolute top-0 right-0 z-30 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl min-w-[280px] text-white space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-xs font-bold">{label}</span>
            <button
              onClick={() => setShowInput(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          {errorMessage && (
            <div className="flex items-start gap-1.5 p-2 bg-rose-950/60 border border-rose-800/80 rounded-lg text-[11px] text-rose-200">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <label className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Compressing & Storing...' : 'Upload from Device'}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <form onSubmit={handleUrlSubmit} className="flex gap-1.5 pt-1">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Or enter assets/path.jpg..."
              className="flex-1 text-[11px] px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs cursor-pointer"
              title="Apply path"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
