import {
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc
} from 'firebase/firestore';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { db, auth, googleProvider } from '../lib/firebase';
import { PortfolioData, VisitorUser, EnquiryItem } from '../types';
import { isAuthorizedAdminEmail } from '../config/adminEmails';
import { initialPortfolioData } from '../initialData';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function isFirestoreConfigured(): boolean {
  return !!db && !!auth;
}

export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'portfolio', 'connection_test'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Please check your Firebase configuration or network status.');
    }
  }
}

// Test connection on boot
testConnection();

// Deep remove undefined fields for Firestore compatibility
function sanitizeForFirestore<T>(data: T): T {
  if (data === null || typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeForFirestore) as unknown as T;
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = typeof value === 'object' && value !== null ? sanitizeForFirestore(value) : value;
    }
  }
  return result as T;
}

const VISITOR_USER_KEY = 'aman_portfolio_visitor_user';

export function getSavedVisitorUser(): VisitorUser | null {
  try {
    const raw = localStorage.getItem(VISITOR_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveVisitorUser(user: VisitorUser | null): void {
  try {
    if (user) {
      localStorage.setItem(VISITOR_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(VISITOR_USER_KEY);
    }
  } catch (err) {
    console.error('Error caching visitor user:', err);
  }
}

export async function saveUserToFirestore(user: VisitorUser, isNew = false): Promise<void> {
  const path = `users/${user.uid}`;
  const now = new Date().toISOString();
  const isAdmin = isAuthorizedAdminEmail(user.email);
  const payload = sanitizeForFirestore({
    uid: user.uid,
    displayName: user.displayName || 'Visitor',
    email: user.email || '',
    photoURL: user.photoURL || '',
    role: isAdmin ? 'admin' : 'visitor',
    lastLoginAt: now,
    ...(isNew ? { createdAt: now } : {}),
  });

  try {
    await setDoc(doc(db, 'users', user.uid), payload, { merge: true });
    if (isAdmin) {
      // Also register in admins collection for server-side rule verification
      await setDoc(doc(db, 'admins', user.uid), payload, { merge: true });
    }
  } catch (error) {
    console.warn('Notice writing user record to Firestore:', error);
  }
}

export async function signInWithGoogle(): Promise<{ success: boolean; user?: VisitorUser; error?: string }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser: User = result.user;
    const isAdmin = isAuthorizedAdminEmail(fbUser.email);
    const visitor: VisitorUser = {
      uid: fbUser.uid,
      displayName: fbUser.displayName || 'Visitor',
      email: fbUser.email,
      photoURL: fbUser.photoURL,
      isAdmin,
    };
    await saveUserToFirestore(visitor, false);
    saveVisitorUser(visitor);
    return { success: true, user: visitor };
  } catch (error) {
    console.warn('Google Sign-in popup cancelled or error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Google Sign-in was cancelled or interrupted.',
    };
  }
}

export async function signOutVisitor(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Error signing out:', err);
  }
  saveVisitorUser(null);
}

export function onAuthUserChanged(callback: (user: VisitorUser | null) => void): () => void {
  return onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser) {
      const isAdmin = isAuthorizedAdminEmail(fbUser.email);
      const visitor: VisitorUser = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || 'Visitor',
        email: fbUser.email,
        photoURL: fbUser.photoURL,
        isAdmin,
      };
      await saveUserToFirestore(visitor, false);
      saveVisitorUser(visitor);
      callback(visitor);
    } else {
      saveVisitorUser(null);
      callback(null);
    }
  });
}

