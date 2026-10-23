import { LocalAssetMetadata } from '../types';

/**
 * Local Asset Manager
 * 
 * Provides:
 * 1. Base-path safe asset URL resolution for GitHub Pages static hosting.
 * 2. Registry of verified, committed repository assets.
 * 3. File validation and metadata extraction for local file selection.
 * 4. Temporary preview generation and resource cleanup (revoking object URLs).
 * 5. Explanatory instructions for git-based publishing of static assets.
 */

const BASE_URL = import.meta.env.BASE_URL || '/';

/**
 * Registry of genuine, verified media files committed under public/assets/
 */
export const COMMITTED_REPOSITORY_ASSETS: readonly string[] = [
  'assets/aman-profile.jpg',
  'assets/hero-engine.jpg',
  'assets/geneva-wheel.jpg',
  'assets/solar-tracker.jpg',
  'assets/cert-railways.jpg',
  'assets/cert-ceg.jpg',
  'assets/cert-mnit.jpg',
  'assets/cert-autocad.jpg',
  'assets/cert-solidworks.jpg',
  'assets/award-best-student.jpg',
  'resume/Aman_Maurya_Resume.pdf',
];

/**
 * Allowed MIME types for static repository assets.
 */
export const ALLOWED_MIME_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  pdf: ['application/pdf'],
  video: ['video/mp4', 'video/webm'],
};

/**
 * Maximum file sizes (in bytes) suitable for static repository hosting.
 */
export const MAX_ASSET_SIZES = {
  image: 5 * 1024 * 1024, // 5 MB
  pdf: 10 * 1024 * 1024, // 10 MB
  video: 30 * 1024 * 1024, // 30 MB
};

/**
 * Resolves a given asset path to work reliably under root, subdirectory, and GitHub Pages deployments.
 */
export function resolveAssetUrl(path: string | undefined | null): string {
  if (!path || typeof path !== 'string') {
    return generateTechnicalBlueprintSvg('Technical Asset Placeholder', 'Mechanical Engineering CAD');
  }

  const trimmed = path.trim();

  // If already absolute URL, data URI, or temporary blob URL, return as-is
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Normalize relative path
  const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

  return `${base}${cleanPath}`;
}

/**
 * Checks whether an asset path corresponds to a verified, committed repository asset.
 */
