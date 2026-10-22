import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { PortfolioData } from '../../types';
import { HomeView } from '../HomeView';
import { ProjectsView } from '../ProjectsView';
import { AboutView } from '../AboutView';
import { GalleryView } from '../GalleryView';
import { ResumeView } from '../ResumeView';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface LivePreviewProps {
  data: PortfolioData;
  onExitPreview: () => void;
  onNavigateEditorTab: (tabId: string) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  data,
  onExitPreview,
  onNavigateEditorTab,
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [previewNotification, setPreviewNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setPreviewNotification(msg);
    setTimeout(() => setPreviewNotification(null), 3000);
  };

  const getContainerWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-slate-100 font-sans">
      {/* Top Floating Control Bar */}
      <header className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-lg z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitPreview}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            <span>Return to Studio Editor</span>
          </button>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400">
            <Eye className="w-4 h-4" />
            <span>Live Draft Preview</span>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewport === 'desktop'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop 100% View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewport === 'tablet'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet (768px) View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet (768px)</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewport === 'mobile'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile (375px) View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (375px)</span>
          </button>
        </div>

        {/* Tab Shortcuts */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-mono">
          <span className="text-slate-500 mr-1">Preview Tab:</span>
          {['home', 'projects', 'about', 'gallery', 'resume'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-2.5 py-1 rounded text-xs capitalize cursor-pointer ${
                activeTab === t
                  ? 'bg-slate-800 text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Main Preview Container with device wrapper */}
      <div className="flex-1 overflow-y-auto bg-slate-900/60 p-2 sm:p-6 flex items-start justify-center">
        <div
          className={`${getContainerWidth()} min-h-full bg-white text-slate-900 shadow-2xl transition-all duration-300 rounded-none sm:rounded-2xl overflow-hidden flex flex-col border border-slate-700/60`}
        >
          {/* Mock Public Navbar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenLogin={() => notify('Preview mode: login modal disabled')}
            onOpenContact={() => notify('Preview mode: contact action tested')}
            onOpenEnquiry={() => notify('Preview mode: enquiry modal tested')}
            brandSubtitle={data.settings.brandSubtitle}
            title={data.profile.title}
          />

          {/* Active Preview Body */}
          <main className="flex-1">
            {activeTab === 'home' && (
              <HomeView
                data={data}
                isAdmin={false}
                isQuickEdit={false}
                onOpenQuickEdit={() => {}}
                onUpdateData={() => {}}
                onNavigateTab={setActiveTab}
                onOpenContact={() => notify('Direct contact action')}
                onOpenEnquiry={() => notify('Enquiry action')}
                onOpenVideoModal={() => {}}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsView
                data={data}
                isAdmin={false}
                isQuickEdit={false}
                onOpenQuickEdit={() => {}}
                onUpdateData={() => {}}
                onNavigateTab={setActiveTab}
                onOpenContact={() => notify('Direct contact action')}
                onOpenEnquiry={() => notify('Enquiry action')}
              />
            )}

            {activeTab === 'about' && (
              <AboutView
                data={data}
                isAdmin={false}
                isQuickEdit={false}
                onOpenQuickEdit={() => {}}
                onUpdateData={() => {}}
                onNavigateTab={setActiveTab}
                onOpenContact={() => notify('Direct contact action')}
              />
            )}

            {activeTab === 'gallery' && (
              <GalleryView
                data={data}
                isAdmin={false}
                onUpdateData={() => {}}
                onOpenVideoModal={() => {}}
              />
            )}

            {activeTab === 'resume' && (
              <ResumeView
                data={data}
                isAdmin={false}
                onUpdateData={() => {}}
                onOpenContact={() => notify('Direct contact action')}
              />
            )}
          </main>

          {/* Public Footer */}
          <Footer
            contact={data.contact}
            name={data.hero.name}
            brandTitle={data.settings.brandSubtitle}
            title={data.profile.title}
            isAdmin={false}
            onOpenLogin={() => {}}
            onOpenDashboard={() => {}}
          />
        </div>
      </div>

      {/* Preview Toast */}
      {previewNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-blue-500/50 text-white px-4 py-2 rounded-xl text-xs font-mono font-semibold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{previewNotification}</span>
        </div>
      )}
    </div>
  );
};
