import React from 'react';
import {
  Sliders,
  Edit2,
  Download,
  RotateCcw,
  LogOut,
  FileCode,
} from 'lucide-react';

interface AdminBarProps {
  onOpenDashboard: () => void;
  isQuickEditActive: boolean;
  onToggleQuickEdit: () => void;
  onExportBackup?: () => void;
  onResetData?: () => void;
  onExitDraftMode?: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  onOpenDashboard,
  isQuickEditActive,
  onToggleQuickEdit,
  onExportBackup,
  onResetData,
  onExitDraftMode,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white border border-slate-700/80 rounded-2xl shadow-2xl px-4 py-2.5 backdrop-blur-md flex items-center gap-3 animate-fadeIn max-w-[95vw] overflow-x-auto scrollbar-none">
      {/* Draft Mode Pill */}
      <div className="flex items-center gap-2 pr-2 border-r border-slate-700 shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-bold text-slate-300 font-mono uppercase tracking-wider">
          Draft Studio
        </span>
      </div>

      {/* Main CMS button */}
      <button
        onClick={onOpenDashboard}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow shrink-0 cursor-pointer"
        title="Open Full Content Management System"
      >
        <Sliders className="w-3.5 h-3.5" />
        <span>Content Manager</span>
      </button>

      {/* Quick edit inline toggle */}
      <button
        onClick={onToggleQuickEdit}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
          isQuickEditActive
            ? 'bg-amber-500 text-slate-950 font-black shadow'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
        }`}
        title="Toggle inline edit icons directly on website sections"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span>{isQuickEditActive ? 'Quick Edit: ON' : 'Quick Edit'}</span>
      </button>

      {/* Export JSON backup button */}
      {onExportBackup && (
        <button
          onClick={onExportBackup}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition shrink-0 cursor-pointer"
          title="Download updated portfolio.json to commit to git"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Export JSON</span>
        </button>
      )}

      {/* Reset to Canonical button */}
      {onResetData && (
        <button
          onClick={onResetData}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-rose-950 text-slate-400 hover:text-rose-300 rounded-lg text-xs font-medium transition shrink-0 cursor-pointer"
          title="Discard local draft changes and revert to canonical portfolio data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reset</span>
        </button>
      )}

      {/* Exit Draft Mode button */}
      {onExitDraftMode && (
        <button
          onClick={onExitDraftMode}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition shrink-0 cursor-pointer"
          title="Exit Draft Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