export function isCommittedAsset(path: string): boolean {
  if (!path) return false;
  const normalized = path.replace(/^\//, '').trim();
  return COMMITTED_REPOSITORY_ASSETS.includes(normalized);
}

/**
 * Identifies whether an asset is a decorative/procedural vector illustration rather than real media.
 */
export function isDecorativeIllustration(path: string): boolean {
  if (!path) return true;
  return path.startsWith('data:image/svg+xml') || path.endsWith('.svg');
}

/**
 * Determines asset category from filename or mime type.
 */
export function getAssetType(fileNameOrPath: string): 'image' | 'pdf' | 'video' | 'svg' | 'unknown' {
  const lower = fileNameOrPath.toLowerCase();
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.mp4') || lower.endsWith('.webm')) return 'video';
  if (lower.endsWith('.svg') || lower.startsWith('data:image/svg+xml')) return 'svg';
  if (
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.png') ||
    lower.endsWith('.webp')
  ) {
    return 'image';
  }
  return 'unknown';
}

/**
 * Validates a browser-selected file against supported MIME types and size constraints.
 */
export function validateAssetFile(
  file: File,
  expectedCategory?: 'image' | 'pdf' | 'video'
): { isValid: boolean; error?: string; metadata?: LocalAssetMetadata } {
  const category = expectedCategory || (getAssetType(file.name) as 'image' | 'pdf' | 'video');
  const allowed = ALLOWED_MIME_TYPES[category] || ALLOWED_MIME_TYPES.image;
  const maxSize = MAX_ASSET_SIZES[category] || MAX_ASSET_SIZES.image;

  if (file.type && !allowed.includes(file.type)) {
    return {
      isValid: false,
      error: `Unsupported file type "${file.type}". Allowed types: ${allowed.join(', ')}`,
    };
  }

  if (file.size > maxSize) {
    const maxMb = (maxSize / (1024 * 1024)).toFixed(0);
    const actualMb = (file.size / (1024 * 1024)).toFixed(2);
    return {
      isValid: false,
      error: `File size (${actualMb} MB) exceeds maximum allowed size for static hosting (${maxMb} MB).`,
    };
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const metadata: LocalAssetMetadata = {
    fileName: cleanName,
    fileSize: file.size,
    mimeType: file.type || 'application/octet-stream',
    fileExtension: cleanName.split('.').pop() || '',
    repositoryPath: `assets/${cleanName}`,
    isCommitted: false,
  };

  return { isValid: true, metadata };
}

/**
 * Creates a safe, temporary object URL preview for a selected file.
 * Returns a cleanup/revoke function to prevent browser memory leaks.
 */
export function createLocalAssetPreview(file: File): {
  previewUrl: string;
  metadata: LocalAssetMetadata;
  revoke: () => void;
} {
  const validation = validateAssetFile(file);
  const metadata: LocalAssetMetadata = validation.metadata || {
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type,
    fileExtension: file.name.split('.').pop() || '',
    repositoryPath: `assets/${file.name}`,
    isCommitted: false,
  };

  const previewUrl = URL.createObjectURL(file);
  metadata.previewUrl = previewUrl;

  return {
    previewUrl,
    metadata,
    revoke: () => {
      URL.revokeObjectURL(previewUrl);
    },
  };
}

/**
 * Explains the Git-based copy-and-commit workflow for static GitHub Pages sites.
 * Prevents false claims that browser interactions can modify files on the web server.
 */
export function getCommitInstructions(fileName: string): string {
  const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `On static GitHub Pages hosting, browser-selected files cannot write directly to disk. To permanently publish "${sanitized}", place it into the repository's "public/assets/${sanitized}" folder, commit to git, and push to GitHub.`;
}

/**
 * Generates an engineering-grade technical blueprint SVG placeholder.
 */
export function generateTechnicalBlueprintSvg(
  title: string,
  subtitle: string = 'CAD Drawing / Specification',
  theme: 'blue' | 'graphite' | 'amber' = 'blue'
): string {
  const colors = {
    blue: {
      bg: '%230a192f',
      grid: '%231e3a5f',
      accent: '%233b82f6',
      sub: '%2360a5fa',
    },
    graphite: {
      bg: '%230f172a',
      grid: '%23334155',
      accent: '%230284c7',
      sub: '%2338bdf8',
    },
    amber: {
      bg: '%2318181b',
      grid: '%233f3f46',
      accent: '%23f59e0b',
      sub: '%23fbbf24',
    },
  }[theme];

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none"><rect width="600" height="400" fill="${colors.bg}"/><g stroke="${colors.grid}" stroke-width="1" stroke-dasharray="8 8"><path d="M0 50h600M0 100h600M0 150h600M0 200h600M0 250h600M0 300h600M0 350h600M50 0v400M100 0v400M150 0v400M200 0v400M250 0v400M300 0v400M350 0v400M400 0v400M450 0v400M500 0v400M550 0v400"/></g><rect x="24" y="24" width="552" height="352" rx="4" stroke="${colors.accent}" stroke-width="2"/><circle cx="300" cy="180" r="70" stroke="${colors.accent}" stroke-width="2.5" fill="none"/><circle cx="300" cy="180" r="30" stroke="${colors.accent}" stroke-width="1.5" stroke-dasharray="4 3" fill="${colors.bg}"/><path d="M200 180h200M300 80v200" stroke="${colors.sub}" stroke-width="1.5" stroke-dasharray="6 4"/><text x="300" y="305" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="18" font-weight="700" fill="%23f8fafc">${encodeURIComponent(title)}</text><text x="300" y="332" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="12" font-weight="600" fill="${colors.sub}" letter-spacing="1.5">${encodeURIComponent(subtitle.toUpperCase())}</text></svg>`;
}
