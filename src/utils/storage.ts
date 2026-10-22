import { PortfolioData, EnquiryItem } from '../types';
import {
  getCanonicalPortfolioData,
  sanitizePortfolioData as sanitizeData,
  PORTFOLIO_DRAFT_KEY,
} from '../services/portfolioRepository';

export const PORTFOLIO_STORAGE_KEY = PORTFOLIO_DRAFT_KEY;
export const ENQUIRIES_STORAGE_KEY = 'aman_maurya_portfolio_enquiries_v1';

export function isTemporaryBlobUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const lower = url.trim().toLowerCase();
  return lower.startsWith('blob:') || lower.includes('localhost:') || lower.includes('127.0.0.1:');
}

export function sanitizePortfolioData(data?: Partial<PortfolioData> | null): PortfolioData {
  return sanitizeData(data || {});
}

export function loadPortfolioData(): PortfolioData {
  if (typeof window === 'undefined') return getCanonicalPortfolioData();
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return sanitizeData(parsed);
    }
  } catch (err) {
    console.error('Error loading portfolio data from localStorage:', err);
  }
  return getCanonicalPortfolioData();
}

export function savePortfolioData(data: PortfolioData): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const sanitized = sanitizeData(data);
    sanitized.updatedAt = new Date().toISOString();
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(sanitized));
    return true;
  } catch (err) {
    console.error('Error saving portfolio data to localStorage:', err);
    return false;
  }
}

export function loadStoredEnquiries(): EnquiryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredEnquiries(enquiries: EnquiryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
  } catch (err) {
    console.error('Error saving enquiries to localStorage:', err);
  }
}

export function addStoredEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'createdAt'>): EnquiryItem[] {
  const current = loadStoredEnquiries();
  const newItem: EnquiryItem = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...current];
  saveStoredEnquiries(updated);
  return updated;
}

export function deleteStoredEnquiry(id: string): EnquiryItem[] {
  const current = loadStoredEnquiries();
  const updated = current.filter((e) => e.id !== id);
  saveStoredEnquiries(updated);
  return updated;
}
