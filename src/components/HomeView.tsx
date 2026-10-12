import React, { useState } from 'react';
import {
  Calendar,
  User,
  Users,
  ChevronDown,
  CheckCircle2,
  X,
  Plus,
  Copy,
  Trash2,
} from 'lucide-react';
import { PortfolioData, ProjectItem, ExpertiseItem } from '../types';
import { InlineEditableLine } from './InlineEditableLine';
import { HomeImageUploader } from './HomeImageUploader';

interface HomeViewProps {
  data: PortfolioData;
  isAdmin: boolean;
  isQuickEdit: boolean;
  onOpenQuickEdit: (field: string, label: string, currentVal: string, isTextarea?: boolean) => void;
  onUpdateData: (newData: PortfolioData) => void;
  onNavigateTab: (tab: string) => void;
  onOpenContact: () => void;
  onOpenEnquiry: () => void;
  onOpenVideoModal: (url: string, title?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  data,
  isAdmin,
  isQuickEdit,
  onOpenQuickEdit,
  onUpdateData,
  onNavigateTab,
  onOpenContact,
  onOpenEnquiry,
  onOpenVideoModal,
}) => {
  const { hero, expertise, projects, homeSections } = data;
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleHeroImageChange = (newUrl: string) => {
    onUpdateData({
      ...data,
      hero: { ...data.hero, heroImage: newUrl },
    });
    showToast('Hero image updated successfully!');
  };

  const handleProjectImageChange = (projectId: string, newUrl: string) => {
    onUpdateData({
      ...data,
      projects: data.projects.map((p) => (p.id === projectId ? { ...p, imageUrl: newUrl } : p)),
    });
    showToast('Project image updated successfully!');
  };

  const handleAddHighlight = () => {
    const current = hero.highlights || [
      '⚡ SolidWorks (Part, Assembly & Weldments)',
      '📐 ASME Y14.5 GD&T Standards',
      '🎓 CIPET IPT Jaipur (B.Tech 3rd Yr)',
      '🛠️ Precision Reverse Engineering',
    ];
    onUpdateData({
      ...data,
      hero: {
        ...hero,
        highlights: [...current, '⭐ New Engineering Highlight'],
      },
    });
    showToast('New highlight tag added!');
  };

  const handleRemoveHighlight = (idx: number) => {
    const current = [...(hero.highlights || [])];
    current.splice(idx, 1);
    onUpdateData({
      ...data,
      hero: {
        ...hero,
        highlights: current,
      },
    });
    showToast('Highlight tag removed!');
  };

  const heroBioText =
    hero.bio ||
    hero.description ||
    'Mechanical Engineering student with hands-on experience in CAD design and machine mechanisms. Skilled in AutoCAD and SolidWorks, with practical exposure to drafting, 3D modeling, and mechanism development. Seeking a Mechanical Design Job to apply engineering fundamentals and contribute to real-world product development.';

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 2);

  return (
    <div className="w-full relative bg-white text-slate-900">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-500/50 flex items-center gap-2.5 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="hero bg-white border-b border-slate-200 py-12 sm:py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Bio, Titles, Highlights, and CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2 sm:mb-3">
                  <InlineEditableLine
                    value={hero.name || 'Aman Maurya'}
                    isEditable={isQuickEdit}
                    onEdit={() => onOpenQuickEdit('hero.name', 'Your Name', hero.name || 'Aman Maurya')}
                  />
                </h1>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 tracking-wide mb-3 sm:mb-4">
                  <InlineEditableLine
                    value={hero.title || 'Mechanical Design Engineer'}
                    isEditable={isQuickEdit}
                    onEdit={() => onOpenQuickEdit('hero.title', 'Job Title', hero.title || 'Mechanical Design Engineer')}
                  />
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify max-w-2xl">
                <InlineEditableLine
                  value={heroBioText}
                  isEditable={isQuickEdit}
                  onEdit={() => onOpenQuickEdit('hero.bio', 'Hero Biography', heroBioText, true)}
                />
              </p>

              {/* Highlights Chips */}
              <div className="pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    hero.highlights || [
                      '⚡ SolidWorks (Part, Assembly & Weldments)',
                      '📐 ASME Y14.5 GD&T Standards',
                      '🎓 CIPET IPT Jaipur (B.Tech 3rd Yr)',
                      '🛠️ Precision Reverse Engineering',
                    ]
                  ).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200 shadow-2xs hover:border-blue-400 transition-all group"
                    >
                      <InlineEditableLine
                        value={highlight}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit(`hero.highlights.${idx}`, `Highlight #${idx + 1}`, highlight)
                        }
                      />
                      {isQuickEdit && (
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          className="opacity-60 hover:opacity-100 hover:text-rose-600 p-0.5 rounded cursor-pointer ml-1"
                          title="Delete this highlight tag"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {isQuickEdit && (
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                      title="Add a new highlight tag line"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Add Tag</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 w-full sm:w-auto">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('projects');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onNavigateTab('gallery');
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
                  id="hero-projects-btn"
                >
                  <i className="fas fa-project-diagram"></i>
                  <span>
                    <InlineEditableLine
                      value={hero.primaryBtnText || 'Projects Work'}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit('hero.primaryBtnText', 'Primary Button Text', hero.primaryBtnText || 'Projects Work')
                      }
                    />
                  </span>
                </a>

                {data.settings?.resumeUrl ? (
                  <a
                    href={data.settings.resumeUrl}
                    download="Aman_Maurya_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-600 font-bold text-sm sm:text-base rounded-xl border-2 border-blue-600 hover:border-blue-700 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer w-full sm:w-auto"
                    id="hero-resume-btn"
                    title="Download Aman's Resume PDF"
                  >
                    <i className="fas fa-download text-blue-600"></i>
                    <span>
                      <InlineEditableLine
                        value={hero.secondaryBtnText || 'Download Resume'}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit('hero.secondaryBtnText', 'Secondary Button Text', hero.secondaryBtnText || 'Download Resume')
                        }
                      />
                    </span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTab('resume');
                      setTimeout(() => window.print(), 400);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-600 font-bold text-sm sm:text-base rounded-xl border-2 border-blue-600 hover:border-blue-700 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer w-full sm:w-auto"
                    id="hero-resume-btn"
                    title="Download Resume"
                  >
                    <i className="fas fa-download text-blue-600"></i>
                    <span>
                      <InlineEditableLine
                        value={hero.secondaryBtnText || 'Download Resume'}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit('hero.secondaryBtnText', 'Secondary Button Text', hero.secondaryBtnText || 'Download Resume')
                        }
                      />
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: 3D CAD Engine Model Image */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-md bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-sm relative group">
                <img
                  src={hero.heroImage || '/assets/hero-engine.jpg'}
                  alt={hero.name || 'Aman Maurya CAD Model'}
                  className="w-full h-auto max-h-[380px] object-contain mx-auto rounded-xl bg-white p-2"
                />

                {isQuickEdit && (
                  <div className="absolute top-4 right-4 z-20">
                    <HomeImageUploader
                      currentUrl={hero.heroImage || '/assets/hero-engine.jpg'}
                      onSaveUrl={handleHeroImageChange}
                      label="Change Hero Image"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE EXPERTISE SECTION */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
                <InlineEditableLine
                  value={homeSections?.expertiseBadge || 'CORE EXPERTISE'}
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit('homeSections.expertiseBadge', 'Expertise Badge', homeSections?.expertiseBadge || 'CORE EXPERTISE')
                  }
                />
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                <InlineEditableLine
                  value={homeSections?.expertiseTitle || 'Mechanical Design & Engineering'}
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit('homeSections.expertiseTitle', 'Expertise Title', homeSections?.expertiseTitle || 'Mechanical Design & Engineering')
                  }
                />
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                <InlineEditableLine
                  value={
                    homeSections?.expertiseSubtitle ||
                    'Precision drafting, 3D parametric modeling, and manufacturing standards'
                  }
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit(
                      'homeSections.expertiseSubtitle',
                      'Expertise Subtitle',
                      homeSections?.expertiseSubtitle ||
                        'Precision drafting, 3D parametric modeling, and manufacturing standards'
                    )
                  }
                />
              </p>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(expertise && expertise.length > 0
              ? expertise
              : [
                  {
                    id: 'exp-1',
                    number: '01',
                    title: 'CAD Design',
                    description:
                      '2D drafting and 3D mechanical design using AutoCAD and SolidWorks, with focus on accurate engineering drawings and practical design solutions.',
                    icon: 'cube',
                  },
                  {
                    id: 'exp-2',
                    number: '02',
                    title: '3D Modelling',
                    description:
                      'Creation of detailed 3D parts, components and assemblies with proper dimensions, constraints and engineering design considerations.',
                    icon: 'cubes',
                  },
                  {
                    id: 'exp-3',
                    number: '03',
                    title: 'Machine Design',
                    description:
                      'Design and development of machine components and mechanisms with focus on strength, functionality, reliability and manufacturability.',
                    icon: 'cogs',
                  },
                  {
                    id: 'exp-4',
                    number: '04',
                    title: 'Product Design',
                    description:
                      'Practical product development from concept to 3D model, focusing on functionality, ease of manufacturing and real-world engineering requirements.',
                    icon: 'lightbulb',
                  },
                ]
            ).map((exp) => (
              <div
                key={exp.id}
                className="expertise-card card bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-blue-600 tracking-wider">
                      <InlineEditableLine
                        value={exp.number}
                        isEditable={isQuickEdit}
                        onEdit={() => onOpenQuickEdit(`exp.${exp.id}.number`, 'Card Number', exp.number)}
                      />
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <i className={`fas fa-${exp.icon || 'cube'} text-sm`}></i>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        <InlineEditableLine
                          value={exp.title}
                          isEditable={isQuickEdit}
                          onEdit={() => onOpenQuickEdit(`exp.${exp.id}.title`, 'Card Title', exp.title)}
                        />
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed text-justify mt-2">
                    <InlineEditableLine
                      value={exp.description}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit(`exp.${exp.id}.description`, 'Description', exp.description, true)
                      }
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING PROJECTS SECTION */}
      <section id="projects" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
                <InlineEditableLine
                  value={homeSections?.projectsBadge || 'PROJECT SHOWCASE'}
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit('homeSections.projectsBadge', 'Projects Eyebrow', homeSections?.projectsBadge || 'PROJECT SHOWCASE')
                  }
                />
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 uppercase tracking-tight">
                <InlineEditableLine
                  value={homeSections?.projectsTitle || 'ENGINEERING PROJECTS'}
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit('homeSections.projectsTitle', 'Projects Main Heading', homeSections?.projectsTitle || 'ENGINEERING PROJECTS')
                  }
                />
              </h2>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visibleProjects.map((proj, pidx) => (
              <article
                key={proj.id}
                className="project-card card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all group flex flex-col justify-between relative"
              >
                <div>
                  {/* Image Header Area */}
                  <div className="relative h-56 sm:h-72 bg-slate-50 overflow-hidden border-b border-slate-200">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-contain p-3 sm:p-4 bg-white group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                      <span
                        className="text-xs font-bold text-white px-3 py-1 rounded-full shadow-sm tracking-wide uppercase flex items-center gap-1"
                        style={{ backgroundColor: proj.badgeColor || '#2563eb' }}
                      >
                        <InlineEditableLine
                          value={proj.badge || (pidx === 0 ? '⚡ Motion Control' : '🌱 Green Tech')}
                          isEditable={isQuickEdit}
                          onEdit={() =>
                            onOpenQuickEdit(`project.${proj.id}.badge`, 'Project Badge', proj.badge || 'Project')
                          }
                        />
                      </span>
                    </div>

                    {isQuickEdit && (
                      <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
                        <HomeImageUploader
                          currentUrl={proj.imageUrl}
                          onSaveUrl={(url) => handleProjectImageChange(proj.id, url)}
                          label="Change Image"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const currentVideo = proj.videoUrl || '';
                            const newVideo = prompt('Enter Project Demo Video URL (MP4, YouTube, or Video Link):', currentVideo);
                            if (newVideo !== null) {
                              onUpdateData({
                                ...data,
                                projects: data.projects.map((p) => (p.id === proj.id ? { ...p, videoUrl: newVideo } : p)),
                              });
                              showToast('Project video updated successfully!');
                            }
                          }}
                          className="px-2.5 py-1.5 bg-slate-900/95 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer"
                          title="Add or Update Project Video"
                        >
                          <span>🎬 Video</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6 md:p-7 space-y-4">
                    {/* Meta Row: Date, Role, Team Size */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          <InlineEditableLine
                            value={proj.dateRange || proj.date || 'Jan 2026 - Apr 2026'}
                            isEditable={isQuickEdit}
                            onEdit={() =>
                              onOpenQuickEdit(`project.${proj.id}.dateRange`, 'Date Range', proj.dateRange || 'Jan 2026 - Apr 2026')
                            }
                          />
                        </span>
                      </span>

                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          <InlineEditableLine
                            value={proj.role || (pidx === 0 ? 'Team Lead' : 'CAD Modeler')}
                            isEditable={isQuickEdit}
                            onEdit={() =>
                              onOpenQuickEdit(`project.${proj.id}.role`, 'Role', proj.role || 'Team Lead')
                            }
                          />
                        </span>
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          <InlineEditableLine
                            value={proj.teamSize || (pidx === 0 ? '4 Members' : '3 Members')}
                            isEditable={isQuickEdit}
                            onEdit={() =>
                              onOpenQuickEdit(`project.${proj.id}.teamSize`, 'Team Size', proj.teamSize || '4 Members')
                            }
                          />
                        </span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      <InlineEditableLine
                        value={proj.title}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit(`project.${proj.id}.title`, 'Project Title', proj.title)
                        }
                      />
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed text-justify">
                      <InlineEditableLine
                        value={proj.description}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit(`project.${proj.id}.description`, 'Project Description', proj.description, true)
                        }
                      />
                    </p>

                    {/* Tools & CAD Packages */}
                    <div className="pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        TOOLS &amp; CAD PACKAGES:
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {(proj.tools && proj.tools.length > 0
                          ? proj.tools
                          : ['AutoCAD', 'SolidWorks', 'MATLAB']
                        ).map((tool: string, tidx: number) => (
                          <span
                            key={tidx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-semibold border border-slate-200"
                          >
                            <i className="fas fa-cube text-blue-600 text-[11px]"></i>
                            <span>{tool}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements / Highlights */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        KEY ACHIEVEMENTS / HIGHLIGHTS:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(proj.achievements && proj.achievements.length > 0
                          ? proj.achievements
                          : [
                              '• Designed 6-slot Geneva wheel and driving crank pin',
                              '• Prepared 2D production drawings with ASME Y14.5 GD&T',
                            ]
                        ).map((ach: string, aidx: number) => (
                          <span
                            key={aidx}
                            className="inline-flex items-center gap-1.5 text-xs bg-blue-50/70 text-slate-800 px-2.5 py-1 rounded-md font-medium border border-blue-100"
                          >
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{ach.replace(/^•\s*/, '')}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="px-4 sm:px-7 pb-5 sm:pb-6 pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
                  {proj.videoUrl ? (
                    <button
                      type="button"
                      onClick={() => onOpenVideoModal(proj.videoUrl!, proj.title)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:translate-x-1 transition-all cursor-pointer"
                    >
                      <span>{proj.videoBtnText || 'View Project Video →'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigateTab('gallery')}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:translate-x-1 transition-all cursor-pointer"
                    >
                      <span>View Project Details →</span>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* View More / View Less Button */}
          {projects.length > 2 && (
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => {
                  if (showAllProjects) {
                    setShowAllProjects(false);
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setShowAllProjects(true);
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                id="toggle-projects-btn"
              >
                <span>{showAllProjects ? 'View Less' : 'View More'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showAllProjects ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border-t border-blue-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 bg-blue-500/30 text-blue-200 border border-blue-400/40 rounded-full text-xs font-bold tracking-widest uppercase mb-1">
                <InlineEditableLine
                  value={homeSections?.ctaBadge || 'HAVE A DESIGN CHALLENGE IN MIND?'}
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit(
                      'homeSections.ctaBadge',
                      'CTA Eyebrow',
                      homeSections?.ctaBadge || 'HAVE A DESIGN CHALLENGE IN MIND?'
                    )
                  }
                />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold leading-tight max-w-2xl text-white">
                <InlineEditableLine
                  value={
                    homeSections?.ctaTitle ||
                    "Let's turn your idea into a practical engineering solution."
                  }
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit(
                      'homeSections.ctaTitle',
                      'CTA Heading',
                      homeSections?.ctaTitle ||
                        "Let's turn your idea into a practical engineering solution."
                    )
                  }
                />
              </h2>

              <p className="text-sm sm:text-base text-blue-200 max-w-xl">
                <InlineEditableLine
                  value={
                    homeSections?.ctaSubtitle ||
                    'Available for freelance CAD design, mechanism prototyping, and full-time engineering roles.'
                  }
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit(
                      'homeSections.ctaSubtitle',
                      'CTA Subtitle',
                      homeSections?.ctaSubtitle ||
                        'Available for freelance CAD design, mechanism prototyping, and full-time engineering roles.'
                    )
                  }
                />
              </p>
            </div>

            <div className="w-full sm:w-auto flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-blue-950 font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all hover:-translate-y-1 shrink-0 cursor-pointer flex items-center justify-center text-center font-bold"
                id="cta-enquiry-btn"
              >
                <span>{homeSections?.ctaBtnText || 'Send Your Enquiry'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
