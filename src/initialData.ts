import { PortfolioData } from './types';
import canonicalData from './data/portfolio.json';

export const initialPortfolioData: PortfolioData = canonicalData as unknown as PortfolioData;

export const generateCadSvgPlaceholder = (
  title: string,
  color: string = "#0b6efd",
  subtitle: string = "CAD Design"
): string => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none"><rect width="600" height="400" fill="%230f172a"/><rect x="20" y="20" width="560" height="360" rx="8" stroke="%23334155" stroke-width="2" stroke-dasharray="6 6"/><circle cx="300" cy="180" r="75" stroke="${encodeURIComponent(color)}" stroke-width="3" fill="%231e293b"/><path d="M225 180h150M300 105v150M247 127l106 106M247 233l106-106" stroke="${encodeURIComponent(color)}" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="300" cy="180" r="30" stroke="${encodeURIComponent(color)}" stroke-width="2" fill="%230f172a"/><text x="300" y="310" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="bold" fill="%23f8fafc">${encodeURIComponent(title)}</text><text x="300" y="335" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="${encodeURIComponent(color)}">${encodeURIComponent(subtitle)}</text></svg>`;
