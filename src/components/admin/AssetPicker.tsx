import React, { useState } from 'react';
import { Image as ImageIcon, Check, Upload, AlertCircle, ShieldCheck } from 'lucide-react';
import {
  COMMITTED_REPOSITORY_ASSETS,
  resolveAssetUrl,
  validateAssetFile,
} from '../../services/localAssetManager';
import { uploadPortfolioImage } from '../../utils/imageUpload';

interface AssetPickerProps {
  currentValue: string;
  onSelect: (pathOrUrl: string) => void;
  label?: string;
  expectedType?: 'image' | 'pdf' | 'video';
}

export const AssetPicker: React.FC<AssetPickerProps> = ({
  currentValue,
  onSelect,
  label = 'Asset Image Path',
  expectedType = 'image',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState(currentValue);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAssetFile(file, expectedType);
    if (!validation.isValid) {
      setErrorMsg(validation.error || 'Invalid file format or size limit exceeded.');
      return;
    }

    setErrorMsg(null);
    setUploading(true);
    try {
      const dataUrl = await uploadPortfolioImage(file);
      onSelect(dataUrl);
      setCustomInput(dataUrl);
      setIsOpen(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelect(customInput.trim());
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <label className="font-mono text-slate-300">{label}</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-blue-400 hover:text-blue-300 underline font-mono cursor-pointer"
        >
          {isOpen ? 'Close Picker' : 'Choose from Assets / Upload'}
        </button>
      </div>

      {/* Input preview row */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 p-1 flex items-center justify-center shrink-0 overflow-hidden">
          {currentValue ? (
            <img
              src={resolveAssetUrl(currentValue)}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-600" />
          )}
        </div>
        <input
          type="text"
          value={currentValue}
          onChange={(e) => {
            onSelect(e.target.value);
            setCustomInput(e.target.value);
          }}
          placeholder="assets/filename.jpg or URL"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 mt-2 shadow-xl animate-fadeIn">
          {errorMsg && (
            <div className="flex items-center gap-2 p-2 bg-rose-950/60 border border-rose-800/80 rounded-lg text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-2">
              Verified Repository Assets (public/assets/)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {COMMITTED_REPOSITORY_ASSETS.map((assetPath) => {
                const isSelected = currentValue === assetPath;
                const fileName = assetPath.replace(/^assets\//, '');
                return (
                  <button
                    key={assetPath}
                    type="button"
                    onClick={() => {
                      onSelect(assetPath);
                      setCustomInput(assetPath);
                      setIsOpen(false);
                    }}
                    className={`p-2 rounded-lg border text-left flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/40 text-blue-200'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="w-full h-14 bg-slate-950 rounded flex items-center justify-center overflow-hidden p-1">
                      <img
                        src={resolveAssetUrl(assetPath)}
                        alt={fileName}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-mono truncate w-full text-center" title={fileName}>
                      {fileName}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[9px] text-blue-400 font-bold">
                        <Check className="w-2.5 h-2.5" /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition shadow">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Processing File...' : 'Upload Local File'}</span>
              <input
                type="file"
                accept={expectedType === 'pdf' ? '.pdf' : 'image/jpeg,image/png,image/webp,image/svg+xml'}
                disabled={uploading}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Local draft preview only</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
