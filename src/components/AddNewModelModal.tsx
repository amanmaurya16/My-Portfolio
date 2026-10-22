import React, { useState } from 'react';
import { X, Upload, Plus, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';
import { uploadPortfolioImage } from '../utils/imageUpload';
import { generateCadSvgPlaceholder } from '../initialData';
import { validateAssetFile } from '../services/localAssetManager';

interface AddNewModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddModel: (item: GalleryItem) => void;
  defaultCategory?: string;
}

export const AddNewModelModal: React.FC<AddNewModelModalProps> = ({
  isOpen,
  onClose,
  onAddModel,
  defaultCategory = '3D CAD Model',
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [software, setSoftware] = useState('SolidWorks');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateAssetFile(file, 'image');
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid image file.');
      return;
    }
    setErrorMessage(null);
    setUploading(true);
    try {
      const url = await uploadPortfolioImage(file);
      setImageUrl(url);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = imageUrl || generateCadSvgPlaceholder(title, '#0b6efd', `${software} ${category}`);
    const newItem: GalleryItem = {
      id: `model-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      software: software.trim(),
      description: description.trim(),
      imageUrl: finalImage,
      mediaUrl: finalImage,
      mediaType,
    };
    onAddModel(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" />
          <span>Add New CAD Model / Gallery Item</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Model Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Planetary Gearbox Assembly"
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="3D CAD Model">3D CAD Model</option>
                <option value="Assembly & Mechanism">Assembly &amp; Mechanism</option>
                <option value="Robotics & Automation">Robotics &amp; Automation</option>
                <option value="Sheet Metal">Sheet Metal</option>
                <option value="2D Production Drawing">2D Production Drawing</option>
                <option value="Automotive Component">Automotive Component</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Software Used
              </label>
              <select
                value={software}
                onChange={(e) => setSoftware(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="SolidWorks">SolidWorks</option>
                <option value="AutoCAD">AutoCAD</option>
                <option value="CATIA">CATIA</option>
                <option value="Fusion 360">Fusion 360</option>
                <option value="ANSYS">ANSYS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Engineering details, kinematic constraints, materials, manufacturing process..."
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Model Image / Render
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 transition-colors">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>{uploading ? 'Processing Image...' : 'Upload Image from PC'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              {imageUrl && (
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
          >
            Add to Gallery
          </button>
        </form>
      </div>
    </div>
  );
};
