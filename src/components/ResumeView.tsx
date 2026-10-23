import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FileText,
  Upload,
  ExternalLink,
  RotateCcw,
  Maximize,
  ArrowRight,
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
  const [fitMode, setFitMode] = useState<'custom' | 'page' | 'width'>('page');
  const [blobUrl, setBlobUrl] = useState<string>('');
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const { settings, hero } = data;
  const resumeUrl = settings.resumeUrl || 'resume/Aman_Maurya_Resume.pdf';
  const resumeFileName = settings.resumeFileName || 'Aman_Maurya_Resume.pdf';

  useEffect(() => {
    if (!resumeUrl) {
      setBlobUrl('');
      return;
    }

    if (resumeUrl.startsWith('data:')) {
      try {
        const arr = resumeUrl.split(',');
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
        setBlobUrl(resumeUrl);
      }
    } else {
      setBlobUrl(resolveAssetUrl(resumeUrl));
    }
  }, [resumeUrl]);

  // Sync fullscreen state with document fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleZoomIn = () => {
    setFitMode('custom');
    setZoom((prev) => Math.min(prev + 10, 160));
  };

  const handleZoomOut = () => {
    setFitMode('custom');
    setZoom((prev) => Math.max(prev - 10, 60));
  };

  const handleFitPage = () => {
    setFitMode('page');
    setZoom(100);
  };

  const handleFitWidth = () => {
    setFitMode('width');
    setZoom(120);
  };

  const handlePrint = () => {
    const targetUrl = blobUrl || resolveAssetUrl(resumeUrl);
    // If it's an accessible iframe / window, trigger print directly or window.print
    const printWindow = window.open(targetUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
      // Most browsers will load the PDF with native print control
    } else {
      window.print();
    }
  };

  const handleDownload = () => {
    const targetUrl = blobUrl || resolveAssetUrl(resumeUrl);
    const a = document.createElement('a');
    a.href = targetUrl;
    a.download = resumeFileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (viewerContainerRef.current) {
          await viewerContainerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fallback to CSS fullscreen if Fullscreen API is blocked/unavailable
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleReplaceResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateAssetFile(file, 'pdf');
      if (!validation.isValid) {
        alert(validation.error || 'Invalid PDF file. Please select a valid PDF.');
        return;
      }
      try {
        const url = await uploadResumeFile(file);
        const updated = {
          ...data,
          settings: { ...settings, resumeUrl: url, resumeFileName: file.name },
        };
        onUpdateData(updated);
        alert(`Resume "${file.name}" uploaded successfully!`);
      } catch (err) {
        console.error('Resume upload error:', err);
      }
    }
  };

  const resolvedPdfUrl = blobUrl || resolveAssetUrl(resumeUrl);

  return (
    <div
      ref={viewerContainerRef}
      className={`mx-auto transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden'
          : 'max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-5'
      }`}
    >
      {/* PDF Document Viewer Toolbar */}
      <div className="bg-slate-900 text-white rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl border border-slate-800 print:hidden">
        {/* Left: Document Identity & File Name */}
        <div className="flex items-center gap-2.5 text-xs font-medium min-w-0">
          <div className="p-1.5 bg-blue-600 rounded-lg shrink-0 shadow-sm">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-slate-100 hidden sm:inline">Engineering CV</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline">{hero.name}</span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span
            className="text-blue-400 font-mono font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-sm"
            title={resumeFileName}
          >
            {resumeFileName}
          </span>
        </div>

        {/* Right: Functional Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs flex-wrap">
          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-700"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Zoom Percentage Display */}
          <span
            className="px-2 py-0.5 font-mono text-xs text-slate-300 bg-slate-800/80 rounded border border-slate-700/60 min-w-[48px] text-center"
            title="Current zoom level"
          >
            {zoom}%
          </span>

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-700"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <span className="text-slate-700">|</span>

          {/* Fit to Page */}
          <button
            onClick={handleFitPage}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer border ${
              fitMode === 'page'
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700/80'
            }`}
            title="Fit to Page (Default 100%)"
            aria-label="Fit to Page"
          >
            Fit to Page
          </button>

          {/* Fit to Width */}
          <button
            onClick={handleFitWidth}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer border ${
              fitMode === 'width'
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700/80'
            }`}
            title="Fit to Width (Zoom 120%)"
            aria-label="Fit to Width"
          >
            Fit to Width
          </button>

          <span className="text-slate-700">|</span>

          {/* Open PDF */}
          <a
            href={resolvedPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-lg text-slate-200 hover:text-white transition font-medium cursor-pointer"
            title="Open PDF in new tab"
            aria-label="Open PDF in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open PDF</span>
          </a>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-lg text-slate-200 hover:text-white transition font-medium cursor-pointer"
            title="Print Resume"
            aria-label="Print resume document"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-semibold shadow cursor-pointer"
            title="Download PDF"
            aria-label="Download resume PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Admin Upload / Replace Button */}
          {Boolean(isAdmin) && (
            <>
              <span className="text-slate-700">|</span>
              <label className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-600/90 hover:bg-blue-600 rounded-lg text-white transition font-medium cursor-pointer shadow">
                <Upload className="w-3.5 h-3.5" />
                <span>Replace</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleReplaceResume}
                />
              </label>
            </>
          )}
        </div>
      </div>

      {/* Embedded Document Canvas / Viewer Container */}
      <div
        className={`mx-auto w-full bg-slate-900 border border-slate-800 shadow-2xl rounded-xl overflow-hidden flex flex-col ${
          isFullscreen ? 'flex-1 my-2' : ''
        }`}
      >
        {/* Document Header Bar */}
        <div className="bg-slate-900/90 backdrop-blur px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-slate-300 font-semibold">{resumeFileName}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 hidden sm:inline">Mechanical Design Engineering CV</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 font-medium transition"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Full Screen Link</span>
            </a>
          </div>
        </div>

        {/* Scrollable Container with Zoom applied */}
        <div
          className={`w-full bg-slate-950/70 overflow-auto flex items-start justify-center p-2 sm:p-4 transition-all duration-200 ${
            isFullscreen ? 'flex-1 h-full' : 'h-[750px] sm:h-[860px]'
          }`}
        >
          <div
            className="transition-transform duration-150 ease-out origin-top flex justify-center"
            style={{
              transform: `scale(${zoom / 100})`,
              width: fitMode === 'width' ? '100%' : 'auto',
              minWidth: fitMode === 'width' ? '100%' : '800px',
              maxWidth: '100%',
              height: '100%',
            }}
          >
            <object
              data={`${resolvedPdfUrl}#view=FitH&toolbar=0&navpanes=0`}
              type="application/pdf"
              className="w-full h-full min-h-[700px] sm:min-h-[820px] rounded shadow-lg bg-white"
              title="Aman Maurya Resume PDF Viewer"
            >
              {/* Fallback for browsers that cannot render embedded PDF directly */}
              <iframe
                src={`${resolvedPdfUrl}#toolbar=0`}
                title="Aman Maurya Resume Document"
                className="w-full h-full min-h-[700px] sm:min-h-[820px] rounded border-0 bg-white"
              >
                <div className="p-8 text-center bg-slate-900 text-slate-200 rounded-lg space-y-4">
                  <FileText className="w-12 h-12 text-blue-500 mx-auto" />
                  <p className="text-sm font-semibold">
                    Your browser does not support embedded PDF preview directly.
                  </p>
                  <a
                    href={resolvedPdfUrl}
                    download={resumeFileName}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium"
                  >
                    <Download className="w-4 h-4" /> Download {resumeFileName}
                  </a>
                </div>
              </iframe>
            </object>
          </div>
        </div>
      </div>

      {/* Footer Info / Contact CTA */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs print:hidden">
        <div className="text-center sm:text-left space-y-0.5">
          <p className="font-bold text-slate-800 dark:text-slate-200">
            Need an updated engineering portfolio package or CAD drawing samples?
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Directly connect with Aman Maurya for mechanical design roles, internships, and technical collaborations.
          </p>
        </div>
        <button
          onClick={onOpenContact}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer"
        >
          <span>Contact Aman</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
