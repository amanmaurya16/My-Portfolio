import React, { useState, useEffect } from 'react';
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Upload,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ExternalLink,
  Eye,
  FileCode,
} from 'lucide-react';
import { PortfolioData } from '../types';
import { uploadResumeFile } from '../utils/imageUpload';
import { resolveAssetUrl, validateAssetFile } from '../services/localAssetManager';

interface ResumeViewProps {
  data: PortfolioData;
  isAdmin: boolean;
  onUpdateData: (newData: PortfolioData) => void;
  onOpenContact: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  data,
  isAdmin,
  onUpdateData,
  onOpenContact,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'structured'>('structured');
  const [blobUrl, setBlobUrl] = useState<string>('');
  const { settings, contact, hero, profile } = data;

  useEffect(() => {
    const url = settings.resumeUrl;
    if (!url) {
      setBlobUrl('');
      setViewMode('structured');
      return;
    }

    if (url.startsWith('data:')) {
      try {
        const arr = url.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/pdf';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
        setViewMode('pdf');
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      } catch (e) {
        setBlobUrl(url);
      }
    } else {
      setBlobUrl(resolveAssetUrl(url));
      setViewMode('pdf');
    }
  }, [settings.resumeUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (settings.resumeUrl) {
      const a = document.createElement('a');
      a.href = blobUrl || resolveAssetUrl(settings.resumeUrl);
      a.download = settings.resumeFileName || 'Aman_Maurya_Resume.pdf';
      a.target = '_blank';
      a.click();
    } else {
      window.print();
    }
  };

  const handleReplaceResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateAssetFile(file, 'pdf');
      if (!validation.isValid) {
        alert(validation.error || 'Invalid PDF file.');
        return;
      }
      try {
        const url = await uploadResumeFile(file);
        const updated = {
          ...data,
          settings: { ...settings, resumeUrl: url, resumeFileName: file.name },
        };
        onUpdateData(updated);
        setViewMode('pdf');
        alert(`Resume "${file.name}" uploaded successfully for draft preview!`);
      } catch (err) {
        console.error('Resume upload error:', err);
      }
    }
  };

  const handleDeleteResume = () => {
    if (window.confirm('Remove uploaded resume document and revert to structured CV view?')) {
      const updated = {
        ...data,
        settings: { ...settings, resumeUrl: '', resumeFileName: '' },
      };
      onUpdateData(updated);
      setViewMode('structured');
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* PDF Document Viewer Toolbar */}
      <div className="bg-slate-900 text-white rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg print:hidden">
        <div className="flex items-center gap-2.5 text-xs font-medium">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">Engineering CV</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Aman Maurya</span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-400 font-semibold font-mono truncate max-w-[150px] sm:max-w-xs">
            {settings.resumeFileName || (settings.resumeUrl ? 'Uploaded_Resume.pdf' : 'Structured Engineering CV')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs flex-wrap">
          {settings.resumeUrl && (
            <div className="flex items-center bg-slate-800 rounded p-0.5 mr-2">
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded transition text-xs font-medium cursor-pointer ${
                  viewMode === 'pdf' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => setViewMode('structured')}
                className={`px-2.5 py-1 rounded transition text-xs font-medium cursor-pointer ${
                  viewMode === 'structured' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Structured View
              </button>
            </div>
          )}

          <button
            onClick={() => setZoom((z) => Math.max(z - 10, 70))}
            className="p-1.5 hover:bg-slate-800 rounded transition cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-slate-300" />
          </button>
          <span className="px-1.5 font-mono text-slate-300">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(z + 10, 150))}
            className="p-1.5 hover:bg-slate-800 rounded transition cursor-pointer"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-slate-300" />
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setZoom(100)}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded font-medium text-slate-200 transition cursor-pointer"
          >
            Fit
          </button>

          {/* Admin Replace & Delete buttons */}
          {Boolean(isAdmin) && (
            <>
              <label className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white transition font-bold cursor-pointer shadow">
                <Upload className="w-3.5 h-3.5" />
                <span>Replace</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleReplaceResume}
                />
              </label>

              {settings.resumeUrl && (
                <button
                  onClick={handleDeleteResume}
                  className="p-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded transition cursor-pointer"
                  title="Remove PDF"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <span className="text-slate-600">|</span>
            </>
          )}

          {settings.resumeUrl && (
            <a
              href={blobUrl || resolveAssetUrl(settings.resumeUrl)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white transition font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 transition font-medium cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-white transition font-bold shadow cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition cursor-pointer"
            title="Full Screen"
            aria-label="Toggle full screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Viewer Content Area */}
      {settings.resumeUrl && viewMode === 'pdf' ? (
        <div
          className={`mx-auto bg-slate-900 border border-slate-300 shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-4 z-50 max-w-none' : 'max-w-4xl'
          }`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center text-xs text-slate-300">
            <span className="font-medium">Uploaded PDF Preview</span>
            <div className="flex items-center gap-2">
              <a
                href={blobUrl || resolveAssetUrl(settings.resumeUrl)}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" /> Open in New Tab
              </a>
            </div>
          </div>
          <div className="w-full bg-slate-950 flex flex-col items-center justify-center relative" style={{ height: isFullscreen ? 'calc(100vh - 100px)' : '850px' }}>
            <embed
              src={blobUrl || resolveAssetUrl(settings.resumeUrl)}
              type="application/pdf"
              className="w-full h-full bg-white"
            />
          </div>
        </div>
      ) : (
        /* Structured HTML Resume Document View */
        <div
          className={`mx-auto bg-white text-slate-900 border border-slate-300 shadow-xl rounded-lg p-8 sm:p-14 font-sans transition-all duration-300 ${
            isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto max-w-none' : 'max-w-4xl'
          }`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          {/* Header Name & Contact */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-slate-900">
              {hero.name.toUpperCase()}
            </h1>
            <p className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
              {hero.title} • Mechanical CAD &amp; Engineering Design
            </p>
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-6 text-xs sm:text-sm text-slate-700 font-medium">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{contact.email}</span>
              </a>
              {contact.linkedinUrl && (
                <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                  <Linkedin className="w-3.5 h-3.5 shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {Boolean(contact.phone) && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{contact.phoneDisplay || contact.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{contact.location}</span>
              </div>
            </div>
          </div>

          <hr className="my-5 border-slate-200" />

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider uppercase font-mono">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
              {hero.bio}
            </p>
          </div>

          <hr className="my-5 border-slate-200" />

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider uppercase font-mono">
              EDUCATION &amp; ACADEMIC QUALIFICATIONS
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-900">B.Tech in Mechanical Engineering</span> — Central Institute of Petrochemicals Engineering &amp; Technology (CIPET), Jaipur
                  <div className="text-slate-600 text-xs font-mono mt-0.5">Duration: Sep 2025 – Present | CGPA: 7.35 (Currently in 3rd Year)</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-900">Diploma in Mechanical Engineering</span> — Government Polytechnic College, Nawa (Didwana - Kuchaman)
                  <div className="text-slate-600 text-xs font-mono mt-0.5">Duration: Aug 2023 – Jun 2025 | CGPA: 9.34 | <span className="text-emerald-700 font-bold">Best Student of Mechanical Engineering Award</span></div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-900">Senior Secondary Examination</span> — Rajasthan Board
                  <div className="text-slate-600 text-xs font-mono mt-0.5">Year: 2022 – 2023 | Science with Mathematics | Percentage: 82.20%</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-900">Secondary School Certificate</span> — Rajasthan Board
                  <div className="text-slate-600 text-xs font-mono mt-0.5">Year: 2020 – 2021 | General Studies &amp; Science | Percentage: 93%</div>
                </div>
              </li>
            </ul>
          </div>

          <hr className="my-5 border-slate-200" />

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider uppercase font-mono">
              TECHNICAL SKILLS &amp; CAD EXPERTISE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">CAD Software:</span>
                <ul className="pl-4 space-y-0.5 list-disc text-slate-700">
                  <li>AutoCAD Mechanical (2D Drafting &amp; 3D Modeling)</li>
                  <li>SolidWorks (Part, Assembly, Weldments, Sheet Metal)</li>
                </ul>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Engineering Fundamentals:</span>
                <ul className="pl-4 space-y-0.5 list-disc text-slate-700">
                  <li>Engineering Drawing Interpretation &amp; Creation</li>
                  <li>ASME Y14.5 Geometric Dimensioning &amp; Tolerancing (GD&amp;T)</li>
                  <li>Machine Components &amp; Mechanisms Kinematics</li>
                </ul>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Inspection Tools &amp; Metrology:</span>
                <p className="text-slate-700">Vernier Caliper, Micrometer, Height Gauge, Depth Gauge</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Engineering Software &amp; Tools:</span>
                <p className="text-slate-700">MATLAB (Kinematic Analysis), MS Excel, Word, PowerPoint</p>
              </div>
            </div>
          </div>

          <hr className="my-5 border-slate-200" />

          {/* Practical Industrial Internships */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider uppercase font-mono">
              PRACTICAL INDUSTRIAL TRAINING
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-900">Indian Railways, Govt. of India</span> — Mechanical Engineering Intern (Jaipur)
                  <div className="text-slate-600 text-xs font-mono">26 May 2026 – 10 July 2026</div>
                  <p className="text-slate-700 text-xs mt-1">
                    Gained practical exposure to railway coach maintenance, working principle and testing of the Air Brake System, FIBA System, and operation of the CNC Underfloor Wheel Lathe Machine.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-900">Centre for Electronic Governance (CEG), Govt. of Rajasthan</span> — Mechanical Intern
                  <div className="text-slate-600 text-xs font-mono">10 July 2024 – 20 August 2024</div>
                  <p className="text-slate-700 text-xs mt-1">
                    Completed Summer Internship in Industrial Design of Machine Components. Focused on CAD modeling, machine component design methodologies, and product development practices.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-900">Malaviya National Institute of Technology (MNIT), Jaipur</span> — MIIC Winter Internship
                  <div className="text-slate-600 text-xs font-mono">26 December 2023 – 22 January 2024</div>
                  <p className="text-slate-700 text-xs mt-1">
                    Completed 24-day MIIC Winter Internship Program focusing on incubation, product innovation, and Intellectual Property Rights (IPR).
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <hr className="my-5 border-slate-200" />

          {/* Project Work */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider uppercase font-mono">
              FEATURED MECHANICAL PROJECTS
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-800">
              <div>
                <span className="font-bold text-slate-900">1. Geneva Wheel Mechanism (B.Tech 4th Sem Minor Project — Team Lead)</span>
                <ul className="pl-4 mt-1 space-y-0.5 list-disc text-slate-700">
                  <li>Designed and modeled a 6-slot Geneva Wheel Mechanism to convert continuous rotary motion into intermittent indexing motion.</li>
                  <li>Prepared detailed 2D production drawings with ASME Y14.5 GD&amp;T adherence using AutoCAD and SolidWorks.</li>
                  <li>Conducted kinematic analysis in MATLAB; won Runner-Up at TechFest 2026 (PRISMA).</li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-slate-900">2. Solar Tracking System (Polytechnic Final Year Major Project — Project Lead)</span>
                <ul className="pl-4 mt-1 space-y-0.5 list-disc text-slate-700">
                  <li>Designed an automatic solar tracking system using mechanical linkage principles to enhance solar panel orientation without external sensors.</li>
                  <li>Fabricated prototype utilizing 3D printing; demonstrated +35% solar efficiency; awarded Best Project Award 2025.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
