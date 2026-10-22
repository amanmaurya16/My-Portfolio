import React from 'react';
import { X, Edit3, ShieldAlert, FileJson, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdmin?: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccessAdmin }) => {
  const { isAdmin, toggleAdminMode } = useAuth();

  if (!isOpen) return null;

  const handleActivateDraftMode = () => {
    if (!isAdmin) {
      toggleAdminMode();
    }
    if (onSuccessAdmin) {
      onSuccessAdmin();
    }
    onClose();
  };

  const handleDeactivateDraftMode = () => {
    if (isAdmin) {
      toggleAdminMode();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 mx-auto bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Portfolio Content Studio
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Static GitHub Pages Content Management
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <div className="flex items-start gap-2">
              <FileJson className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Repository Data Architecture:</strong> This website is hosted statically. Changes can be edited and previewed locally in your browser, then exported as <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[11px]">portfolio.json</code> to commit to the repository.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleActivateDraftMode}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAdmin ? 'Open CMS Dashboard' : 'Enable Draft / Edit Mode'}</span>
            </button>

            {isAdmin && (
              <button
                onClick={handleDeactivateDraftMode}
                className="w-full py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs transition cursor-pointer"
              >
                Disable Draft Mode
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
