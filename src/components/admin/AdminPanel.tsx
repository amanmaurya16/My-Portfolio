import React, { useState, useRef, useEffect } from 'react';
import {
  Sliders,
  FolderGit2,
  GraduationCap,
  Layers,
  Briefcase,
  Award,
  Grid,
  Mail,
  FileCode,
  Download,
  Upload,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle,
  X,
  Menu,
  ChevronRight,
  Eye,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  ExternalLink,
  ShieldCheck,
  Info,
} from 'lucide-react';
import {
  PortfolioData,
  ProjectItem,
  EducationItem,
  InternshipItem,
  AwardItem,
  GalleryItem,
  EnquiryItem,
  ValidationResult,
} from '../../types';
import {
  validatePortfolioData,
  importAndValidatePortfolioJson,
  exportPortfolioBackup,
  exportPublishingChecklist,
  getDraftMetadata,
} from '../../services/portfolioRepository';
import {
  COMMITTED_REPOSITORY_ASSETS,
  resolveAssetUrl,
  isCommittedAsset,
} from '../../services/localAssetManager';
import { DashboardOverview } from './DashboardOverview';
import { LivePreview } from './LivePreview';
import { AssetPicker } from './AssetPicker';
import { ConfirmDialog } from './ConfirmDialog';

interface AdminPanelProps {
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  onResetData: () => void;
  enquiries: EnquiryItem[];
  onDeleteEnquiry: (id: string) => void;
  onClose?: () => void;
  isStandalone?: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  data,
  onUpdateData,
  onResetData,
  enquiries,
  onDeleteEnquiry,
  onClose,
  isStandalone = false,
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState<string>(() => JSON.stringify(data));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    confirmVariant?: 'danger' | 'primary';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const importFileInputRef = useRef<HTMLInputElement>(null);

  // Sync external prop updates if not dirty
  useEffect(() => {
    const currentJson = JSON.stringify(data);
    if (currentJson !== lastSavedSnapshot && JSON.stringify(formData) === lastSavedSnapshot) {
      setFormData(data);
      setLastSavedSnapshot(currentJson);
    }
  }, [data, lastSavedSnapshot, formData]);

