import React, { useState } from 'react';
import {
  X,
  Save,
  Trash2,
  Plus,
  Upload,
  User,
  FolderGit2,
  Grid,
  GraduationCap,
  Mail,
  Settings as SettingsIcon,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Cloud,
} from 'lucide-react';
import { PortfolioData, ProjectItem, GalleryItem, EducationItem, InternshipItem, EnquiryItem } from '../types';
import { uploadPortfolioImage } from '../utils/imageUpload';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  enquiries: EnquiryItem[];
  onDeleteEnquiry: (id: string) => void;
  onResetData: () => void;
  onExportBackup: () => void;
  isFirestoreSyncActive?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  enquiries,
  onDeleteEnquiry,
  onResetData,
  onExportBackup,
  isFirestoreSyncActive,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'gallery' | 'experience' | 'contact' | 'enquiries' | 'settings'>('profile');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [savedNotification, setSavedNotification] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveAll = () => {
    onUpdateData(formData);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleImageUpload = async (fieldPath: string, file: File) => {
    setUploadingField(fieldPath);
    try {
      const url = await uploadPortfolioImage(file);
      if (fieldPath === 'hero.heroImage') {
        setFormData({ ...formData, hero: { ...formData.hero, heroImage: url } });
      } else if (fieldPath === 'profile.profileImage') {
        setFormData({ ...formData, profile: { ...formData.profile, profileImage: url } });
      }
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploadingField(null);
    }
  };

  // Projects CRUD
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Mechanical CAD Project',
      category: 'Mechanism Design',
      software: 'SolidWorks',
      date: new Date().getFullYear().toString(),
      description: 'Parametric 3D part and assembly modeling with engineering drawings.',
      keyFeatures: ['Geometric dimensioning and tolerancing (GD&T)', 'Interference detection'],
      imageUrl: formData.hero.heroImage,
    };
    setFormData({
      ...formData,
      projects: [newProj, ...formData.projects],
    });
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setFormData({
        ...formData,
        projects: formData.projects.filter((p) => p.id !== id),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm">
              AM
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">
                Aman Maurya — Portfolio CMS Dashboard
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {isFirestoreSyncActive ? 'Firebase Sync Active' : 'Local + Firestore Ready'}
                </span>
                <span>•</span>
                <span>amanmauryaji16@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save &amp; Publish</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {savedNotification && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2 shrink-0 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Portfolio content published and saved to Firestore &amp; LocalStorage successfully!</span>
          </div>
        )}

        {/* Dashboard Body with Left Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-48 sm:w-56 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-3 space-y-1 overflow-y-auto shrink-0">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile &amp; Hero</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects ({formData.projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Gallery ({formData.galleryItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-colors ${
                activeTab === 'experience'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Internships &amp; Edu</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-colors ${
                activeTab === 'contact'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact &amp; Links</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-colors ${
                activeTab === 'enquiries'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquiries ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings &amp; Backup</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            {activeTab === 'profile' && (
              <div className="max-w-3xl space-y-6">
                <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                  Hero Section &amp; Personal Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.hero.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, name: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Hero Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.hero.tagline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, tagline: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={formData.hero.headline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, headline: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hero Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.hero.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, description: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Hero CAD Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.hero.heroImage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, heroImage: e.target.value },
                          })
                        }
                        className="flex-1 text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                      />
                      <label className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer text-xs font-bold flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5 text-blue-600" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleImageUpload('hero.heroImage', f);
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Profile Photo URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.profile.profileImage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, profileImage: e.target.value },
                          })
                        }
                        className="flex-1 text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                      />
                      <label className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer text-xs font-bold flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5 text-blue-600" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleImageUpload('profile.profileImage', f);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Bio (Paragraph 1)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.profile.bio1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, bio1: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className="text-lg font-bold">Featured Projects</h3>
                  <button
                    onClick={handleAddProject}
                    className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.projects.map((proj, pidx) => (
                    <div
                      key={proj.id}
                      className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-600">
                          Project #{pidx + 1}
                        </span>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold mb-1">Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pidx] = { ...proj, title: e.target.value };
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pidx] = { ...proj, category: e.target.value };
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">CAD Software</label>
                          <input
                            type="text"
                            value={proj.software}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pidx] = { ...proj, software: e.target.value };
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[pidx] = { ...proj, description: e.target.value };
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold mb-1">Image URL</label>
                          <input
                            type="text"
                            value={proj.imageUrl}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pidx] = { ...proj, imageUrl: e.target.value };
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">Video Animation URL (Optional)</label>
                          <input
                            type="text"
                            value={proj.videoUrl || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pidx] = { ...proj, videoUrl: e.target.value };
                              setFormData({ ...formData, projects: updated });
                            }}
                            placeholder="https://..."
                            className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className="text-lg font-bold">CAD Design Gallery ({formData.galleryItems.length} items)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.galleryItems.map((item, gidx) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2"
                    >
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...formData.galleryItems];
                          updated[gidx] = { ...item, title: e.target.value };
                          setFormData({ ...formData, galleryItems: updated });
                        }}
                        className="w-full text-xs font-bold px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"
                      />
                      <div className="flex justify-between items-center text-[11px] text-slate-500">
                        <span>{item.software}</span>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this gallery item?')) {
                              setFormData({
                                ...formData,
                                galleryItems: formData.galleryItems.filter((g) => g.id !== item.id),
                              });
                            }
                          }}
                          className="text-rose-500 hover:text-rose-700 font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-3">
                  Internships &amp; Academic Credentials
                </h3>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-blue-600">Internship Experiences</h4>
                  {formData.internships.map((intn, iidx) => (
                    <div
                      key={intn.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={intn.role}
                          onChange={(e) => {
                            const updated = [...formData.internships];
                            updated[iidx] = { ...intn, role: e.target.value };
                            setFormData({ ...formData, internships: updated });
                          }}
                          className="text-xs font-bold px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"
                        />
                        <input
                          type="text"
                          value={intn.company}
                          onChange={(e) => {
                            const updated = [...formData.internships];
                            updated[iidx] = { ...intn, company: e.target.value };
                            setFormData({ ...formData, internships: updated });
                          }}
                          className="text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={intn.description}
                        onChange={(e) => {
                          const updated = [...formData.internships];
                          updated[iidx] = { ...intn, description: e.target.value };
                          setFormData({ ...formData, internships: updated });
                        }}
                        className="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="max-w-2xl space-y-4">
                <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-3">
                  Contact Information &amp; Social Links
                </h3>

                <div>
                  <label className="block text-xs font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.contact.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value, phoneDisplay: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.contact.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, location: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.contact.linkedinUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, linkedinUrl: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Formspree Endpoint URL</label>
                  <input
                    type="url"
                    value={formData.contact.formspreeUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, formspreeUrl: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Direct PDF Resume URL</label>
                  <input
                    type="url"
                    value={formData.settings.resumeUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        settings: { ...formData.settings, resumeUrl: e.target.value },
                      })
                    }
                    placeholder="https://.../resume.pdf"
                    className="w-full text-xs px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    Upload Resume File (PDF / DOC)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-2 shadow transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose PDF File</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const result = event.target?.result as string;
                              if (result) {
                                setFormData({
                                  ...formData,
                                  settings: { ...formData.settings, resumeUrl: result },
                                });
                                alert('Resume file uploaded successfully! Click "Save & Publish" to persist.');
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    {formData.settings.resumeUrl ? (
                      <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Resume Uploaded &amp; Ready</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">No custom file uploaded yet</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'enquiries' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-3">
                  Visitor Enquiries &amp; Messages ({enquiries.length})
                </h3>

                {enquiries.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No visitor enquiries yet. Messages submitted via the contact or enquiry modal will show here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold">{enq.name} ({enq.email})</h4>
                          <button
                            onClick={() => onDeleteEnquiry(enq.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-bold"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{enq.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl space-y-6">
                <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-3">
                  System Settings &amp; Data Backup
                </h3>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Export Portfolio Backup
                  </h4>
                  <p className="text-xs text-slate-500">
                    Download the entire portfolio content as a single JSON file. You can commit this back to your GitHub repository or restore it anytime.
                  </p>
                  <button
                    onClick={onExportBackup}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase text-rose-700 dark:text-rose-300">
                    Reset Portfolio to Defaults
                  </h4>
                  <p className="text-xs text-slate-500">
                    Revert all changes back to initial engineering data from Aman Maurya's original portfolio.
                  </p>
                  <button
                    onClick={onResetData}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
