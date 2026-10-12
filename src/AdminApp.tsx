import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  ExternalLink,
  LogOut,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PortfolioData, EnquiryItem } from './types';
import {
  loadPortfolioData,
  savePortfolioData,
  loadStoredEnquiries,
  deleteStoredEnquiry,
} from './utils/storage';
import {
  loadPortfolioFromFirestore,
  savePortfolioToFirestore,
  subscribeToPortfolio,
  isFirestoreConfigured,
} from './utils/firebase';
import { AdminDashboard } from './components/AdminDashboard';
import { initialPortfolioData } from './initialData';
import { ADMIN_EMAILS } from './config/adminEmails';

const AdminContent: React.FC = () => {
  const { user, isAdmin, loading: authLoading, signInWithGoogle, signOutUser, error, clearError } = useAuth();
  const [data, setData] = useState<PortfolioData>(() => loadPortfolioData());
  const [isFirestoreSyncActive, setIsFirestoreSyncActive] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => loadStoredEnquiries());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isPinUnlocked, setIsPinUnlocked] = useState(false);

  // Load from Firestore on mount & subscribe
  useEffect(() => {
    let isMounted = true;
    loadPortfolioFromFirestore()
      .then((remoteData) => {
        if (isMounted && remoteData) {
          setData(remoteData);
          savePortfolioData(remoteData);
          setIsFirestoreSyncActive(true);
        }
      })
      .catch(() => {
        if (isMounted) setIsFirestoreSyncActive(false);
      });

    const unsubscribe = subscribeToPortfolio(
      (updated) => {
        if (isMounted && updated) {
          setData(updated);
          savePortfolioData(updated);
          setIsFirestoreSyncActive(true);
        }
      },
      () => {
        if (isMounted) setIsFirestoreSyncActive(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleUpdateData = async (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
    try {
      await savePortfolioToFirestore(newData);
      setIsFirestoreSyncActive(true);
    } catch (err) {
      console.warn('Firestore save notice:', err);
    }
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = deleteStoredEnquiry(id);
    setEnquiries(updated);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all portfolio data to default original engineering records?')) {
      handleUpdateData(initialPortfolioData);
    }
  };

  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aman_Maurya_Portfolio_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      pinInput === 'Admin@123' ||
      pinInput === '160205' ||
      pinInput === data.settings.adminPin
    ) {
      setIsPinUnlocked(true);
      setPinError('');
    } else {
      setPinError('Incorrect Admin Password / PIN.');
    }
  };

  const isAccessAuthorized = isAdmin || isPinUnlocked;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow">
            AM
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">
              Aman Maurya — Admin CMS Portal
            </h1>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Security Console ({ADMIN_EMAILS[0]})</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/index.html"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Portfolio</span>
          </a>

          {isAccessAuthorized && (
            <button
              onClick={() => {
                setIsPinUnlocked(false);
                signOutUser();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-semibold rounded-lg border border-rose-800/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Sign Out</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {isAccessAuthorized ? (
          <div className="flex-1">
            <AdminDashboard
              isOpen={true}
              onClose={() => {
                window.location.href = '/index.html';
              }}
              data={data}
              onUpdateData={handleUpdateData}
              enquiries={enquiries}
              onDeleteEnquiry={handleDeleteEnquiry}
              onResetData={handleResetData}
              onExportBackup={handleExportBackup}
              isFirestoreSyncActive={isFirestoreSyncActive}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-white">Admin Security Access</h2>
                <p className="text-xs text-slate-400">
                  Authenticate using your authorized Google Account or Admin PIN to manage portfolio projects.
                </p>
              </div>

              {/* Option 1: Google Sign In */}
              <div className="space-y-3">
                <button
                  onClick={signInWithGoogle}
                  disabled={authLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  id="admin-google-login-btn"
                >
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
                  <span>Sign In with Admin Google Account</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  OR ADMIN PIN
                </span>
              </div>

              {/* Option 2: Admin Password / PIN */}
              <form onSubmit={handlePinSubmit} className="space-y-3.5">
                {pinError && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Enter Admin PIN / Password
                  </label>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError('');
                    }}
                    placeholder="Enter Admin PIN..."
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  Unlock with PIN
                </button>
              </form>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500">
                  Authorized Admin Email: <span className="text-slate-300 font-mono">amanmauryaji16@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export const AdminApp: React.FC = () => {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
};