export async function loadPortfolioFromFirestore(): Promise<PortfolioData | null> {
  const path = 'portfolio/main';
  try {
    const [mainSnap, resumeSnap, projSnap, galSnap, expSnap, eduSnap, intSnap, awdSnap] = await Promise.all([
      getDoc(doc(db, 'portfolio', 'main')),
      getDoc(doc(db, 'portfolio', 'resume')),
      getDoc(doc(db, 'portfolio', 'projects')),
      getDoc(doc(db, 'portfolio', 'gallery')),
      getDoc(doc(db, 'portfolio', 'expertise')),
      getDoc(doc(db, 'portfolio', 'education')),
      getDoc(doc(db, 'portfolio', 'internships')),
      getDoc(doc(db, 'portfolio', 'awards')),
    ]);

    if (!mainSnap.exists() && !projSnap.exists()) {
      return null;
    }

    const mainData = mainSnap.exists() ? mainSnap.data() : {};
    const resumeData = resumeSnap.exists() ? resumeSnap.data() : {};
    const projData = projSnap.exists() ? projSnap.data() : {};
    const galData = galSnap.exists() ? galSnap.data() : {};
    const expData = expSnap.exists() ? expSnap.data() : {};
    const eduData = eduSnap.exists() ? eduSnap.data() : {};
    const intData = intSnap.exists() ? intSnap.data() : {};
    const awdData = awdSnap.exists() ? awdSnap.data() : {};

    const settings = {
      ...(mainData.settings || initialPortfolioData.settings),
      resumeUrl: resumeData.resumeUrl || mainData.settings?.resumeUrl || initialPortfolioData.settings.resumeUrl || '',
    };

    return {
      hero: mainData.hero || initialPortfolioData.hero,
      profile: mainData.profile || initialPortfolioData.profile,
      contact: mainData.contact || initialPortfolioData.contact,
      settings,
      homeSections: mainData.homeSections || initialPortfolioData.homeSections,
      projects: projData.projects || initialPortfolioData.projects,
      galleryItems: galData.galleryItems || initialPortfolioData.galleryItems,
      expertise: expData.expertise || initialPortfolioData.expertise,
      education: eduData.education || initialPortfolioData.education,
      internships: intData.internships || initialPortfolioData.internships,
      awards: awdData.awards || initialPortfolioData.awards,
      updatedAt: mainData.updatedAt || new Date().toISOString(),
    } as PortfolioData;
  } catch (error) {
    console.warn('Notice reading portfolio from Firestore:', error);
    return null;
  }
}

export async function savePortfolioToFirestore(data: PortfolioData): Promise<boolean> {
  const path = 'portfolio/main';
  try {
    const updatedAt = new Date().toISOString();
    const settingsWithoutResume: Record<string, any> = { ...(data.settings || {}) };
    const resumeUrl = settingsWithoutResume.resumeUrl || '';
    delete settingsWithoutResume.resumeUrl;

    await Promise.all([
      setDoc(
        doc(db, 'portfolio', 'main'),
        sanitizeForFirestore({
          hero: data.hero,
          profile: data.profile,
          contact: data.contact,
          settings: settingsWithoutResume,
          homeSections: data.homeSections,
          updatedAt,
        }),
        { merge: true }
      ),
      setDoc(
        doc(db, 'portfolio', 'resume'),
        sanitizeForFirestore({ resumeUrl }),
        { merge: true }
      ),
      setDoc(
        doc(db, 'portfolio', 'projects'),
        sanitizeForFirestore({ projects: data.projects }),
        { merge: true }
      ),
      setDoc(
        doc(db, 'portfolio', 'gallery'),
        sanitizeForFirestore({ galleryItems: data.galleryItems }),
        { merge: true }
      ),
      setDoc(
        doc(db, 'portfolio', 'expertise'),
        sanitizeForFirestore({ expertise: data.expertise }),
        { merge: true }
      ),
      setDoc(
        doc(db, 'portfolio', 'education'),
        sanitizeForFirestore({ education: data.education }),
        { merge: true }
      ),
      setDoc(
        doc(db, 'portfolio', 'internships'),
        sanitizeForFirestore({ internships: data.internships }),
        { merge: true }
      ),
      setDoc(
        doc(db, 'portfolio', 'awards'),
        sanitizeForFirestore({ awards: data.awards }),
        { merge: true }
      ),
    ]);
    return true;
  } catch (error) {
    console.error('Error saving portfolio to Firestore:', error);
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToPortfolio(
  onUpdate: (data: PortfolioData) => void,
  onError?: (err: boolean) => void
): () => void {
  const docRef = doc(db, 'portfolio', 'main');
  return onSnapshot(
    docRef,
    async () => {
      const fullData = await loadPortfolioFromFirestore();
      if (fullData) {
        onUpdate(fullData);
      }
    },
    (err) => {
      console.warn('Firestore subscription notice:', err);
      if (onError) onError(false);
    }
  );
}

export async function submitEnquiryToFirestore(enquiry: Omit<EnquiryItem, 'id' | 'createdAt'>): Promise<boolean> {
  const path = 'enquiries';
  try {
    const payload = sanitizeForFirestore({
      ...enquiry,
      createdAt: new Date().toISOString(),
    });
    await addDoc(collection(db, 'enquiries'), payload);
    return true;
  } catch (error) {
    console.error('Error submitting enquiry to Firestore:', error);
    return false;
  }
}
