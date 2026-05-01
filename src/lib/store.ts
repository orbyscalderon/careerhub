import { create } from 'zustand';
import type { AuthUser } from '@/lib/auth';
import { getStoredSession, setStoredSession, clearStoredSession } from '@/lib/auth';

export type AppView =
  | 'home'
  | 'jobs'
  | 'job-detail'
  | 'job-alerts'
  | 'blog'
  | 'blog-detail'
  | 'admin'
  | 'admin-jobs'
  | 'admin-blog'
  | 'admin-applications'
  | 'legal-privacy'
  | 'legal-terms'
  | 'legal-cookies';

interface AppState {
  // Navigation
  currentView: AppView;
  selectedJobId: string | null;
  selectedPostSlug: string | null;
  navigate: (view: AppView) => void;
  viewJob: (jobId: string) => void;
  viewPost: (slug: string) => void;

  // Auth
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  login: (user: AuthUser) => void;
  logout: () => void;

  // Search & Filters
  searchQuery: string;
  selectedCategory: string;
  selectedLocationType: string;
  selectedJobType: string;
  selectedExperienceLevel: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedLocationType: (type: string) => void;
  setSelectedJobType: (type: string) => void;
  setSelectedExperienceLevel: (level: string) => void;
  resetFilters: () => void;

  // Mobile
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  currentView: 'home',
  selectedJobId: null,
  selectedPostSlug: null,
  navigate: (view) => set({ currentView: view, selectedJobId: null, selectedPostSlug: null }),
  viewJob: (jobId) => set({ currentView: 'job-detail', selectedJobId: jobId }),
  viewPost: (slug) => set({ currentView: 'blog-detail', selectedPostSlug: slug }),

  // Auth - initialize from stored session
  user: null,
  setUser: (user) => set({ user }),
  login: (user) => {
    setStoredSession(user);
    set({ user });
  },
  logout: () => {
    clearStoredSession();
    set({ user: null, currentView: 'home' });
  },

  // Search & Filters
  searchQuery: '',
  selectedCategory: '',
  selectedLocationType: '',
  selectedJobType: '',
  selectedExperienceLevel: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedLocationType: (type) => set({ selectedLocationType: type }),
  setSelectedJobType: (type) => set({ selectedJobType: type }),
  setSelectedExperienceLevel: (level) => set({ selectedExperienceLevel: level }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedCategory: '',
      selectedLocationType: '',
      selectedJobType: '',
      selectedExperienceLevel: '',
    }),

  // Mobile
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));

// Initialize auth from stored session (client-side only)
if (typeof window !== 'undefined') {
  const session = getStoredSession();
  if (session) {
    useAppStore.getState().setUser(session.user);
  }
}
