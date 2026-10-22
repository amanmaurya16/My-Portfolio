import React from 'react';
import {
  FolderGit2,
  GraduationCap,
  Layers,
  Briefcase,
  Award,
  Grid,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Eye,
  FileCode,
  ShieldCheck,
  ArrowRight,
  Upload,
  Info,
} from 'lucide-react';
import { PortfolioData, ValidationResult } from '../../types';
import { validatePortfolioData, getDraftMetadata } from '../../services/portfolioRepository';

interface DashboardOverviewProps {
  data: PortfolioData;
  isDraft: boolean;
  hasUnsavedEdits: boolean;
  onNavigateTab: (tabId: string) => void;
  onLaunchPreview: () => void;
  onExportJson: () => void;
  onOpenImport: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  data,
  isDraft,
  hasUnsavedEdits,
  onNavigateTab,
  onLaunchPreview,
  onExportJson,
  onOpenImport,
}) => {
  const validation: ValidationResult = validatePortfolioData(data);
  const draftMeta = getDraftMetadata();

  const totalSkills =
    (data.profile.skills?.length || 0) +
    (data.profile.skillCategories?.reduce((acc, cat) => acc + cat.skills.length, 0) || 0);

  const stats = [
    {
      id: 'projects',
      label: 'CAD & Engineering Projects',
      count: data.projects?.length || 0,
      icon: FolderGit2,
      color: 'text-blue-400',
      tab: 'projects',
    },
    {
      id: 'education',
      label: 'Academic Qualifications',
      count: data.education?.length || 0,
      icon: GraduationCap,
      color: 'text-emerald-400',
      tab: 'education',
    },
    {
      id: 'skills',
      label: 'Skills & Competencies',
      count: totalSkills,
      icon: Layers,
      color: 'text-cyan-400',
      tab: 'skills',
    },
    {
      id: 'experience',
      label: 'Industrial Internships',
      count: data.internships?.length || 0,
      icon: Briefcase,
      color: 'text-amber-400',
      tab: 'experience',
    },
    {
      id: 'awards',
      label: 'Awards & Certifications',
      count: data.awards?.length || 0,
      icon: Award,
      color: 'text-purple-400',
      tab: 'awards',
    },
    {
      id: 'gallery',
      label: 'CAD Repository Assets',
      count: data.galleryItems?.length || 0,
      icon: Grid,
      color: 'text-sky-400',
      tab: 'gallery',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome & Status Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Aman Maurya Portfolio Studio
            </span>
            <span className="text-slate-600">•</span>
            {hasUnsavedEdits ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Unsaved Edits in Buffer</span>
              </span>
            ) : isDraft ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-800">
                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                <span>Local Draft Active</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Canonical Repository Data</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Mechanical Design Portfolio Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Manage your CAD project case studies, industrial training records, verified certificates, and export production-ready JSON for static GitHub Pages deployment.
          </p>
        </div>

        {/* Quick Header Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 z-10">
          <button
            onClick={onLaunchPreview}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Live Preview</span>
          </button>
          <button
            onClick={onExportJson}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>

        {/* Subtle grid accent background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-900/10 to-transparent pointer-events-none" />
      </div>

      {/* Real Portfolio Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">
            Portfolio Records Overview
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            Calculated from active portfolio data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                onClick={() => onNavigateTab(stat.tab)}
                className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/60 rounded-xl p-5 transition-all cursor-pointer group flex items-center justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-medium font-mono">
                    {stat.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {stat.count}
                  </div>
                  <span className="text-[11px] text-blue-400 group-hover:text-blue-300 flex items-center gap-1 font-mono pt-1">
                    <span>Manage entries</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column: Validation Status & Static Publishing Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Validation Status Card */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-bold text-slate-200">
                Runtime Schema Validation
              </h4>
            </div>
            {validation.isValid ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passed (0 Errors)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{validation.errors.length} Issues Found</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            The Phase 3 repository boundary validates all required fields, array integrity, unique identifier uniqueness, and format compliance before export.
          </p>

          {!validation.isValid ? (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-3.5 space-y-2 max-h-48 overflow-y-auto">
              <span className="text-[11px] font-bold text-rose-400 uppercase font-mono block">
                Detected Validation Issues:
              </span>
              <ul className="text-xs text-rose-200 space-y-1 list-disc list-inside">
                {validation.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-3.5 text-xs text-emerald-200 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All 4 projects, education timeline, internships, and gallery schemas are 100% compliant and ready for GitHub Pages export.</span>
            </div>
          )}

          {draftMeta.exists && draftMeta.lastSaved && (
            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Last saved browser draft: {new Date(draftMeta.lastSaved).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Static Site Deployment & Git Publishing Guide */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold text-slate-200">
              Deployment &amp; Git Workflow (Static Site)
            </h4>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Because this portfolio is hosted statically on GitHub Pages, browser edits are preserved in local storage. To permanently deploy your changes to the live site:
          </p>

          <ol className="space-y-2 text-xs text-slate-300 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold shrink-0">1.</span>
              <span>Click <strong>Export JSON</strong> to download the updated data file.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold shrink-0">2.</span>
              <span>Replace <code>src/data/portfolio.json</code> in your repository folder.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold shrink-0">3.</span>
              <span>Copy any new image files into <code>public/assets/</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold shrink-0">4.</span>
              <span>Run <code>git add . &amp;&amp; git commit -m "Update portfolio" &amp;&amp; git push</code>.</span>
            </li>
          </ol>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={onOpenImport}
              className="text-xs text-blue-400 hover:text-blue-300 font-mono underline cursor-pointer"
            >
              Import existing JSON file
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              No private credentials required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
