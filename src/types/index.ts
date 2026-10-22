export interface HeroSection {
  name: string;
  title: string;
  bio: string;
  description?: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  heroImage: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  icon?: string;
  skills: string[];
  description?: string;
}

export interface ProfileSection {
  title: string;
  bio1: string;
  bio2: string;
  skills: string[];
  skillCategories?: SkillCategory[];
  profileImage: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  location: string;
  linkedinUrl: string;
  instagramUrl: string;
  formspreeUrl: string;
}

export interface SettingsConfig {
  siteTitle: string;
  brandSubtitle: string;
  adminEmail: string;
  resumeUrl: string;
  resumeFileName?: string;
}

export interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category?: string;
  categoryLabel?: string;
  objective?: string;
  mechanicalConcept?: string;
  dateRange?: string;
  date?: string;
  role?: string;
  teamSize?: string;
  tools: string[];
  achievements: string[];
  outcomes?: string[];
  imageUrl: string;
  videoUrl?: string;
  videoFileName?: string;
  videoFileSize?: string;
  videoBtnText?: string;
  cadFileUrl?: string;
  isExtra?: boolean;
}

export interface EducationItem {
  id: string;
  yearRange: string;
  institution: string;
  branch: string;
  cgpa?: string;
  percentage?: string;
  status?: string;
}

export interface InternshipItem {
  id: string;
  number: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  points: string[];
  imageUrl: string;
}

export interface AwardItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  issuer?: string;
  date?: string;
  category?: 'certification' | 'award' | 'honor' | 'service';
  isExtra?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel?: string;
  badgeColor?: string;
  imageUrl: string;
  software?: string;
  cadLink?: string;
  cadLinkText?: string;
  mediaUrl?: string;
  mediaType: "image" | "video";
}

export interface HomeSectionsConfig {
  expertiseBadge: string;
  expertiseTitle: string;
  expertiseSubtitle: string;
  projectsBadge: string;
  projectsTitle: string;
  ctaBadge: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBtnText: string;
}

export interface PortfolioData {
  hero: HeroSection;
  profile: ProfileSection;
  contact: ContactInfo;
  settings: SettingsConfig;
  expertise: ExpertiseItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  internships: InternshipItem[];
  awards: AwardItem[];
  galleryItems: GalleryItem[];
  homeSections: HomeSectionsConfig;
  updatedAt?: string;
}

export interface VisitorUser {
  uid: string;
  displayName: string;
  email: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  createdAt: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface LocalAssetMetadata {
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileExtension: string;
  repositoryPath: string;
  isCommitted: boolean;
  previewUrl?: string;
}
