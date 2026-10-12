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
  const [viewMode, setViewMode] = useState<'pdf' | 'structured'>('pdf');
  const [blobUrl, setBlobUrl] = useState<string>('');
  const { settings } = data;

  // Convert data: URL or Cloudinary URL to safe previewable URL (Blob URL for data URLs)
  useEffect(() => {
    const url = settings.resumeUrl;
    if (!url) {
      setBlobUrl('');
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
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      } catch (e) {
        setBlobUrl(url);
      }
    } else {
      setBlobUrl(url);
    }
  }, [settings.resumeUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (settings.resumeUrl) {
      const a = document.createElement('a');
      a.href = settings.resumeUrl;
      a.download = (settings as any).resumeFileName || 'Aman_Maurya_Resume.pdf';
      a.target = '_blank';
      a.click();
    } else {
      window.print();
    }
  };

  const handleReplaceResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadResumeFile(file);
        const updated = {
          ...data,
          settings: { ...settings, resumeUrl: url, resumeFileName: file.name },
        };
        onUpdateData(updated);
        setViewMode('pdf');
        alert(`Resume "${file.name}" uploaded successfully!`);
      } catch (err) {
        alert('Upload failed: ' + (err instanceof Error ? err.message : String(err)));
      }
    }
  };

  const handleDeleteResume = () => {
    if (window.confirm('Remove uploaded resume?')) {
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
          <span className="font-bold">PDF Document</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">1 Page</span>
          <span className="text-slate-400">|</span>
          <span className="text-blue-400 font-semibold truncate max-w-[150px] sm:max-w-xs">
            {(settings as any).resumeFileName || (settings.resumeUrl ? 'Uploaded_Resume.pdf' : 'Resume - Aman Maurya.pdf')}
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
          >
            <ZoomOut className="w-4 h-4 text-slate-300" />
          </button>
          <span className="px-1.5 font-mono text-slate-300">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(z + 10, 150))}
            className="p-1.5 hover:bg-slate-800 rounded transition cursor-pointer"
            title="Zoom In"
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

          {/* Admin-only Replace & Delete buttons */}
          {Boolean(isAdmin) && (
            <>
              <label className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white transition font-bold cursor-pointer shadow">
                <Upload className="w-3.5 h-3.5" />
                <span>Replace</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleReplaceResume}
                />
              </label>

              {settings.resumeUrl && (
                <button
                  onClick={handleDeleteResume}
                  className="p-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded transition cursor-pointer"
                  title="Delete Uploaded Resume"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <span className="text-slate-600">|</span>
            </>
          )}

          {settings.resumeUrl && (
            <a
              href={blobUrl || settings.resumeUrl}
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
                href={blobUrl || settings.resumeUrl}
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
              src={blobUrl || settings.resumeUrl}
              type="application/pdf"
              className="w-full h-full bg-white"
            />
            <div className="absolute bottom-4 right-4 bg-slate-900/95 text-white px-4 py-2 rounded-lg shadow-xl border border-slate-700 flex items-center gap-3 text-xs">
              <span>Preview not displaying?</span>
              <a
                href={blobUrl || settings.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded font-bold transition flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open PDF
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Structured HTML Resume Document View */
        <div
          className={`mx-auto bg-white text-slate-900 border border-slate-300 shadow-2xl rounded-lg p-8 sm:p-14 font-sans transition-all duration-300 ${
            isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto max-w-none' : 'max-w-4xl'
          }`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          {/* Header Name & Contact */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-slate-900">
              AMAN MAURYA
            </h1>
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-6 text-xs sm:text-sm text-slate-700 font-medium">
              <a href="mailto:amanmauryaji16@gmail.com" className="flex items-center gap-1.5 hover:text-blue-600 transition">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>amanmauryaji16@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/aman-maurya-80700a301/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                <Linkedin className="w-3.5 h-3.5 shrink-0" />
                <span>https://www.linkedin.com/in/aman-maurya-80700a301/</span>
              </a>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>+919257766762</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Jaipur, Rajasthan.</span>
              </div>
            </div>
          </div>

          <hr className="my-5 border-slate-300" />

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wider uppercase">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
              Motivated Mechanical Engineering student with hands-on experience in CAD design and machine mechanisms. Skilled in AutoCAD and SolidWorks, with practical exposure to drafting, 3D modeling, and mechanism development. Seeking a Mechanical Design Job to apply engineering fundamentals and contribute to real-world product development.
            </p>
          </div>

          <hr className="my-5 border-slate-300" />

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wider uppercase">
              EDUCATION
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <div>
                  <span className="font-semibold">B-tech in Mechanical Engineering</span> &#123;CIPET IPT- JAIPUR&#125;
                  <div className="text-slate-600 text-xs">Year – 2025-2028 (Going On)</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <div>
                  <span className="font-semibold">Diploma in Mechanical Engineering</span> &#123;Govt. Polytechnic College, Nawa (Didwana - Kuchaman.)&#125;
                  <div className="text-slate-600 text-xs">CGPA – 9.34, Passing Year – 2023-2025</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <div>
                  <span className="font-semibold">Senior Secondary Examination</span> &#123;Rajasthan Board&#125;
                  <div className="text-slate-600 text-xs">Percentage- 82.20%, Passing Year – 2022-2023</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <div>
                  <span className="font-semibold">Higher Secondary Examination</span> &#123;Rajasthan Board&#125;
                  <div className="text-slate-600 text-xs">Percentage- 93%, Passing Year – 2020-2021</div>
                </div>
              </li>
            </ul>
          </div>

          <hr className="my-5 border-slate-300" />

          {/* Technical Skill */}
          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wider uppercase">
              TECHANICAL SKILL
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-800">
              <div>
                <span className="font-semibold">CAD Software:</span>
                <ul className="pl-5 mt-1 space-y-1 list-disc text-slate-800">
                  <li>AutoCAD</li>
                  <li>SolidWorks</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold">Engineering Skills:</span>
                <ul className="pl-5 mt-1 space-y-1 list-disc text-slate-800">
                  <li>Basic in reading and creating engineering drawing</li>
                  <li>Basic Knowledge of GD&amp;T</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold">Tools &amp; Instruments:</span>
                <ul className="pl-5 mt-1 space-y-1 list-disc text-slate-800">
                  <li>Vernier Calliper, Micrometre, Height Gauge, Depth Gauge</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold">Microsoft Office:</span>
                <ul className="pl-5 mt-1 space-y-1 list-disc text-slate-800">
                  <li>MS Excel, PowerPoint, Word, Outlook</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-5 border-slate-300" />

          {/* Certification */}
          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wider uppercase">
              CERTIFICATION
            </h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 list-disc pl-5">
              <li>AutoCAD (2D+3D) Certified Professional.</li>
              <li>Certificate Industrial Design of Machine Components.</li>
              <li>Certificate of training on Basic Communication and Interview Skills (MNIT- JAIPUR).</li>
              <li>Data Entry &amp; Office Automation Certificate.</li>
            </ul>
          </div>

          <hr className="my-5 border-slate-300" />

          {/* Project Work Done */}
          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wider uppercase">
              PROJECT WORK DONE
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-800">
              <div>
                <span className="font-bold text-slate-900">Project 1: Solar Tracking System</span>
                <ul className="pl-5 mt-1 space-y-1 list-disc text-slate-800">
                  <li>Designed and developed a solar tracking system without external power using mechanical principles.</li>
                  <li>Created lightweight and cost-efficient structure using 3D printed components.</li>
                  <li>Improved energy efficiency by optimizing panel orientation mechanism.</li>
                  <li>Prepared detailed 2D drawings using AutoCAD.</li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-slate-900">Project 2: Geneva Wheel Mechanism</span>
                <ul className="pl-5 mt-1 space-y-1 list-disc text-slate-800">
                  <li>Designed and molding a Geneva wheel mechanism for intermittent motion applications.</li>
                  <li>Developed detailed 2D drawings and basic 3D models using AutoCAD and SolidWorks.</li>
                  <li>Analysed kinematics and motion transfer to improve mechanism efficiency.</li>
                  <li>Gained practical exposure to machine design, drafting, and mechanism development.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
