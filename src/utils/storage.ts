import { PortfolioData, EnquiryItem } from '../types';
import { initialPortfolioData } from '../initialData';

export const PORTFOLIO_STORAGE_KEY = 'aman_maurya_portfolio_cms_v1';
export const ENQUIRIES_STORAGE_KEY = 'aman_maurya_portfolio_enquiries_v1';

export function isTemporaryBlobUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const lower = url.trim().toLowerCase();
  return lower.startsWith('blob:') || lower.includes('localhost:') || lower.includes('127.0.0.1:');
}

export function sanitizePortfolioData(data?: Partial<PortfolioData> | null): PortfolioData {
  const merged: PortfolioData = {
    ...initialPortfolioData,
    ...(data || {}),
    hero: { ...initialPortfolioData.hero, ...(data?.hero || {}) },
    profile: { ...initialPortfolioData.profile, ...(data?.profile || {}) },
    contact: { ...initialPortfolioData.contact, ...(data?.contact || {}) },
    settings: { ...initialPortfolioData.settings, ...(data?.settings || {}) },
    homeSections: { ...initialPortfolioData.homeSections, ...(data?.homeSections || {}) },
    expertise: data?.expertise || initialPortfolioData.expertise,
    projects: data?.projects || initialPortfolioData.projects,
    education: data?.education || initialPortfolioData.education,
    internships: data?.internships || initialPortfolioData.internships,
    awards: data?.awards || initialPortfolioData.awards,
    galleryItems: data?.galleryItems || initialPortfolioData.galleryItems,
  };

  // Ensure real CAD assets are used instead of temporary blob URLs or initial SVG placeholders
  if (!merged.hero.heroImage || isTemporaryBlobUrl(merged.hero.heroImage) || merged.hero.heroImage.startsWith('data:image/svg+xml')) {
    merged.hero.heroImage = '/assets/hero-engine.jpg';
  }
  if (!merged.profile.profileImage || isTemporaryBlobUrl(merged.profile.profileImage) || merged.profile.profileImage.startsWith('data:image/svg+xml')) {
    merged.profile.profileImage = '/assets/aman-profile.jpg';
  }

  merged.projects = merged.projects.map((proj) => {
    const copy = { ...proj };
    if (!copy.imageUrl || isTemporaryBlobUrl(copy.imageUrl) || copy.imageUrl.startsWith('data:image/svg+xml')) {
      if (copy.id === 'proj-1') copy.imageUrl = '/assets/geneva-wheel.jpg';
      else if (copy.id === 'proj-2') copy.imageUrl = '/assets/solar-tracker.jpg';
      else {
        const orig = initialPortfolioData.projects.find((p) => p.id === proj.id);
        copy.imageUrl = orig?.imageUrl || '/assets/hero-engine.jpg';
      }
    }
    if (isTemporaryBlobUrl(copy.videoUrl)) {
      copy.videoUrl = undefined;
    }
    return copy;
  });

  merged.internships = merged.internships.map((item) => {
    const copy = { ...item };
    if (!copy.imageUrl || isTemporaryBlobUrl(copy.imageUrl) || copy.imageUrl.startsWith('data:image/svg+xml')) {
      if (copy.id === 'int-1') copy.imageUrl = '/assets/cert-railways.jpg';
      else if (copy.id === 'int-2') copy.imageUrl = '/assets/cert-ceg.jpg';
      else if (copy.id === 'int-3') copy.imageUrl = '/assets/cert-mnit.jpg';
      else copy.imageUrl = '/assets/cert-railways.jpg';
    }
    return copy;
  });

  merged.awards = merged.awards.map((item) => {
    const copy = { ...item };
    if (!copy.imageUrl || isTemporaryBlobUrl(copy.imageUrl) || copy.imageUrl.startsWith('data:image/svg+xml')) {
      if (copy.id === 'award-1') copy.imageUrl = '/assets/cert-autocad.jpg';
      else if (copy.id === 'award-2') copy.imageUrl = '/assets/cert-solidworks.jpg';
      else if (copy.id === 'award-3') copy.imageUrl = '/assets/award-best-student.jpg';
    }
    return copy;
  });

  return merged;
}

export function loadPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return sanitizePortfolioData(parsed);
    }
  } catch (err) {
    console.error('Error loading portfolio data from localStorage:', err);
  }
  return initialPortfolioData;
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    const sanitized = sanitizePortfolioData(data);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(sanitized));
    return true;
  } catch (err) {
    console.error('Error saving portfolio data to localStorage:', err);
    return false;
  }
}

export function loadStoredEnquiries(): EnquiryItem[] {
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredEnquiries(enquiries: EnquiryItem[]): void {
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
  } catch (err) {
    console.error('Error saving enquiries to localStorage:', err);
  }
}

export function deleteStoredEnquiry(id: string): EnquiryItem[] {
  const current = loadStoredEnquiries();
  const updated = current.filter((e) => e.id !== id);
  saveStoredEnquiries(updated);
  return updated;
}
