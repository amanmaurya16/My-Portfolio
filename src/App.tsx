import React, { useState, useEffect } from 'react';
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
} from './utils/firebase';
import { initialPortfolioData } from './initialData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { GalleryView } from './components/GalleryView';
import { ResumeView } from './components/ResumeView';

import { AdminBar } from './components/AdminBar';
import { AdminDashboard } from './components/AdminDashboard';
import { SignInModal } from './components/SignInModal';
import { ContactModal } from './components/ContactModal';
import { EnquiryModal } from './components/EnquiryModal';
import { CloudinaryModal } from './components/CloudinaryModal';
import { VideoModal } from './components/VideoModal';
import { QuickEditModal } from './components/QuickEditModal';

const PortfolioAppContent: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [data, setData] = useState<PortfolioData>(() => loadPortfolioData());
  const [isFirestoreSyncActive, setIsFirestoreSyncActive] = useState<boolean>(false);

  // Active hash-based tab navigation
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (['home', 'about', 'gallery', 'resume'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  // Modals state
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isCloudinaryOpen, setIsCloudinaryOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string; title?: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  // Quick edit mode
  const [isQuickEdit, setIsQuickEdit] = useState(false);
  const [quickEditModal, setQuickEditModal] = useState<{
    isOpen: boolean;
    field: string;
    label: string;
    value: string;
    isTextarea?: boolean;
  }>({
    isOpen: false,
    field: '',
    label: '',
    value: '',
    isTextarea: false,
  });

  // Stored inquiries for admin
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => loadStoredEnquiries());

  // Listen to hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (['home', 'about', 'gallery', 'resume'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined' && window.location.hash !== `#${tab}`) {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };

  // Hydrate from Firestore on mount & live subscription
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
      .catch((err) => {
        console.warn('Initial Firestore fetch notice:', err);
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

  // Update Data handler (saves to LocalStorage and Firestore)
  const handleUpdateData = async (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
    try {
      await savePortfolioToFirestore(newData);
      setIsFirestoreSyncActive(true);
    } catch (err) {
      console.warn('Firestore update error:', err);
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

  const handleOpenQuickEdit = (
    field: string,
    label: string,
    currentVal: string,
    isTextarea = false
  ) => {
    setQuickEditModal({
      isOpen: true,
      field,
      label,
      value: currentVal,
      isTextarea,
    });
  };

  const handleSaveQuickEdit = (newVal: string) => {
    const { field } = quickEditModal;
    const parts = field.split('.');
    const clone = JSON.parse(JSON.stringify(data));
    let target = clone;
    for (let i = 0; i < parts.length - 1; i++) {
      target = target[parts[i]];
    }
    target[parts[parts.length - 1]] = newVal;
    handleUpdateData(clone);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenLogin={() => setIsSignInOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onToggleDashboard={() => setIsDashboardOpen(true)}
        brandSubtitle={data.settings.brandSubtitle}
        title={data.hero.title || data.profile.title}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            data={data}
            isAdmin={isAdmin}
            isQuickEdit={isQuickEdit}
            onOpenQuickEdit={handleOpenQuickEdit}
            onUpdateData={handleUpdateData}
            onNavigateTab={handleNavigateTab}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenEnquiry={() => setIsEnquiryOpen(true)}
            onOpenVideoModal={(url, title) => setVideoModal({ isOpen: true, url, title })}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            data={data}
            isAdmin={isAdmin}
            isQuickEdit={isQuickEdit}
            onOpenQuickEdit={handleOpenQuickEdit}
            onUpdateData={handleUpdateData}
            onNavigateTab={handleNavigateTab}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryView
            data={data}
            isAdmin={isAdmin}
            onUpdateData={handleUpdateData}
            onOpenVideoModal={(url, title) => setVideoModal({ isOpen: true, url, title })}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeView
            data={data}
            isAdmin={isAdmin}
            onUpdateData={handleUpdateData}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        contact={data.contact}
        name={data.hero.name}
        brandTitle={data.settings.brandSubtitle}
        title={data.profile.title}
        isAdmin={isAdmin}
        visitorUser={user}
        onOpenLogin={() => setIsSignInOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Floating Admin Toolbar if Admin Authenticated */}
      {isAdmin && (
        <AdminBar
          onOpenDashboard={() => setIsDashboardOpen(true)}
          onOpenCloudinary={() => setIsCloudinaryOpen(true)}
          isQuickEditActive={isQuickEdit}
          onToggleQuickEdit={() => setIsQuickEdit(!isQuickEdit)}
          isFirestoreSyncActive={isFirestoreSyncActive}
        />
      )}

      {/* Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSuccessAdmin={() => setIsDashboardOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        contact={data.contact}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        contact={data.contact}
      />

      <CloudinaryModal
        isOpen={isCloudinaryOpen}
        onClose={() => setIsCloudinaryOpen(false)}
        data={data}
        onUpdateData={handleUpdateData}
      />

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, url: '' })}
        videoUrl={videoModal.url}
        title={videoModal.title}
      />

      <QuickEditModal
        isOpen={quickEditModal.isOpen}
        onClose={() => setQuickEditModal({ ...quickEditModal, isOpen: false })}
        title={`Quick Edit: ${quickEditModal.label}`}
        fieldLabel={quickEditModal.label}
        initialValue={quickEditModal.value}
        isTextArea={quickEditModal.isTextarea}
        onSave={handleSaveQuickEdit}
      />

      <AdminDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        data={data}
        onUpdateData={handleUpdateData}
        enquiries={enquiries}
        onDeleteEnquiry={handleDeleteEnquiry}
        onResetData={handleResetData}
        onExportBackup={handleExportBackup}
        isFirestoreSyncActive={isFirestoreSyncActive}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PortfolioAppContent />
    </AuthProvider>
  );
}
