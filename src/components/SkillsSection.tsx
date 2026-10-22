import React from 'react';
import {
  Layers,
  Compass,
  Cog,
  Wrench,
  CheckCircle2,
  FileCheck2,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { ProfileSection, SkillCategory } from '../types';
import { InlineEditableLine } from './InlineEditableLine';

interface SkillsSectionProps {
  profile: ProfileSection;
  isQuickEdit?: boolean;
  onOpenQuickEdit?: (field: string, label: string, currentVal: string, isTextarea?: boolean) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  cube: Layers,
  compass: Compass,
  cogs: Cog,
  wrench: Wrench,
};

const DEFAULT_CATEGORIES: SkillCategory[] = [
  {
    category: 'CAD Software & 3D Modeling',
    icon: 'cube',
    description: 'Parametric part design, multi-body assemblies, weldments, and feature-based modeling.',
    skills: [
      'SolidWorks (Part, Assembly & Weldments)',
      'AutoCAD (2D Drafting & 3D Modeling)',
      'Parametric Modeling & Constraints',
      'Interference & Motion Checking',
    ],
  },
  {
    category: 'Drafting & Engineering Standards',
    icon: 'compass',
    description: 'Standardized manufacturing production drawings and geometric dimensioning.',
    skills: [
      'ASME Y14.5 GD&T Standards',
      'Engineering Drawing & Orthographic Projections',
      'Sectional Views & Detail Drawings',
      'Bill of Materials (BOM) & Cut Lists',
    ],
  },
  {
    category: 'Mechanical Concepts & Mechanisms',
    icon: 'cogs',
    description: 'Kinematic mechanisms, power transmission, and functional machine elements.',
    skills: [
      'Intermittent Motion Mechanisms (Geneva Drive)',
      'Mechanical Linkages & Kinematics',
      'Machine Component Design',
      'Precision Reverse Engineering',
    ],
  },
  {
    category: 'Industrial Practice & Workshop',
    icon: 'wrench',
    description: 'Hands-on industrial maintenance, workshop technology, and manufacturing processes.',
    skills: [
      'Workshop Technology & Fitting Operations',
      'Air Brake Systems & FIBA (Indian Railways)',
      'CNC Underfloor Wheel Lathe Operation',
      'Preventive Maintenance & Inspection',
    ],
  },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  profile,
  isQuickEdit = false,
  onOpenQuickEdit,
}) => {
  const categories =
    profile.skillCategories && profile.skillCategories.length > 0
      ? profile.skillCategories
      : DEFAULT_CATEGORIES;

  return (
    <section id="technical-skills" className="relative pt-8 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2 font-mono">
            TECHNICAL COMPETENCIES
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Engineering Skills &amp; Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Documented competencies across CAD packages, ASME Y14.5 drafting standards, kinematic mechanisms, and railway mechanical maintenance.
          </p>
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, cidx) => {
          const IconComponent = CATEGORY_ICONS[cat.icon || ''] || Layers;
          return (
            <div
              key={cidx}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all tech-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      <InlineEditableLine
                        value={cat.category}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit &&
                          onOpenQuickEdit(
                            `profile.skillCategories.${cidx}.category`,
                            'Category Name',
                            cat.category
                          )
                        }
                      />
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {cat.skills.length} Documented Areas
                    </p>
                  </div>
                </div>

                {cat.description && (
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    <InlineEditableLine
                      value={cat.description}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit &&
                        onOpenQuickEdit(
                          `profile.skillCategories.${cidx}.description`,
                          'Category Description',
                          cat.description || '',
                          true
                        )
                      }
                    />
                  </p>
                )}

                <ul className="space-y-2.5 list-none">
                  {cat.skills.map((skill, sidx) => (
                    <li
                      key={sidx}
                      className="bg-slate-50 border border-slate-200/80 hover:bg-blue-50/40 hover:border-blue-300 p-2.5 rounded-lg text-xs sm:text-sm text-slate-800 font-semibold flex items-center gap-2.5 transition font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">
                        <InlineEditableLine
                          value={skill}
                          isEditable={isQuickEdit}
                          onEdit={() =>
                            onOpenQuickEdit &&
                            onOpenQuickEdit(
                              `profile.skillCategories.${cidx}.skills.${sidx}`,
                              `Skill Item #${sidx + 1}`,
                              skill
                            )
                          }
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified via Academic Coursework / Certifications</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
