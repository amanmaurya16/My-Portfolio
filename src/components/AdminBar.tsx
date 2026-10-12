import React from 'react';
import { Settings, Edit3, Image, LogOut, CheckCircle2, Shield } from 'lucide-react';

interface AdminBarProps {
  onOpenDashboard: () => void;
  onOpenCloudinary: () => void;
  isQuickEditActive: boolean;
  onToggleQuickEdit: () => void;
  isFirestoreSyncActive?: boolean;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  onOpenDashboard,
  onOpenCloudinary,
  isQuickEditActive,
  onToggleQuickEdit,
  isFirestoreSyncActive = false,
}) => {
  return (
    <aside
      aria-label="Admin quick toolbar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/80 shadow-2xl flex items-center gap-3 sm:gap-4 max-w-[95vw] overflow-x-auto"
      id="admin-floating-bar"
    >
      <div className="flex items-center gap-2 border-r border-slate-700 pr-3 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase hidden sm:inline">
          Admin Active
        </span>
      </div>

      <button
        onClick={onOpenDashboard}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition-colors shrink-0"
        id="open-admin-dashboard-btn"
      >
        <Settings className="w-3.5 h-3.5" />
        <span>CMS Dashboard</span>
      </button>

      <button
        onClick={onToggleQuickEdit}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-colors shrink-0 ${
          isQuickEditActive
            ? 'bg-amber-500 text-slate-950 font-black'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
        }`}
        id="toggle-inline-edit-btn"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Quick Edit: {isQuickEditActive ? 'ON' : 'OFF'}</span>
      </button>

      <button
        onClick={onOpenCloudinary}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors shrink-0"
        id="admin-bar-cloudinary-btn"
      >
        <Image className="w-3.5 h-3.5" />
        <span>Cloud Media</span>
      </button>

      {isFirestoreSyncActive && (
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pl-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Cloud Sync Live</span>
        </div>
      )}
    </aside>
  );
};
