export interface HeroSection {
  tagline?: string;
  headline?: string;
  name: string;
  title: string;
  description?: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  heroImage: string;
  highlights: string[];
  bio?: string;
  [key: string]: any;
}

export interface ProfileSection {
  title: string;
  bio1: string;
  bio2: string;
  skills: string[];
  profileImage: string;
  [key: string]: any;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  location: string;
  linkedinUrl: string;
  instagramUrl: string;
  formspreeUrl: string;
  [key: string]: any;
}

export interface SettingsConfig {
  adminPin: string;
  siteTitle: string;
  brandSubtitle: string;
  adminEmail: string;
  sheetDbUrl: string;
  resumeUrl: string;
  cloudinaryCloudName?: string;
  cloudinaryPreset?: string;
  [key: string]: any;
}

export interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  [key: string]: any;
}

export interface ProjectItem {
  id: string;
  title: string;
  category?: string;
  software?: string;
  date?: string;
  dateRange?: string;
  description: string;
  keyFeatures?: string[];
  imageUrl: string;
  badge?: string;
  badgeColor?: string;
  videoUrl?: string;
  videoFileName?: string;
  videoFileSize?: string;
  cadFileUrl?: string;
  externalLink?: string;
  [key: string]: any;
}

export interface EducationItem {
  id: string;
  degree?: string;
  institution: string;
  period?: string;
  description?: string;
  yearRange?: string;
  branch?: string;
  grade?: string;
  cgpa?: string;
  percentage?: string;
  status?: string;
  imageUrl?: string;
  highlights?: string[];
  [key: string]: any;
}

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  period?: string;
  description: string;
  number?: string;
  location?: string;
  duration?: string;
  points?: string[];
  keyAchievements?: string[];
  imageUrl?: string;
  [key: string]: any;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description: string;
  isExtra?: boolean;
  imageUrl?: string;
  [key: string]: any;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  software?: string;
  description: string;
  imageUrl: string;
  badgeColor?: string;
  cadLink?: string;
  cadLinkText?: string;
  mediaUrl?: string;
  mediaType: "image" | "video";
  externalLink?: string;
  [key: string]: any;
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
  [key: string]: any;
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
