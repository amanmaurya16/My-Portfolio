import canonicalDataRaw from '../data/portfolio.json';
import { PortfolioData, ValidationResult } from '../types';

export const PORTFOLIO_DRAFT_KEY = 'aman_maurya_portfolio_draft_v2';

/**
 * Returns an isolated deep copy of the canonical portfolio data committed to the repository.
 * This guarantees the committed source data is never mutated by runtime interactions.
 */
export function getCanonicalPortfolioData(): PortfolioData {
  return JSON.parse(JSON.stringify(canonicalDataRaw)) as PortfolioData;
}

/**
 * Checks whether a local browser draft exists in localStorage.
 */
export function hasLocalDraft(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean(localStorage.getItem(PORTFOLIO_DRAFT_KEY));
  } catch {
    return false;
  }
}

/**
 * Retrieves metadata about the browser's local draft.
 */
export function getDraftMetadata(): { exists: boolean; lastSaved?: string; sizeBytes?: number } {
  if (typeof window === 'undefined') return { exists: false };
  try {
    const raw = localStorage.getItem(PORTFOLIO_DRAFT_KEY);
    if (!raw) return { exists: false };
    const parsed = JSON.parse(raw);
    return {
      exists: true,
      lastSaved: parsed.updatedAt || undefined,
      sizeBytes: new Blob([raw]).size,
    };
  } catch {
    return { exists: false };
  }
}

/**
 * Deeply validates whether an unknown object conforms to the PortfolioData schema.
 * Collects all encountered validation issues rather than failing on the first one.
 */
