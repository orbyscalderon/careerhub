import { createHash } from 'crypto';

export function generateFingerprint(title: string, company: string, location: string): string {
  return createHash('md5')
    .update(`${title.toLowerCase().trim()}|${company.toLowerCase().trim()}|${location.toLowerCase().trim()}`)
    .digest('hex');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatSalary(min?: number | null, max?: number | null, currency: string = 'USD'): string {
  if (!min && !max) return 'Salary not disclosed';
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
  if (min) return `From ${formatter.format(min)}`;
  return `Up to ${formatter.format(max)}`;
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
}

export function parseJsonField<T>(field: string | null | undefined): T[] {
  if (!field) return [];
  try {
    const parsed = JSON.parse(field);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const JOB_CATEGORIES = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Product',
  'Data Science',
  'DevOps',
  'Customer Support',
  'Finance',
  'Human Resources',
] as const;

export const LOCATION_TYPES = ['REMOTE', 'ONSITE', 'HYBRID'] as const;

export const JOB_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP'] as const;

export const EXPERIENCE_LEVELS = ['JUNIOR', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE'] as const;

export const USER_ROLES = ['CANDIDATE', 'EMPLOYER', 'ADMIN'] as const;

export const APPLICATION_STATUSES = ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'ACCEPTED'] as const;

// Google AdSense - Set via environment variable: NEXT_PUBLIC_ADSENSE_CLIENT_ID
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
