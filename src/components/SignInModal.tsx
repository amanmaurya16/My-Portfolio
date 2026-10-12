import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdmin?: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccessAdmin }) => {
  const { user, isAdmin, signInWithGoogle, signOutUser, error, clearError } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    clearError();
    const ok = await signInWithGoogle();
    setLoading(false);
    if (ok) {
      if (onSuccessAdmin) {
        onSuccessAdmin();
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 pt-2">
          <div className="w-12 h-12 mx-auto bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-900 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Authentication &amp; Admin Access
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
            Sign in with Google using your authorized account to manage projects, CAD models, and portfolio content.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 space-y-3">
          {user ? (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-left">
                <p className="text-xs text-slate-500">Currently signed in as:</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-slate-500 font-mono truncate">{user.email}</p>
                {isAdmin ? (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Authorized Administrator</span>
                  </div>
                ) : (
                  <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    Viewer Account (Not designated admin)
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={signOutUser}
                  className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
                >
                  Sign Out
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              id="google-signin-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <a
            href="/admin.html"
            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Direct Admin Security Portal (admin.html) →
          </a>
        </div>
      </div>
    </div>
  );
};
