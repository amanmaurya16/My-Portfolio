import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  CheckCircle2,
  X,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Clock,
  ExternalLink,
  Eye,
  Maximize2,
  FileCheck,
  Trophy,
} from 'lucide-react';
import { PortfolioData, EducationItem, InternshipItem, AwardItem } from '../types';
import { InlineEditableLine } from './InlineEditableLine';
import { HomeImageUploader } from './HomeImageUploader';
import { SkillsSection } from './SkillsSection';
import { resolveAssetUrl } from '../services/localAssetManager';

interface AboutViewProps {
  data: PortfolioData;
  isAdmin?: boolean;
  isQuickEdit?: boolean;
  onOpenQuickEdit?: (field: string, label: string, currentVal: string, isTextarea?: boolean) => void;
  onUpdateData?: (newData: PortfolioData) => void;
  onNavigateTab: (tab: string) => void;
  onOpenContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  data,
  isAdmin = false,
  isQuickEdit = false,
  onOpenQuickEdit,
  onUpdateData,
  onNavigateTab,
  onOpenContact,
}) => {
  const { profile, hero, education, internships, awards } = data;
  const [showAllHonors, setShowAllHonors] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [zoomCertificate, setZoomCertificate] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    if (!zoomCertificate) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomCertificate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomCertificate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProfileImageChange = (newUrl: string) => {
    if (onUpdateData) {
      onUpdateData({
        ...data,
        profile: { ...profile, profileImage: newUrl },
      });
      showToast('Profile photo asset updated!');
    }
  };

  const handleInternshipImageChange = (intId: string, newUrl: string) => {
    if (onUpdateData) {
      onUpdateData({
        ...data,
        internships: internships.map((i) => (i.id === intId ? { ...i, imageUrl: newUrl } : i)),
      });
      showToast('Internship certificate asset updated!');
    }
  };

  const handleAwardImageChange = (awardId: string, newUrl: string) => {
    if (onUpdateData) {
      onUpdateData({
        ...data,
        awards: awards.map((a) => (a.id === awardId ? { ...a, imageUrl: newUrl } : a)),
      });
      showToast('Award certificate asset updated!');
    }
  };

  // Split into Certifications vs Honors & Awards
  const certifications = awards.filter(
    (a) => a.id === 'award-1' || a.id === 'award-2' || a.title.toLowerCase().includes('certificat')
  );
  const honors = awards.filter(
    (a) => a.id !== 'award-1' && a.id !== 'award-2' && !a.title.toLowerCase().includes('certificat')
  );
  const displayedHonors = showAllHonors ? honors : honors.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16 relative bg-white text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-500/50 flex items-center gap-2.5 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 01 — ABOUT ME / PROFILE OVERVIEW */}
      <section id="about-profile-overview-section" className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2 font-mono">
              01 — PROFILE OVERVIEW
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Aman Maurya — Mechanical Design Engineer
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigateTab('resume')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Curriculum Vitae
            </button>
            <button
              onClick={onOpenContact}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait Card with Photo & Caption */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm relative group tech-card">
              <img
                src={resolveAssetUrl(profile.profileImage || 'assets/aman-profile.jpg')}
                alt={`${hero.name} - ${profile.title}`}
                className="w-full h-auto max-h-96 object-contain mx-auto rounded-xl bg-white p-2"
                loading="eager"
              />

              {isQuickEdit && onUpdateData && (
                <div className="absolute top-4 right-4 z-20">
                  <HomeImageUploader
                    currentUrl={profile.profileImage || 'assets/aman-profile.jpg'}
                    onSaveUrl={handleProfileImageChange}
                    label="Change Profile Photo"
                  />
                </div>
              )}

              <div className="mt-3 text-center">
                <p className="text-xs text-slate-700 font-semibold font-mono">
                  {hero.name} — {profile.title}
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  CIPET IPT–Jaipur (B.Tech Mechanical 3rd Year)
                </p>
                <p className="text-[11px] text-blue-600 font-mono">
                  Govt. Polytechnic Nawa Diploma (CGPA: 9.34)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Engineering Summary */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                <InlineEditableLine
                  value={profile.title}
                  isEditable={isQuickEdit}
                  onEdit={() =>
                    onOpenQuickEdit &&
                    onOpenQuickEdit('profile.title', 'Profile Designation', profile.title)
                  }
                />
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              <InlineEditableLine
                value={profile.bio1}
                isEditable={isQuickEdit}
                onEdit={() =>
                  onOpenQuickEdit &&
                  onOpenQuickEdit('profile.bio1', 'Biography Paragraph 1', profile.bio1, true)
                }
              />
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              <InlineEditableLine
                value={profile.bio2}
                isEditable={isQuickEdit}
                onEdit={() =>
                  onOpenQuickEdit &&
                  onOpenQuickEdit('profile.bio2', 'Biography Paragraph 2', profile.bio2, true)
                }
              />
            </p>

            {/* Quick Facts List */}
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase">CAD Specialization</span>
                  <strong className="text-slate-800">AutoCAD &amp; SolidWorks</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase">Academic Highlight</span>
                  <strong className="text-blue-600">9.34 CGPA (Diploma Topper)</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase">Industrial Exposure</span>
                  <strong className="text-slate-800">Indian Railways &amp; CEG Jaipur</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase">Design Focus</span>
                  <strong className="text-slate-800">Mechanisms &amp; ASME GD&amp;T</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — TECHNICAL COMPETENCIES / SKILLS */}
      <SkillsSection
        profile={profile}
        isQuickEdit={isQuickEdit}
        onOpenQuickEdit={onOpenQuickEdit}
      />

      {/* 03 — EDUCATION / ACADEMIC BACKGROUND */}
      <section id="education" className="relative pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2 font-mono">
              03 — ACADEMIC BACKGROUND
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Education &amp; Qualifications
            </h2>
          </div>
        </div>

        {/* Timeline Container with Blue Vertical Line */}
        <div className="relative pl-8 sm:pl-10 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-600">
          {education.map((edu: EducationItem) => (
            <div key={edu.id} className="relative group">
              {/* Blue Circular Node */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-6 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-sm" />

              {/* Card Container */}
              <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all relative tech-card">
                <div className="mb-2">
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase font-mono">
                    <InlineEditableLine
                      value={edu.yearRange || ''}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit &&
                        onOpenQuickEdit(`education.${edu.id}.yearRange`, 'Year Range', edu.yearRange || '')
                      }
                    />
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  <InlineEditableLine
                    value={edu.institution || ''}
                    isEditable={isQuickEdit}
                    onEdit={() =>
                      onOpenQuickEdit &&
                      onOpenQuickEdit(
                        `education.${edu.id}.institution`,
                        'Institution Name',
                        edu.institution || ''
                      )
                    }
                  />
                </h3>

                <div className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-800 font-semibold shrink-0">
                      Branch / Specialization:
                    </strong>
                    <span>
                      <InlineEditableLine
                        value={edu.branch || ''}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit &&
                          onOpenQuickEdit(`education.${edu.id}.branch`, 'Branch/Degree', edu.branch || '')
                        }
                      />
                    </span>
                  </div>

                  {edu.cgpa && (
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-800 font-semibold shrink-0">CGPA:</strong>
                      <span className="font-mono text-blue-600 font-bold">
                        <InlineEditableLine
                          value={edu.cgpa || ''}
                          isEditable={isQuickEdit}
                          onEdit={() =>
                            onOpenQuickEdit &&
                            onOpenQuickEdit(`education.${edu.id}.cgpa`, 'CGPA', edu.cgpa || '')
                          }
                        />
                      </span>
                    </div>
                  )}

                  {edu.percentage && (
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-800 font-semibold shrink-0">
                        Percentage:
                      </strong>
                      <span className="font-mono text-blue-600 font-bold">
                        <InlineEditableLine
                          value={edu.percentage || ''}
                          isEditable={isQuickEdit}
                          onEdit={() =>
                            onOpenQuickEdit &&
                            onOpenQuickEdit(
                              `education.${edu.id}.percentage`,
                              'Percentage',
                              edu.percentage || ''
                            )
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                {edu.status && (
                  <div className="mt-3 inline-block px-3 py-1 bg-amber-50 border-l-2 border-amber-500 text-xs font-semibold text-amber-900 rounded-r font-mono">
                    <span>
                      <InlineEditableLine
                        value={edu.status || ''}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit &&
                          onOpenQuickEdit(
                            `education.${edu.id}.status`,
                            'Status Highlight',
                            edu.status || ''
                          )
                        }
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — INTERNSHIP / INDUSTRIAL EXPOSURE */}
      <section id="internships" className="relative pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2 font-mono">
              04 — INDUSTRIAL EXPOSURE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Practical Engineering Training
            </h2>
          </div>
        </div>

        <div className="space-y-8">
          {internships.map((item: InternshipItem) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 relative group tech-card"
            >
              {/* Left Column: Certificate Preview */}
              <div className="lg:col-span-5 bg-slate-50 p-5 sm:p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200 relative">
                <div
                  onClick={() =>
                    setZoomCertificate({
                      url: item.imageUrl,
                      title: `${item.company} Internship Certificate`,
                    })
                  }
                  className="relative w-full cursor-pointer group/cert"
                  title="Click to inspect certificate"
                >
                  <img
                    src={resolveAssetUrl(item.imageUrl)}
                    alt={`Internship Certificate - ${item.company}`}
                    className="w-full h-full max-h-72 object-contain bg-white rounded-xl p-3 shadow-sm border border-slate-100 group-hover/cert:scale-[1.02] transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover/cert:bg-slate-900/10 rounded-xl transition flex items-center justify-center">
                    <span className="opacity-0 group-hover/cert:opacity-100 bg-slate-900/80 text-white text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1 transition shadow">
                      <Maximize2 className="w-3 h-3" />
                      <span>Inspect Certificate</span>
                    </span>
                  </div>
                </div>

                {isQuickEdit && onUpdateData && (
                  <div className="absolute top-4 right-4 z-20">
                    <HomeImageUploader
                      currentUrl={item.imageUrl}
                      onSaveUrl={(url) => handleInternshipImageChange(item.id, url)}
                      label="Change Certificate"
                    />
                  </div>
                )}

                <p className="text-xs text-slate-500 font-semibold text-center mt-2.5 font-mono">
                  {item.company}
                </p>
              </div>

              {/* Right Column: Role Details & Key Responsibilities */}
              <div className="lg:col-span-7 p-5 sm:p-7 space-y-3 relative">
                <span className="text-xs font-bold text-blue-600 tracking-widest uppercase font-mono">
                  TRAINING RECORD #{item.number}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  <InlineEditableLine
                    value={item.role}
                    isEditable={isQuickEdit}
                    onEdit={() =>
                      onOpenQuickEdit &&
                      onOpenQuickEdit(`internship.${item.id}.role`, 'Internship Role', item.role)
                    }
                  />
                </h3>

                <h4 className="text-base font-bold text-blue-600">
                  <InlineEditableLine
                    value={item.company}
                    isEditable={isQuickEdit}
                    onEdit={() =>
                      onOpenQuickEdit &&
                      onOpenQuickEdit(`internship.${item.id}.company`, 'Company Name', item.company)
                    }
                  />
                </h4>

                <div className="text-xs sm:text-sm text-slate-500 font-medium space-y-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>
                      <InlineEditableLine
                        value={item.location || ''}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit &&
                          onOpenQuickEdit(`internship.${item.id}.location`, 'Location', item.location || '')
                        }
                      />
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>
                      <InlineEditableLine
                        value={item.duration || ''}
                        isEditable={isQuickEdit}
                        onEdit={() =>
                          onOpenQuickEdit &&
                          onOpenQuickEdit(`internship.${item.id}.duration`, 'Duration', item.duration || '')
                        }
                      />
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify pt-1">
                  <InlineEditableLine
                    value={item.description}
                    isEditable={isQuickEdit}
                    onEdit={() =>
                      onOpenQuickEdit &&
                      onOpenQuickEdit(
                        `internship.${item.id}.description`,
                        'Internship Overview',
                        item.description,
                        true
                      )
                    }
                  />
                </p>

                {/* Key Responsibilities & Learnings */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 font-mono">
                    Key Responsibilities &amp; Practical Learnings:
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                    {(item.points || []).map((pt: string, pidx: number) => (
                      <li key={pidx} className="leading-relaxed text-justify">
                        <InlineEditableLine
                          value={pt}
                          isEditable={isQuickEdit}
                          onEdit={() =>
                            onOpenQuickEdit &&
                            onOpenQuickEdit(
                              `internship.${item.id}.points.${pidx}`,
                              `Point #${pidx + 1}`,
                              pt
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — PROFESSIONAL CERTIFICATIONS */}
      <section id="certifications" className="relative pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2 font-mono">
              05 — PROFESSIONAL CERTIFICATIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              CAD &amp; Engineering Certifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified certifications in AutoCAD Mechanical 2D/3D and SolidWorks Parametric Modeling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group tech-card"
            >
              <div>
                <div
                  onClick={() =>
                    setZoomCertificate({
                      url: cert.imageUrl,
                      title: cert.title,
                    })
                  }
                  className="p-4 bg-slate-950 border-b border-slate-200 relative cursor-pointer group/zoom"
                  title="Click to view full certificate"
                >
                  <img
                    src={resolveAssetUrl(cert.imageUrl)}
                    alt={`Certification - ${cert.title}`}
                    className="w-full h-52 object-contain bg-slate-950 rounded-lg p-2 group-hover/zoom:scale-102 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="p-1.5 bg-black/60 text-white rounded-md inline-flex items-center gap-1 text-[11px] font-mono opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </span>
                  </div>

                  {isQuickEdit && onUpdateData && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <HomeImageUploader
                        currentUrl={cert.imageUrl || ''}
                        onSaveUrl={(url) => handleAwardImageChange(cert.id, url)}
                        label="Change Certificate"
                      />
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-600 text-xs font-mono font-bold">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED CAD CREDENTIAL</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    <InlineEditableLine
                      value={cert.title}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit &&
                        onOpenQuickEdit(`award.${cert.id}.title`, 'Certificate Title', cert.title)
                      }
                    />
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    <InlineEditableLine
                      value={cert.description || ''}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit &&
                        onOpenQuickEdit(
                          `award.${cert.id}.description`,
                          'Certificate Description',
                          cert.description || '',
                          true
                        )
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 — HONORS & COMPETITION AWARDS */}
      <section id="awards" className="relative pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2 font-mono">
              06 — HONORS &amp; COMPETITIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Academic Honors &amp; Awards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Documented institutional excellence, CAD design competition prizes, and community service certificates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedHonors.map((award: AwardItem) => (
            <div
              key={award.id}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group tech-card"
            >
              <div>
                <div
                  onClick={() =>
                    setZoomCertificate({
                      url: award.imageUrl,
                      title: award.title,
                    })
                  }
                  className="p-4 bg-slate-950 border-b border-slate-200 relative cursor-pointer group/awzoom"
                  title="Click to inspect"
                >
                  <img
                    src={resolveAssetUrl(award.imageUrl)}
                    alt={`Award - ${award.title}`}
                    className="w-full h-44 object-contain bg-slate-950 rounded-lg p-2 group-hover/awzoom:scale-102 transition-transform"
                    loading="lazy"
                  />

                  {isQuickEdit && onUpdateData && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <HomeImageUploader
                        currentUrl={award.imageUrl || ''}
                        onSaveUrl={(url) => handleAwardImageChange(award.id, url)}
                        label="Change Award"
                      />
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-600 text-xs font-mono font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>HONOR / COMPETITION</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    <InlineEditableLine
                      value={award.title}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit &&
                        onOpenQuickEdit(`award.${award.id}.title`, 'Award Title', award.title)
                      }
                    />
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    <InlineEditableLine
                      value={award.description || ''}
                      isEditable={isQuickEdit}
                      onEdit={() =>
                        onOpenQuickEdit &&
                        onOpenQuickEdit(
                          `award.${award.id}.description`,
                          'Award Description',
                          award.description || '',
                          true
                        )
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {honors.length > 3 && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setShowAllHonors(!showAllHonors)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow transition cursor-pointer"
            >
              <span>{showAllHonors ? 'Show Fewer Honors' : `View All ${honors.length} Honors & Achievements`}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showAllHonors ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}
      </section>

      {/* Certificate Zoom Lightbox Modal */}
      {zoomCertificate && (
        <div
          onClick={() => setZoomCertificate(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative text-white"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <h3 className="text-sm font-bold text-slate-200 truncate pr-4">
                {zoomCertificate.title}
              </h3>
              <button
                onClick={() => setZoomCertificate(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close Inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={resolveAssetUrl(zoomCertificate.url)}
                alt={zoomCertificate.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
