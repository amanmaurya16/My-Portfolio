import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, X } from 'lucide-react';
import { PortfolioData, EducationItem, InternshipItem, AwardItem } from '../types';
import { InlineEditableLine } from './InlineEditableLine';
import { HomeImageUploader } from './HomeImageUploader';

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
  const [showAllAwards, setShowAllAwards] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      showToast('Profile photo updated successfully!');
    }
  };

  const handleInternshipImageChange = (intId: string, newUrl: string) => {
    if (onUpdateData) {
      onUpdateData({
        ...data,
        internships: internships.map((i) => (i.id === intId ? { ...i, imageUrl: newUrl } : i)),
      });
      showToast('Internship certificate updated!');
    }
  };

  const handleAwardImageChange = (awardId: string, newUrl: string) => {
    if (onUpdateData) {
      onUpdateData({
        ...data,
        awards: awards.map((a) => (a.id === awardId ? { ...a, imageUrl: newUrl } : a)),
      });
      showToast('Award certificate updated!');
    }
  };

  const displayedAwards = showAllAwards ? awards : awards.filter((a) => !a.isExtra);
  const hasExtraAwards = awards.some((a) => a.isExtra);

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
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 01 — ABOUT ME / PROFILE OVERVIEW */}
      <section id="about-profile-overview-section" className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              01 — ABOUT ME
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Profile Overview</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait Card with Photo & Caption */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative group overflow-hidden">
              <img
                src={profile.profileImage || '/assets/aman-profile.jpg'}
                alt={hero.name || 'Aman Maurya'}
                className="w-full h-auto max-h-96 object-contain mx-auto rounded-xl bg-slate-50 p-2"
              />

              {isQuickEdit && onUpdateData && (
                <div className="absolute top-4 right-4 z-20">
                  <HomeImageUploader
                    currentUrl={profile.profileImage || '/assets/aman-profile.jpg'}
                    onSaveUrl={handleProfileImageChange}
                    label="Change Profile Photo"
                  />
                </div>
              )}

              <div className="mt-3 text-center">
                <p className="text-xs text-slate-500 font-medium">
                  {hero.name} — {profile.title}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Engineering Competencies */}
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

            {/* Core Engineering Competencies */}
            <div className="pt-4">
              <div className="mb-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Core Engineering Competencies
                </h4>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none">
                {profile.skills.map((skill, sidx) => (
                  <li
                    key={sidx}
                    className="bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 p-3 rounded-xl text-sm text-slate-800 font-medium flex items-center justify-between gap-2.5 transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-blue-600 font-bold shrink-0">✓</span>
                      <span className="truncate">
                        <InlineEditableLine
                          value={skill}
                          isEditable={isQuickEdit}
                          onEdit={() =>
                            onOpenQuickEdit &&
                            onOpenQuickEdit(`profile.skills.${sidx}`, `Skill #${sidx + 1}`, skill)
                          }
                        />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — EDUCATION / ACADEMIC BACKGROUND */}
      <section id="education" className="relative pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              02 — EDUCATION
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Academic Background</h2>
          </div>
        </div>

        {/* Timeline Container with Blue Vertical Line */}
        <div className="relative pl-8 sm:pl-10 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-600">
          {education.map((edu: EducationItem) => (
            <div key={edu.id} className="relative group">
              {/* Blue Circular Node */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-6 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-sm" />

              {/* Card Container */}
              <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all relative">
                <div className="mb-3">
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
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

                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-800 font-semibold shrink-0">
                      Branch / Degree:
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
                      <span>
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
                      <span>
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
                  <div className="mt-3 inline-block px-3 py-1 bg-amber-50 border-l-2 border-amber-500 text-xs font-semibold text-amber-900 rounded-r">
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

      {/* 03 — INTERNSHIP / INDUSTRIAL EXPOSURE */}
      <section id="internships" className="relative pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              03 — INTERNSHIP
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Industrial Exposure</h2>
          </div>
        </div>

        <div className="space-y-8">
          {internships.map((item: InternshipItem) => (
            <div
              key={item.id}
              className="internship-card card bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 relative group"
            >
              {/* Left Column: Certificate Preview */}
              <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200 relative">
                <img
                  src={item.imageUrl || '/assets/cert-railways.jpg'}
                  alt={item.company}
                  className="w-full h-full max-h-72 object-contain bg-white rounded-xl p-3 shadow-sm border border-slate-100"
                />

                {isQuickEdit && onUpdateData && (
                  <div className="absolute top-4 right-4 z-20">
                    <HomeImageUploader
                      currentUrl={item.imageUrl || '/assets/cert-railways.jpg'}
                      onSaveUrl={(url) => handleInternshipImageChange(item.id, url)}
                      label="Change Certificate"
                    />
                  </div>
                )}

                <p className="text-xs text-slate-500 font-medium text-center mt-2">
                  {item.company}
                </p>
              </div>

              {/* Right Column: Role Details & Key Responsibilities */}
              <div className="lg:col-span-7 p-4 sm:p-6 md:p-7 space-y-3 relative">
                <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">
                  {item.number}
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

                <div className="text-xs sm:text-sm text-slate-500 font-medium space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span>📍</span>
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
                    <span>
                      ⏳ <strong>Duration:</strong>
                    </span>
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

                <p className="text-slate-600 text-sm leading-relaxed text-justify pt-1">
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
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Key Responsibilities &amp; Learnings:
                  </span>
                  <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
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

      {/* 04 — HONORS & AWARDS / CERTIFICATIONS & ACHIEVEMENTS */}
      <section id="awards" className="relative pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              04 — HONORS &amp; AWARDS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Certifications &amp; Achievements
            </h2>
          </div>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedAwards.map((award: AwardItem) => (
            <div
              key={award.id}
              className="award-card card bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="p-4 bg-slate-50 border-b border-slate-200 relative">
                  <img
                    src={award.imageUrl}
                    alt={award.title}
                    className="w-full h-48 object-contain bg-white rounded-lg p-2 shadow-sm border border-slate-100"
                  />

                  {isQuickEdit && onUpdateData && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <HomeImageUploader
                        currentUrl={award.imageUrl || ''}
                        onSaveUrl={(url) => handleAwardImageChange(award.id, url)}
                        label="Change Certificate"
                      />
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
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

        {/* View More Button */}
        {hasExtraAwards && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setShowAllAwards(!showAllAwards)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              id="toggle-awards-btn"
            >
              <span>{showAllAwards ? 'View Less' : 'View More'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showAllAwards ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
