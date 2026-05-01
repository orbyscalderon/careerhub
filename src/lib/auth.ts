// CareerHub - Auth Utilities
// Session management using localStorage + API authentication

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  image?: string | null;
  role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN';
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: string;
}

const SESSION_KEY = 'careerhub_session';

// Client-side session management
export function getStoredSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const session: AuthSession = JSON.parse(stored);
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function setStoredSession(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  const session: AuthSession = {
    user,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): AuthUser | null {
  const session = getStoredSession();
  return session?.user ?? null;
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'ADMIN';
}

export function isEmployer(user: AuthUser | null): boolean {
  return user?.role === 'EMPLOYER' || user?.role === 'ADMIN';
}

export function isLoggedIn(user: AuthUser | null): boolean {
  return user !== null;
}
