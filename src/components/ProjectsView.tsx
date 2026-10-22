import React, { useState, useMemo } from 'react';
import {
  Calendar,
  User,
  Users,
  Layers,
  ArrowRight,
  ExternalLink,
  Filter,
  CheckCircle2,
  X,
  Eye,
  Maximize2,
  Cpu,
  Cog,
  Wrench,
  Award,
} from 'lucide-react';
import { ProjectItem, PortfolioData } from '../types';
import { InlineEditableLine } from './InlineEditableLine';
import { HomeImageUploader } from './HomeImageUploader';
import { resolveAssetUrl } from '../services/localAssetManager';

interface ProjectsViewProps {
  data: PortfolioData;
  isAdmin?: boolean;
  isQuickEdit?: boolean;
  onOpenQuickEdit?: (field: string, label: string, currentVal: string, isTextarea?: boolean) => void;
  onUpdateData?: (newData: PortfolioData) => void;
  onNavigateTab: (tab: string) => void;
  onOpenContact: () => void;
  onOpenEnquiry: () => void;
  onOpenVideoModal?: (url: string, title?: string) => void;
}

const CATEGORY_MAP: Record<string, string> = {
  all: 'All Engineering Projects',
  mechanisms: 'Mechanisms & Kinematics',
  automation: 'Renewable & Automation',
  components: 'Precision Components',
  assemblies: 'Assemblies & Systems',
};

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  data,
  isAdmin = false,
  isQuickEdit = false,
  onOpenQuickEdit,
  onUpdateData,
  onNavigateTab,
  onOpenContact,
  onOpenEnquiry,
}) => {
  const { projects } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const handleProjectImageChange = (projId: string, newUrl: string) => {
    if (onUpdateData) {
      onUpdateData({
        ...data,
        projects: projects.map((p) => (p.id === projId ? { ...p, imageUrl: newUrl } : p)),
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 bg-white text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase font-mono">
            ENGINEERING CASE STUDIES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-1 tracking-tight">
            Mechanical Design Projects
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Detailed engineering projects featuring kinematic mechanism design, automated solar orientation, precision 3D CAD modeling, and multi-body assembly analysis.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => onNavigateTab('gallery')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>View in CAD Gallery</span>
          </button>
          <button
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer"
          >
            <span>Project Discussion</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {CATEGORY_MAP[cat] || cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((proj, pidx) => (
          <article
            key={proj.id}
            className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all tech-card flex flex-col justify-between group"
          >
            <div>
              {/* Media Preview */}
              <div className="relative h-64 sm:h-72 bg-slate-950 overflow-hidden border-b border-slate-200">
                <img
                  src={resolveAssetUrl(proj.imageUrl)}
                  alt={proj.title}
                  className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Badge */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                  <span
                    className="text-xs font-bold text-white px-3 py-1 rounded-full shadow-sm tracking-wide uppercase flex items-center gap-1"
                    style={{ backgroundColor: proj.badgeColor || '#2563eb' }}
                  >
                    <InlineEditableLine
                      value={proj.badge || proj.categoryLabel || 'Mechanical Design'}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit &&
                        onOpenQuickEdit(`project.${proj.id}.badge`, 'Badge', proj.badge || '')
                      }
                    />
                  </span>
                </div>

                {/* Zoom button */}
                <button
                  type="button"
                  onClick={() => setZoomImage(proj.imageUrl)}
                  className="absolute bottom-3.5 right-3.5 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                  title="Zoom Image"
                  aria-label="Inspect Full Size Media"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {isQuickEdit && onUpdateData && (
                  <div className="absolute top-3.5 right-3.5 z-20">
                    <HomeImageUploader
                      currentUrl={proj.imageUrl}
                      onSaveUrl={(url) => handleProjectImageChange(proj.id, url)}
                      label="Change Image"
                    />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-4">
                {/* Meta Details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-mono font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>
                      <InlineEditableLine
                        value={proj.dateRange || proj.date || ''}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit &&
                          onOpenQuickEdit(`project.${proj.id}.dateRange`, 'Date Range', proj.dateRange || '')
                        }
                      />
                    </span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>
                      <InlineEditableLine
                        value={proj.role || 'Contributor'}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit &&
                          onOpenQuickEdit(`project.${proj.id}.role`, 'Role', proj.role || '')
                        }
                      />
                    </span>
                  </span>

                  {proj.teamSize && (
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>
                        <InlineEditableLine
                          value={proj.teamSize}
                          isEditable={isQuickEdit}
                          onEdit={() =>
                            onOpenQuickEdit &&
                            onOpenQuickEdit(`project.${proj.id}.teamSize`, 'Team Size', proj.teamSize || '')
                          }
                        />
                      </span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  <InlineEditableLine
                    value={proj.title}
                    isEditable={isQuickEdit}
                    onEdit={() =>
                      onOpenQuickEdit &&
                      onOpenQuickEdit(`project.${proj.id}.title`, 'Project Title', proj.title)
                    }
                  />
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                  <InlineEditableLine
                    value={proj.description}
                    isEditable={isQuickEdit}
                    onEdit={() =>
                      onOpenQuickEdit &&
                      onOpenQuickEdit(
                        `project.${proj.id}.description`,
                        'Project Description',
                        proj.description,
                        true
                      )
                    }
                  />
                </p>

                {/* Objective */}
                {proj.objective && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700">
                    <strong className="text-blue-700 block mb-0.5 font-mono uppercase text-[10px] tracking-wider">
                      Engineering Objective:
                    </strong>
                    <span>{proj.objective}</span>
                  </div>
                )}

                {/* Tools */}
                <div className="pt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    CAD &amp; ENGINEERING TOOLS:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tools.map((tool, tidx) => (
                      <span
                        key={tidx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-semibold font-mono"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span>{tool}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                {proj.achievements && proj.achievements.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                      DOCUMENTED OUTCOMES:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {proj.achievements.map((ach, aidx) => (
                        <span
                          key={aidx}
                          className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-slate-800 px-2.5 py-1 rounded-md font-medium border border-blue-100"
                        >
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{ach.replace(/^•\s*/, '')}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedProject(proj)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
              >
                <span>View Full Engineering Case Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoomImage(proj.imageUrl)}
                className="text-xs text-slate-500 hover:text-slate-800 font-mono flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Media</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Case Details Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-900"
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold text-white px-2.5 py-0.5 rounded-full uppercase font-mono"
                  style={{ backgroundColor: selectedProject.badgeColor || '#2563eb' }}
                >
                  {selectedProject.badge || 'Engineering Case'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedProject.dateRange || selectedProject.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                aria-label="Close Case Details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Banner */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center border-b border-slate-200 p-4">
              <img
                src={resolveAssetUrl(selectedProject.imageUrl)}
                alt={selectedProject.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500 font-mono">
                  <span>Role: <strong className="text-slate-800">{selectedProject.role}</strong></span>
                  {selectedProject.teamSize && (
                    <span>Team: <strong className="text-slate-800">{selectedProject.teamSize}</strong></span>
                  )}
                  <span>Category: <strong className="text-slate-800">{CATEGORY_MAP[selectedProject.category || ''] || selectedProject.category}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                  Executive Summary
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {selectedProject.description}
                </p>
              </div>

              {/* Objective */}
              {selectedProject.objective && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                    Engineering Objective
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    {selectedProject.objective}
                  </p>
                </div>
              )}

              {/* Mechanical Concept */}
              {selectedProject.mechanicalConcept && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                    Mechanical Concept &amp; Working Principle
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                    {selectedProject.mechanicalConcept}
                  </p>
                </div>
              )}

              {/* Tools & CAD Packages */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                  Tools &amp; CAD Packages Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-semibold text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcomes & Achievements */}
              {(selectedProject.outcomes || selectedProject.achievements) && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                    Documented Results &amp; Verification
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                    {(selectedProject.outcomes || selectedProject.achievements).map((out, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {out.replace(/^•\s*/, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Back to Projects List
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenEnquiry();
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer"
                >
                  Enquire About This Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Lightbox */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white rounded-lg bg-black/60 transition cursor-pointer"
              aria-label="Close Zoom View"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 flex items-center justify-center aspect-video bg-black">
              <img
                src={resolveAssetUrl(zoomImage)}
                alt="Enlarged Project Media"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