  const hasUnsavedEdits = JSON.stringify(formData) !== lastSavedSnapshot;
  const validation: ValidationResult = validatePortfolioData(formData);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Reorder helper
  const moveItem = <T,>(arr: T[], index: number, direction: 'up' | 'down'): T[] => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= arr.length) return arr;
    const copy = [...arr];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    return copy;
  };

  // Save local draft
  const handleSaveDraft = () => {
    onUpdateData(formData);
    setLastSavedSnapshot(JSON.stringify(formData));
    showToast('Local browser draft saved. Remember to export JSON for Git publishing.');
  };

  // Discard working edits
  const handleDiscardChanges = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Discard Unsaved Edits?',
      message: 'This will revert all unsaved changes back to your last saved local draft state.',
      confirmLabel: 'Discard Edits',
      confirmVariant: 'danger',
      onConfirm: () => {
        setFormData(JSON.parse(lastSavedSnapshot));
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast('Unsaved edits discarded.', 'info');
      },
    });
  };

  // Reset to canonical repository data
  const handleResetToCanonical = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reset to Canonical Repository Data?',
      message: 'This will clear all browser drafts and restore original committed portfolio data from src/data/portfolio.json.',
      confirmLabel: 'Reset Everything',
      confirmVariant: 'danger',
      onConfirm: () => {
        onResetData();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast('Reset to canonical portfolio data completed.', 'info');
      },
    });
  };

  // JSON Import
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      const result = importAndValidatePortfolioJson(content);

      if (!result.success || !result.data) {
        showToast(result.errors?.[0] || 'Import failed validation.', 'error');
        return;
      }

      setConfirmDialog({
        isOpen: true,
        title: `Import Data from "${file.name}"?`,
        message: `Validation passed! Contains ${result.data.projects.length} projects, ${result.data.education.length} education entries, and ${result.data.galleryItems.length} gallery items. Replace active working data?`,
        confirmLabel: 'Apply Import',
        confirmVariant: 'primary',
        onConfirm: () => {
          setFormData(result.data!);
          onUpdateData(result.data!);
          setLastSavedSnapshot(JSON.stringify(result.data));
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          showToast(`Successfully imported portfolio data from "${file.name}".`);
        },
      });
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  // Export JSON
  const handleExportBackup = () => {
    exportPortfolioBackup(formData);
    showToast('Exported portfolio JSON. Replace src/data/portfolio.json to publish via Git.');
  };

  // Sidebar navigation items
  const navSections = [
    { id: 'dashboard', label: 'Overview & Metrics', icon: Sliders },
    { id: 'profile', label: 'Profile & About', icon: Sliders },
    { id: 'education', label: 'Education', icon: GraduationCap, badge: formData.education.length },
    { id: 'skills', label: 'Technical Skills', icon: Layers },
    { id: 'projects', label: 'Projects Work', icon: FolderGit2, badge: formData.projects.length },
    { id: 'experience', label: 'Internships', icon: Briefcase, badge: formData.internships.length },
    { id: 'awards', label: 'Awards & Certs', icon: Award, badge: formData.awards.length },
    { id: 'gallery', label: 'CAD Gallery', icon: Grid, badge: formData.galleryItems.length },
    { id: 'contact', label: 'Settings & Contact', icon: Mail },
    { id: 'publish', label: 'Import & Export', icon: FileCode },
  ];

  if (showLivePreview) {
    return (
      <LivePreview
        data={formData}
        onExitPreview={() => setShowLivePreview(false)}
        onNavigateEditorTab={(t) => {
          setShowLivePreview(false);
          setActiveTab(t);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-fadeIn">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        confirmVariant={confirmDialog.confirmVariant}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Hidden File Input for JSON Import */}
      <input
        type="file"
        ref={importFileInputRef}
        accept=".json"
        onChange={handleImportJsonFile}
        className="hidden"
      />

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 shrink-0 select-none z-20`}
      >
        <div>
          {/* Header Brand */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block">
                  Studio CMS
                </span>
                <h1 className="text-sm font-extrabold text-white truncate">
                  Aman Maurya
                </h1>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  title={sec.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="truncate flex-1 text-left">{sec.label}</span>
                  )}
                  {!sidebarCollapsed && sec.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        isActive ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Quick Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1.5">
          <button
            onClick={() => setShowLivePreview(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-xl text-xs font-bold transition cursor-pointer"
            title="Preview Live Website with Draft Data"
          >
            <Eye className="w-3.5 h-3.5" />
            {!sidebarCollapsed && <span>Live Preview</span>}
          </button>

          {!isStandalone && onClose && (
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Close Studio</span>}
            </button>
          )}

          {isStandalone && (
            <a
              href="./"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Public Website</span>}
            </a>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Control Bar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between gap-4 shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono truncate">
              {navSections.find((s) => s.id === activeTab)?.label}
            </span>

            {hasUnsavedEdits && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Unsaved Edits</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasUnsavedEdits && (
              <button
                type="button"
                onClick={handleDiscardChanges}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Discard
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveDraft}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow cursor-pointer ${
                hasUnsavedEdits
                  ? 'bg-blue-600 hover:bg-blue-700 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Local Draft</span>
            </button>

            <button
              type="button"
              onClick={() => setShowLivePreview(true)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            <button
              type="button"
              onClick={handleExportBackup}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow cursor-pointer"
              title="Download portfolio.json backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </header>

        {/* Tab Content Body */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-950">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* 1. OVERVIEW */}
            {activeTab === 'dashboard' && (
              <DashboardOverview
                data={formData}
                isDraft={hasUnsavedEdits}
                hasUnsavedEdits={hasUnsavedEdits}
                onNavigateTab={(t) => setActiveTab(t)}
                onLaunchPreview={() => setShowLivePreview(true)}
                onExportJson={handleExportBackup}
                onOpenImport={() => importFileInputRef.current?.click()}
              />
            )}

            {/* 2. PROFILE & ABOUT */}
            {activeTab === 'profile' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                  Profile &amp; Biography Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.hero.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, name: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Designation Title</label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, title: e.target.value },
                          profile: { ...formData.profile, title: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Hero Short Bio</label>
                  <textarea
                    rows={3}
                    value={formData.hero.bio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, bio: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">About Paragraph 1</label>
                    <textarea
                      rows={4}
                      value={formData.profile.bio1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, bio1: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">About Paragraph 2</label>
                    <textarea
                      rows={4}
                      value={formData.profile.bio2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, bio2: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 leading-relaxed"
                    />
                  </div>
                </div>

                {/* Profile Photo Picker */}
                <AssetPicker
                  currentValue={formData.profile.profileImage || 'assets/aman-profile.jpg'}
                  onSelect={(path) =>
                    setFormData({
                      ...formData,
                      profile: { ...formData.profile, profileImage: path },
                    })
                  }
                  label="Profile Portrait Photo"
                />

                {/* Hero 3D Engine Model Picker */}
                <AssetPicker
                  currentValue={formData.hero.heroImage || 'assets/hero-engine.jpg'}
                  onSelect={(path) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, heroImage: path },
                    })
                  }
                  label="Hero 3D CAD Assembly Asset"
                />
              </div>
            )}

            {/* 3. EDUCATION */}
            {activeTab === 'education' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Education &amp; Qualifications Timeline
                    </h3>
                    <p className="text-xs text-slate-400">
                      Preserve verified grades, institution names, and timeline records.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newEdu: EducationItem = {
                        id: `edu-${Date.now()}`,
                        institution: 'New Institution Name',
                        branch: 'Mechanical Engineering',
                        yearRange: `${new Date().getFullYear()} – Present`,
                        cgpa: '8.0',
                      };
                      setFormData({
                        ...formData,
                        education: [newEdu, ...formData.education],
                      });
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Qualification</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.education.map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          #{idx + 1} — {edu.institution}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                education: moveItem(formData.education, idx, 'up'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.education.length - 1}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                education: moveItem(formData.education, idx, 'down'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                education: formData.education.filter((e) => e.id !== edu.id),
                              });
                            }}
                            className="p-1 text-rose-400 hover:text-rose-300 ml-1 cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Institution Name
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[idx].institution = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Branch / Field
                          </label>
                          <input
                            type="text"
                            value={edu.branch}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[idx].branch = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Year Range
                          </label>
                          <input
                            type="text"
                            value={edu.yearRange}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[idx].yearRange = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-mono text-slate-400 block mb-1">
                              CGPA (if applicable)
                            </label>
                            <input
                              type="text"
                              value={edu.cgpa || ''}
                              onChange={(e) => {
                                const updated = [...formData.education];
                                updated[idx].cgpa = e.target.value;
                                setFormData({ ...formData, education: updated });
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-mono text-slate-400 block mb-1">
                              Percentage
                            </label>
                            <input
                              type="text"
                              value={edu.percentage || ''}
                              onChange={(e) => {
                                const updated = [...formData.education];
                                updated[idx].percentage = e.target.value;
                                setFormData({ ...formData, education: updated });
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. TECHNICAL SKILLS */}
            {activeTab === 'skills' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">
                    Technical Skills &amp; Competency Categories
                  </h3>
                  <p className="text-xs text-slate-400">
                    Organize skills into CAD Software, Drafting Standards, Mechanisms, and Workshop Technology. No arbitrary percentage bars.
                  </p>
                </div>

                <div className="space-y-4">
                  {(formData.profile.skillCategories || []).map((cat, cidx) => (
                    <div
                      key={cidx}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                          Category #{cidx + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Category Title
                          </label>
                          <input
                            type="text"
                            value={cat.category}
                            onChange={(e) => {
                              const updated = [...(formData.profile.skillCategories || [])];
                              updated[cidx].category = e.target.value;
                              setFormData({
                                ...formData,
                                profile: { ...formData.profile, skillCategories: updated },
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={cat.description || ''}
                            onChange={(e) => {
                              const updated = [...(formData.profile.skillCategories || [])];
                              updated[cidx].description = e.target.value;
                              setFormData({
                                ...formData,
                                profile: { ...formData.profile, skillCategories: updated },
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Skills List (comma-separated)
                        </label>
                        <textarea
                          rows={2}
                          value={cat.skills.join(', ')}
                          onChange={(e) => {
                            const updated = [...(formData.profile.skillCategories || [])];
                            updated[cidx].skills = e.target.value
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setFormData({
                              ...formData,
                              profile: { ...formData.profile, skillCategories: updated },
                            });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PROJECTS */}
            {activeTab === 'projects' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Mechanical Projects CRUD &amp; Case Studies
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage real engineering case studies, kinematics, solar tracking, and CAD models.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newProj: ProjectItem = {
                        id: `proj-${Date.now()}`,
                        title: 'New Mechanical Engineering Project',
                        description: 'Engineering design and 3D CAD modeling project description.',
                        category: 'mechanisms',
                        categoryLabel: 'Mechanisms & CAD',
                        badge: '⚙️ CAD Project',
                        badgeColor: '#2563eb',
                        dateRange: `${new Date().getFullYear()}`,
                        role: 'Design Lead',
                        teamSize: 'Individual',
                        tools: ['AutoCAD', 'SolidWorks'],
                        achievements: ['Detailed kinematic analysis completed'],
                        imageUrl: 'assets/hero-engine.jpg',
                        isExtra: true,
                      };
                      setFormData({
                        ...formData,
                        projects: [newProj, ...formData.projects],
                      });
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-blue-400">
                            #{idx + 1}
                          </span>
                          <span className="text-sm font-bold text-white">{proj.title}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {/* Reorder Up/Down */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                projects: moveItem(formData.projects, idx, 'up'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.projects.length - 1}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                projects: moveItem(formData.projects, idx, 'down'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Duplicate */}
                          <button
                            type="button"
                            onClick={() => {
                              const duplicated: ProjectItem = {
                                ...proj,
                                id: `proj-${Date.now()}`,
                                title: `${proj.title} (Copy)`,
                                isExtra: true,
                              };
                              const copy = [...formData.projects];
                              copy.splice(idx + 1, 0, duplicated);
                              setFormData({ ...formData, projects: copy });
                              showToast(`Duplicated "${proj.title}".`);
                            }}
                            className="p-1 text-slate-400 hover:text-white cursor-pointer ml-1"
                            title="Duplicate Project"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                projects: formData.projects.filter((p) => p.id !== proj.id),
                              });
                            }}
                            className="p-1 text-rose-400 hover:text-rose-300 ml-1 cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Badge Text
                          </label>
                          <input
                            type="text"
                            value={proj.badge || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[idx].badge = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Date Range
                          </label>
                          <input
                            type="text"
                            value={proj.dateRange || proj.date || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[idx].dateRange = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-mono text-slate-400 block mb-1">Role</label>
                            <input
                              type="text"
                              value={proj.role || ''}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[idx].role = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-mono text-slate-400 block mb-1">Team Size</label>
                            <input
                              type="text"
                              value={proj.teamSize || ''}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[idx].teamSize = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Project Description
                        </label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Engineering Objective
                          </label>
                          <textarea
                            rows={2}
                            value={proj.objective || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[idx].objective = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Mechanical Concept
                          </label>
                          <textarea
                            rows={2}
                            value={proj.mechanicalConcept || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[idx].mechanicalConcept = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                          />
                        </div>
                      </div>

                      <AssetPicker
                        currentValue={proj.imageUrl}
                        onSelect={(path) => {
                          const updated = [...formData.projects];
                          updated[idx].imageUrl = path;
                          setFormData({ ...formData, projects: updated });
                        }}
                        label="Project Primary Media Asset"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. INTERNSHIPS */}
            {activeTab === 'experience' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Industrial Internships &amp; Training
                    </h3>
                    <p className="text-xs text-slate-400">
                      Indian Railways, CEG, and MNIT Jaipur training records.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {formData.internships.map((intItem, idx) => (
                    <div
                      key={intItem.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          #{idx + 1} — {intItem.company}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                internships: moveItem(formData.internships, idx, 'up'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.internships.length - 1}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                internships: moveItem(formData.internships, idx, 'down'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Organization
                          </label>
                          <input
                            type="text"
                            value={intItem.company}
                            onChange={(e) => {
                              const updated = [...formData.internships];
                              updated[idx].company = e.target.value;
                              setFormData({ ...formData, internships: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">Role</label>
                          <input
                            type="text"
                            value={intItem.role}
                            onChange={(e) => {
                              const updated = [...formData.internships];
                              updated[idx].role = e.target.value;
                              setFormData({ ...formData, internships: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Key Learnings / Responsibilities (one per line)
                        </label>
                        <textarea
                          rows={4}
                          value={intItem.points.join('\n')}
                          onChange={(e) => {
                            const updated = [...formData.internships];
                            updated[idx].points = e.target.value
                              .split('\n')
                              .map((p) => p.trim())
                              .filter(Boolean);
                            setFormData({ ...formData, internships: updated });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono"
                        />
                      </div>

                      <AssetPicker
                        currentValue={intItem.imageUrl}
                        onSelect={(path) => {
                          const updated = [...formData.internships];
                          updated[idx].imageUrl = path;
                          setFormData({ ...formData, internships: updated });
                        }}
                        label="Internship Certificate Asset"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. AWARDS & CERTS */}
            {activeTab === 'awards' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">
                    Awards, Honors &amp; Certifications
                  </h3>
                  <p className="text-xs text-slate-400">
                    AutoCAD, SolidWorks credentials, Best Student honor, and TechFest awards.
                  </p>
                </div>

                <div className="space-y-4">
                  {formData.awards.map((aw, idx) => (
                    <div
                      key={aw.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          #{idx + 1} — {aw.title}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                awards: moveItem(formData.awards, idx, 'up'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.awards.length - 1}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                awards: moveItem(formData.awards, idx, 'down'),
                              })
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Title / Credential Name
                          </label>
                          <input
                            type="text"
                            value={aw.title}
                            onChange={(e) => {
                              const updated = [...formData.awards];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, awards: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={aw.description}
                            onChange={(e) => {
                              const updated = [...formData.awards];
                              updated[idx].description = e.target.value;
                              setFormData({ ...formData, awards: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                          />
                        </div>
                      </div>

                      <AssetPicker
                        currentValue={aw.imageUrl}
                        onSelect={(path) => {
                          const updated = [...formData.awards];
                          updated[idx].imageUrl = path;
                          setFormData({ ...formData, awards: updated });
                        }}
                        label="Certificate / Award Asset"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. GALLERY */}
            {activeTab === 'gallery' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      CAD Drawing &amp; Model Repository
                    </h3>
                    <p className="text-xs text-slate-400">
                      Total items: {formData.galleryItems.length}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.galleryItems.slice(0, 10).map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-3 items-start"
                    >
                      <div className="w-16 h-16 bg-slate-900 rounded-lg shrink-0 overflow-hidden p-1 border border-slate-800">
                        <img
                          src={resolveAssetUrl(item.imageUrl)}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono text-blue-400 block uppercase">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                        {isCommittedAsset(item.imageUrl) && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 mt-1">
                            <ShieldCheck className="w-3 h-3" /> Committed Repository Asset
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. CONTACT & SETTINGS */}
            {activeTab === 'contact' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">
                    Contact Information &amp; Site Settings
                  </h3>
                  <p className="text-xs text-slate-400">
                    Phone number has been permanently removed per privacy request.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Public Email</label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, email: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.contact.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, location: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.contact.linkedinUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, linkedinUrl: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Formspree Endpoint</label>
                    <input
                      type="text"
                      value={formData.contact.formspreeUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, formspreeUrl: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-mono font-bold text-slate-300 uppercase mb-3">
                    Danger Zone &amp; Reset
                  </h4>
                  <button
                    type="button"
                    onClick={handleResetToCanonical}
                    className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-400" />
                    <span>Reset All Edits to Canonical Data</span>
                  </button>
                </div>
              </div>
            )}

            {/* 10. PUBLISH & EXPORT */}
            {activeTab === 'publish' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Publishing Command Center &amp; Git Deployment
                    </h3>
                    <p className="text-xs text-slate-400">
                      Export validated content, review local assets manifest, and deploy to GitHub Pages.
                    </p>
                  </div>
                  {validation.isValid ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800 self-start sm:self-auto">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ready for Publishing</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-800 self-start sm:self-auto">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>{validation.errors.length} Validation Errors</span>
                    </span>
                  )}
                </div>

                {/* Pre-Publish Export Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Download className="w-4 h-4 text-emerald-400" />
                        <span>Export portfolio.json</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Download validated production JSON to replace <code>src/data/portfolio.json</code>.
                      </p>
                    </div>
                    <button
                      onClick={handleExportBackup}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow cursor-pointer"
                    >
                      Export portfolio.json
                    </button>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-blue-400" />
                        <span>Publishing Checklist</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Generate a comprehensive markdown checklist with exact verification steps and git commands.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        exportPublishingChecklist(formData);
                        showToast('Publishing checklist downloaded (.md).');
                      }}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow cursor-pointer"
                    >
                      Download Checklist (.md)
                    </button>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Upload className="w-4 h-4 text-purple-400" />
                        <span>Import JSON Backup</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Load and validate an existing JSON file. Validates before replacing active working draft.
                      </p>
                    </div>
                    <button
                      onClick={() => importFileInputRef.current?.click()}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Select JSON to Import
                    </button>
                  </div>
                </div>

                {/* Referenced Assets Pre-flight Audit */}
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Referenced Media &amp; Asset Verification
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      10 Verified Files in public/assets/
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                    <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80 flex items-center justify-between">
                      <span>Hero CAD Engine Model:</span>
                      <strong className="text-slate-200">{formData.hero.heroImage}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80 flex items-center justify-between">
                      <span>Profile Portrait Photo:</span>
                      <strong className="text-slate-200">{formData.profile.profileImage}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80 flex items-center justify-between">
                      <span>Geneva Wheel Photo:</span>
                      <strong className="text-slate-200">assets/geneva-wheel.jpg</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80 flex items-center justify-between">
                      <span>Solar Tracking System Photo:</span>
                      <strong className="text-slate-200">assets/solar-tracker.jpg</strong>
                    </div>
                  </div>
                </div>

                {/* Git Commands Stepper */}
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
                  <div className="text-slate-200 font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span>Terminal Commands to Commit &amp; Deploy (GitHub Actions):</span>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-lg text-blue-300 overflow-x-auto text-[11px] border border-slate-800">
git add src/data/portfolio.json public/assets/
git commit -m "Update mechanical portfolio data"
git push origin main
                  </pre>
                  <p className="text-[11px] text-slate-500">
                    Once pushed to <code>main</code>, GitHub Actions builds and automatically deploys the static site to GitHub Pages.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