export function validatePortfolioData(obj: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return {
      isValid: false,
      errors: ['Portfolio data root must be a valid JSON object.'],
    };
  }

  const p = obj as Record<string, unknown>;

  // 1. Hero Section Validation
  if (!p.hero || typeof p.hero !== 'object') {
    errors.push('Missing or invalid "hero" section object.');
  } else {
    const hero = p.hero as Record<string, unknown>;
    if (!hero.name || typeof hero.name !== 'string' || hero.name.trim().length === 0) {
      errors.push('Hero section requires a non-empty "name" string.');
    }
    if (!hero.title || typeof hero.title !== 'string') {
      errors.push('Hero section requires a "title" string.');
    }
    if (!hero.bio || typeof hero.bio !== 'string') {
      errors.push('Hero section requires a "bio" string.');
    }
  }

  // 2. Profile Section Validation
  if (!p.profile || typeof p.profile !== 'object') {
    errors.push('Missing or invalid "profile" section object.');
  } else {
    const profile = p.profile as Record<string, unknown>;
    if (!profile.title || typeof profile.title !== 'string') {
      errors.push('Profile section requires a "title" string.');
    }
    if (!profile.bio1 || typeof profile.bio1 !== 'string') {
      errors.push('Profile section requires "bio1" paragraph string.');
    }
    if (!Array.isArray(profile.skills)) {
      errors.push('Profile "skills" must be an array of competency strings.');
    }
  }

  // 3. Contact Info Validation
  if (!p.contact || typeof p.contact !== 'object') {
    errors.push('Missing or invalid "contact" section object.');
  } else {
    const contact = p.contact as Record<string, unknown>;
    if (!contact.email || typeof contact.email !== 'string') {
      errors.push('Contact info requires an "email" string.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      warnings.push(`Contact email "${contact.email}" does not appear to be a standard email format.`);
    }
  }

  // 4. Projects Array Validation & ID Uniqueness
  if (!Array.isArray(p.projects)) {
    errors.push('Field "projects" must be an array of project items.');
  } else {
    const projectIds = new Set<string>();
    p.projects.forEach((proj, idx) => {
      if (!proj || typeof proj !== 'object') {
        errors.push(`Project at index [${idx}] is not a valid object.`);
        return;
      }
      const item = proj as Record<string, unknown>;
      if (!item.id || typeof item.id !== 'string') {
        errors.push(`Project at index [${idx}] is missing a unique "id" string.`);
      } else {
        if (projectIds.has(item.id)) {
          errors.push(`Duplicate project id found: "${item.id}".`);
        }
        projectIds.add(item.id);
      }
      if (!item.title || typeof item.title !== 'string') {
        errors.push(`Project "${item.id || idx}" is missing a "title" string.`);
      }
      if (!item.description || typeof item.description !== 'string') {
        errors.push(`Project "${item.id || idx}" is missing a "description" string.`);
      }
      if (!Array.isArray(item.tools)) {
        errors.push(`Project "${item.id || idx}" requires a "tools" array.`);
      }
    });
  }

  // 5. Education Array Validation
  if (!Array.isArray(p.education)) {
    errors.push('Field "education" must be an array.');
  } else {
    const eduIds = new Set<string>();
    p.education.forEach((edu, idx) => {
      if (!edu || typeof edu !== 'object') {
        errors.push(`Education record at index [${idx}] is not a valid object.`);
        return;
      }
      const item = edu as Record<string, unknown>;
      if (!item.id || typeof item.id !== 'string') {
        errors.push(`Education item [${idx}] requires an "id" string.`);
      } else {
        if (eduIds.has(item.id)) {
          errors.push(`Duplicate education id found: "${item.id}".`);
        }
        eduIds.add(item.id);
      }
      if (!item.institution || typeof item.institution !== 'string') {
        errors.push(`Education item "${item.id || idx}" is missing "institution" name.`);
      }
    });
  }

  // 6. Internships Array Validation
  if (!Array.isArray(p.internships)) {
    errors.push('Field "internships" must be an array.');
  } else {
    const intIds = new Set<string>();
    p.internships.forEach((itemRaw, idx) => {
      if (!itemRaw || typeof itemRaw !== 'object') {
        errors.push(`Internship at index [${idx}] is not a valid object.`);
        return;
      }
      const item = itemRaw as Record<string, unknown>;
      if (!item.id || typeof item.id !== 'string') {
        errors.push(`Internship [${idx}] requires an "id" string.`);
      } else {
        if (intIds.has(item.id)) {
          errors.push(`Duplicate internship id found: "${item.id}".`);
        }
        intIds.add(item.id);
      }
      if (!item.company || typeof item.company !== 'string') {
        errors.push(`Internship "${item.id || idx}" is missing "company" string.`);
      }
      if (!item.role || typeof item.role !== 'string') {
        errors.push(`Internship "${item.id || idx}" is missing "role" string.`);
      }
    });
  }

  // 7. Awards & Certifications Array Validation
  if (!Array.isArray(p.awards)) {
    errors.push('Field "awards" must be an array.');
  } else {
    const awardIds = new Set<string>();
    p.awards.forEach((itemRaw, idx) => {
      if (!itemRaw || typeof itemRaw !== 'object') {
        errors.push(`Award record at index [${idx}] is not a valid object.`);
        return;
      }
      const item = itemRaw as Record<string, unknown>;
      if (!item.id || typeof item.id !== 'string') {
        errors.push(`Award [${idx}] requires an "id" string.`);
      } else {
        if (awardIds.has(item.id)) {
          errors.push(`Duplicate award id found: "${item.id}".`);
        }
        awardIds.add(item.id);
      }
      if (!item.title || typeof item.title !== 'string') {
        errors.push(`Award "${item.id || idx}" is missing a "title" string.`);
      }
    });
  }

  // 8. Gallery Items Validation
  if (!Array.isArray(p.galleryItems)) {
    errors.push('Field "galleryItems" must be an array.');
  } else {
    const galIds = new Set<string>();
    p.galleryItems.forEach((itemRaw, idx) => {
      if (!itemRaw || typeof itemRaw !== 'object') {
        errors.push(`Gallery item at index [${idx}] is not a valid object.`);
        return;
      }
      const item = itemRaw as Record<string, unknown>;
      if (!item.id || typeof item.id !== 'string') {
        errors.push(`Gallery item [${idx}] requires an "id" string.`);
      } else {
        if (galIds.has(item.id)) {
          errors.push(`Duplicate gallery item id found: "${item.id}".`);
        }
        galIds.add(item.id);
      }
      if (!item.title || typeof item.title !== 'string') {
        errors.push(`Gallery item "${item.id || idx}" is missing a "title" string.`);
      }
      if (!item.category || typeof item.category !== 'string') {
        errors.push(`Gallery item "${item.id || idx}" is missing a "category" string.`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Sanitizes and safely fills missing optional fields with defaults from canonical data.
 */
export function sanitizePortfolioData(raw: Partial<PortfolioData>): PortfolioData {
  const canonical = getCanonicalPortfolioData();

  return {
    hero: { ...canonical.hero, ...(raw.hero || {}) },
    profile: { ...canonical.profile, ...(raw.profile || {}) },
    contact: { ...canonical.contact, ...(raw.contact || {}) },
    settings: { ...canonical.settings, ...(raw.settings || {}) },
    homeSections: { ...canonical.homeSections, ...(raw.homeSections || {}) },
    expertise: Array.isArray(raw.expertise) && raw.expertise.length > 0 ? raw.expertise : canonical.expertise,
    projects: Array.isArray(raw.projects) && raw.projects.length > 0 ? raw.projects : canonical.projects,
    education: Array.isArray(raw.education) && raw.education.length > 0 ? raw.education : canonical.education,
    internships: Array.isArray(raw.internships) && raw.internships.length > 0 ? raw.internships : canonical.internships,
    awards: Array.isArray(raw.awards) && raw.awards.length > 0 ? raw.awards : canonical.awards,
    galleryItems: Array.isArray(raw.galleryItems) && raw.galleryItems.length > 0 ? raw.galleryItems : canonical.galleryItems,
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

/**
 * Imports and validates an incoming JSON string.
 * Rejects malformed or invalid schemas without destroying existing browser drafts or canonical state.
 */
export function importAndValidatePortfolioJson(
  jsonString: string
): { success: boolean; data?: PortfolioData; errors?: string[]; warnings?: string[] } {
  try {
    const parsed = JSON.parse(jsonString);
    const validation = validatePortfolioData(parsed);

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        warnings: validation.warnings,
      };
    }

    const sanitized = sanitizePortfolioData(parsed);
    return {
      success: true,
      data: sanitized,
      warnings: validation.warnings,
    };
  } catch (err) {
    return {
      success: false,
      errors: [`JSON parse failure: ${err instanceof Error ? err.message : 'Invalid JSON file syntax'}`],
    };
  }
}

/**
 * Loads current portfolio data. If a local browser draft exists and is valid, loads it;
 * otherwise safely loads the repository canonical data.
 */
export function loadCurrentPortfolioData(): {
  data: PortfolioData;
  isDraft: boolean;
  draftTimestamp?: string;
} {
  if (typeof window === 'undefined') {
    return { data: getCanonicalPortfolioData(), isDraft: false };
  }

  try {
    const stored = localStorage.getItem(PORTFOLIO_DRAFT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const validation = validatePortfolioData(parsed);
      if (validation.isValid) {
        return {
          data: sanitizePortfolioData(parsed),
          isDraft: true,
          draftTimestamp: parsed.updatedAt || undefined,
        };
      } else {
        console.warn('Existing browser draft failed schema validation; discarding corrupt draft.');
        localStorage.removeItem(PORTFOLIO_DRAFT_KEY);
      }
    }
  } catch (err) {
    console.warn('Failed to parse local draft, falling back to repository data:', err);
  }

  return { data: getCanonicalPortfolioData(), isDraft: false };
}

/**
 * Saves a browser draft to localStorage with an ISO timestamp.
 */
export function saveDraftPortfolioData(data: PortfolioData): { success: boolean; error?: string } {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Cannot save draft in non-browser environment.' };
  }
  try {
    const sanitized = sanitizePortfolioData(data);
    sanitized.updatedAt = new Date().toISOString();
    localStorage.setItem(PORTFOLIO_DRAFT_KEY, JSON.stringify(sanitized));
    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'LocalStorage write failed (storage quota exceeded)';
    console.error('Error saving browser draft to localStorage:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Clears any browser draft from localStorage and resets state to repository canonical data.
 */
export function resetToCanonicalPortfolioData(): PortfolioData {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(PORTFOLIO_DRAFT_KEY);
    } catch (e) {
      console.warn('Failed to clear draft key:', e);
    }
  }
  return getCanonicalPortfolioData();
}

/**
 * Exports current portfolio data as a downloadable formatted JSON backup file.
 */
export function exportPortfolioBackup(data?: PortfolioData): void {
  const payload = data || getCanonicalPortfolioData();
  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  anchor.href = url;
  anchor.download = `Aman_Maurya_Mechanical_Portfolio_${dateStr}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a human-readable publishing checklist and verification manifest.
 */
export function exportPublishingChecklist(data?: PortfolioData): void {
  const payload = data || getCanonicalPortfolioData();
  const validation = validatePortfolioData(payload);
  const dateStr = new Date().toISOString().split('T')[0];
  const timeStr = new Date().toUTCString();

  const markdown = `# Aman Maurya Mechanical Portfolio — Pre-Deployment Checklist
Generated: ${timeStr}
Status: ${validation.isValid ? '✅ VALIDATED FOR PRODUCTION' : '⚠️ VALIDATION WARNINGS FOUND'}

## 1. Schema Validation Summary
- Total Errors: ${validation.errors.length}
- Status: ${validation.isValid ? 'Passed all structure, array, and ID checks.' : validation.errors.join('; ')}

## 2. Portfolio Records Count
- Mechanical Projects: ${payload.projects.length}
- Education Timeline: ${payload.education.length}
- Internships & Industrial Training: ${payload.internships.length}
- Awards & Certifications: ${payload.awards.length}
- CAD Repository Assets: ${payload.galleryItems.length}

## 3. Deployment Instructions (GitHub Pages)
1. Replace \`src/data/portfolio.json\` with your exported JSON file.
2. If new images or certificates were added, place them in \`public/assets/\`.
3. Run local validation:
   \`\`\`bash
   npm run lint
   npm run build
   \`\`\`
4. Commit and push to deploy:
   \`\`\`bash
   git add src/data/portfolio.json public/assets/
   git commit -m "Update mechanical portfolio data (${dateStr})"
   git push origin main
   \`\`\`
5. Check deployment status at:
   https://github.com/amanmaurya16/My-Portfolio/actions

## 4. Rollback Plan
If an unexpected issue occurs on GitHub Pages:
\`\`\`bash
git revert HEAD
git push origin main
\`\`\`
`;

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `DEPLOYMENT_CHECKLIST_${dateStr}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}
