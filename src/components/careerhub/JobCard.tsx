'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  DollarSign,
  Clock,
  Users,
  ExternalLink,
  Star,
  Eye,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatSalary, timeAgo, parseJsonField } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Job } from '@/lib/types';

interface JobCardProps {
  job: Job;
}

const locationTypeColors: Record<string, string> = {
  REMOTE: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  ONSITE: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
  HYBRID: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
};

const jobTypeLabels: Record<string, string> = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  FREELANCE: 'Freelance',
  INTERNSHIP: 'Internship',
};

const experienceLabels: Record<string, string> = {
  JUNIOR: 'Junior',
  MID: 'Mid-level',
  SENIOR: 'Senior',
  LEAD: 'Lead',
  EXECUTIVE: 'Executive',
};

export default function JobCard({ job }: JobCardProps) {
  const { viewJob } = useAppStore();
  const tags = parseJsonField<string[]>(job.tags);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className={`group relative cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg ${
          job.isFeatured
            ? 'border-2 border-emerald-500 ring-1 ring-emerald-500/20'
            : 'hover:border-emerald-200'
        }`}
        onClick={() => viewJob(job.id)}
      >
        {/* Featured ribbon */}
        {job.isFeatured && (
          <div className="absolute right-0 top-0 flex items-center gap-1 bg-emerald-600 px-3 py-1 text-xs font-semibold text-white rounded-bl-lg">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        )}

        {/* External badge */}
        {job.isExternal && job.sourceName && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600 border border-blue-100">
            <ExternalLink className="h-3 w-3" />
            {job.sourceName}
          </div>
        )}

        <CardContent className="p-5">
          {/* Header: Company + Title */}
          <div className="flex items-start gap-3">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="h-12 w-12 rounded-lg object-cover bg-muted"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold">
                {job.company.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold leading-tight group-hover:text-emerald-600 transition-colors">
                {job.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            {(job.salaryMin || job.salaryMax) && (
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5" />
                {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(new Date(job.publishedAt))}
            </span>
            {job.applicantCount > 0 && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {job.applicantCount} applicant{job.applicantCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="secondary" className={locationTypeColors[job.locationType] || ''}>
              {job.locationType}
            </Badge>
            <Badge variant="outline">
              {jobTypeLabels[job.jobType] || job.jobType}
            </Badge>
            <Badge variant="outline">
              {experienceLabels[job.experienceLevel] || job.experienceLevel}
            </Badge>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => viewJob(job.id)}
              className="flex-1 text-sm"
            >
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              View Details
            </Button>
            {job.applyUrl ? (
              <Button
                size="sm"
                className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
                asChild
              >
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
                onClick={() => viewJob(job.id)}
              >
                Apply Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
