import React, { useState, useMemo } from 'react';
import {
  Grid,
  Filter,
  Plus,
  Play,
  ExternalLink,
  Layers,
  Box,
  Image as ImageIcon,
  Eye,
  X,
} from 'lucide-react';
import { GalleryItem, PortfolioData } from '../types';
import { AddNewModelModal } from './AddNewModelModal';

interface GalleryViewProps {
  data: PortfolioData;
  isAdmin: boolean;
  onUpdateData: (newData: PortfolioData) => void;
  onOpenVideoModal: (url: string, title?: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  data,
  isAdmin,
  onUpdateData,
  onOpenVideoModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => {
    const list = Array.from(new Set(data.galleryItems.map((item) => item.category)));
    return ['all', ...list];
  }, [data.galleryItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return data.galleryItems;
    return data.galleryItems.filter((item) => item.category === selectedCategory);
  }, [data.galleryItems, selectedCategory]);

  const handleAddModel = (newItem: GalleryItem) => {
    onUpdateData({
      ...data,
      galleryItems: [newItem, ...data.galleryItems],
    });
  };

  const handleDeleteModel = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      onUpdateData({
        ...data,
        galleryItems: data.galleryItems.filter((item) => item.id !== itemId),
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Portfolio Gallery
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            CAD Design &amp; 3D Models Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Explore 3D parts, assemblies, mechanism simulations, sheet metal enclosures, and detail engineering drawings.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New CAD Model</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'All Models' : cat}
          </button>
        ))}
      </div>

      {/* Grid of CAD Models */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.mediaType === 'video' && item.mediaUrl) {
                onOpenVideoModal(item.mediaUrl, item.title);
              } else {
                setPreviewItem(item);
              }
            }}
            className="bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            {/* Thumbnail / Image Container */}
            <div className="relative aspect-4/3 bg-slate-950 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                <span className="px-2 py-0.5 bg-blue-600/90 text-white text-[10px] font-bold rounded-md shadow-xs">
                  {item.software}
                </span>
                <span className="px-2 py-0.5 bg-slate-900/80 text-slate-200 text-[10px] font-medium rounded-md backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              {item.mediaType === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-1.5 bg-slate-900/80 text-white rounded-lg inline-flex items-center gap-1 text-[11px] font-semibold backdrop-blur-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </span>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>

              {isAdmin && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteModel(item.id);
                    }}
                    className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                  >
                    Delete Item
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-white"
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white rounded-xl bg-black/40 hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={previewItem.imageUrl}
                alt={previewItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg">
                  {previewItem.software}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {previewItem.category}
                </span>
              </div>
              <h2 className="text-xl font-bold">{previewItem.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {previewItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Model Modal */}
      <AddNewModelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddModel={handleAddModel}
        defaultCategory={selectedCategory === 'all' ? '3D CAD Model' : selectedCategory}
      />
    </div>
  );
};
