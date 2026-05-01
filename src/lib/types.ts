export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  companyLogo: string | null;
  location: string;
  locationType: string;
  category: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  jobType: string;
  experienceLevel: string;
  tags: string | null;
  applyUrl: string | null;
  contactEmail: string | null;
  contactName: string | null;
  requirements: string | null;
  benefits: string | null;
  isExternal: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  sourceUrl: string | null;
  sourceName: string | null;
  viewCount: number;
  applicantCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  publisherId: string | null;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string | null;
  tags: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
  };
}

export interface Application {
  id: string;
  jobId: string;
  userId: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  coverLetter: string | null;
  resumeUrl: string | null;
  status: string;
  message: string | null;
  createdAt: string;
  updatedAt: string;
  job?: {
    id: string;
    title: string;
    company: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  jobCount: number;
}

export interface PlatformStats {
  totalJobs: number;
  totalCompanies: number;
  totalCandidates: number;
  totalApplications: number;
}
