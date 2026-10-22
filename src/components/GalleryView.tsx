import React, { useState, useMemo } from 'react';
import {
  Grid,
  Filter,
  Plus,
  Play,
  ExternalLink,
  Eye,
  X,
  FileCode,
  Download,
} from 'lucide-react';
import { GalleryItem, PortfolioData } from '../types';
import { AddNewModelModal } from './AddNewModelModal';
import { resolveAssetUrl } from '../services/localAssetManager';

interface GalleryViewProps {
  data: PortfolioData;
  isAdmin: boolean;
  onUpdateData: (newData: PortfolioData) => void;
  onOpenVideoModal: (url: string, title?: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Works & Drawings',
  projects: 'Mechanical Projects',
  certificates: 'Certificates & Credentials',
  '3d-modeling': '3D Part Modeling',
  drafting: 'Drafting & Blueprints',
  '2d-sketch': '2D Sketches (AutoCAD)',
  isometric: 'Isometric Projections',
  'advanced-3d': 'Part Assembly Work',
  'tool-die': 'Tool & Die Design',
  'surface-design': 'Surface Modeling',
  'sheet-metal': 'Sheet Metal Enclosures',
  weldment: 'Weldment Structures',
};

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
            CAD Design Repository
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
            Engineering Drawings &amp; 3D Models
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Detailed 2D engineering sketches, SolidWorks parametric parts, manufacturing drafting with ASME Y14.5 GD&amp;T standards, pressure vessels, sheet metal flat patterns, and weldment cut lists.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add CAD Model</span>
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
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white font-bold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {CATEGORY_LABELS[cat] || cat}
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
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between group tech-card"
          >
            {/* Thumbnail / Image Container */}
            <div className="relative aspect-4/3 bg-slate-950 overflow-hidden border-b border-slate-200">
              <img
                src={resolveAssetUrl(item.imageUrl)}
                alt={item.title}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-blue-600/90 text-white text-[10px] font-bold rounded shadow-xs font-mono">
                  {CATEGORY_LABELS[item.category] || item.category}
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
                <span className="p-1.5 bg-slate-900 text-white rounded-md inline-flex items-center gap-1 text-[11px] font-semibold shadow">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </span>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>

              {isAdmin && (
                <div className="pt-2 flex justify-end border-t border-slate-100 mt-2">
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
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-white"
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white rounded-lg bg-black/50 hover:bg-black transition cursor-pointer"
              aria-label="Close CAD inspector"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-slate-950 flex items-center justify-center border-b border-slate-800 p-4">
              <img
                src={resolveAssetUrl(previewItem.imageUrl)}
                alt={previewItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-600 text-white text-xs font-bold rounded font-mono">
                  {CATEGORY_LABELS[previewItem.category] || previewItem.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ID: {previewItem.id}
                </span>
              </div>
              <h2 className="text-xl font-bold">{previewItem.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
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
        defaultCategory={selectedCategory === 'all' ? '3d-modeling' : selectedCategory}
      />
    </div>
  );
};
