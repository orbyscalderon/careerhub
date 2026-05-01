'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  ExternalLink,
  Share2,
  Eye,
  Users,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Star,
  Calendar,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatSalary, timeAgo, parseJsonField } from '@/lib/helpers';
import type { Job } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import ApplyDialog from './ApplyDialog';

const locationTypeColors: Record<string, string> = {
  REMOTE: 'bg-emerald-100 text-emerald-700',
  ONSITE: 'bg-orange-100 text-orange-700',
  HYBRID: 'bg-purple-100 text-purple-700',
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

interface JobDetailProps {
  jobId: string;
}

export default function JobDetail({ jobId }: JobDetailProps) {
  const { navigate } = useAppStore();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        }
      } catch {
        // silently handle
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="space-y-2 mt-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold">Job not found</p>
        <p className="mt-1 text-sm text-muted-foreground">The job listing may have been removed.</p>
        <Button onClick={() => navigate('jobs')} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
      </div>
    );
  }

  const requirements = parseJsonField<string[]>(job.requirements);
  const benefits = parseJsonField<string[]>(job.benefits);
  const tags = parseJsonField<string[]>(job.tags);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => navigate('jobs')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <div>
            <div className="flex items-start gap-4">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="h-16 w-16 rounded-xl object-cover bg-muted shrink-0" />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 text-xl font-bold">
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold sm:text-3xl">{job.title}</h1>
                  {job.isFeatured && (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      <Star className="mr-1 h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                  )}
                  {job.isExternal && job.sourceName && (
                    <Badge variant="outline" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {job.sourceName}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-lg text-muted-foreground">{job.company}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {timeAgo(new Date(job.publishedAt))}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    {job.viewCount} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {job.applicantCount} applicants
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge className={locationTypeColors[job.locationType] || ''}>{job.locationType}</Badge>
                  <Badge variant="outline">{jobTypeLabels[job.jobType] || job.jobType}</Badge>
                  <Badge variant="outline">{experienceLabels[job.experienceLevel] || job.experienceLevel}</Badge>
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {job.applyUrl ? (
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                    Apply on {job.sourceName || 'External Site'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button onClick={() => setApplyOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Apply Now
                </Button>
              )}
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed
              prose-headings:text-foreground prose-headings:font-semibold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground prose-strong:text-foreground
              prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
              prose-code:text-emerald-600 prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-xs">
              <ReactMarkdown>
                {job.description}
              </ReactMarkdown>
            </div>
          </div>

          {/* Requirements */}
          {requirements.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(job.salaryMin || job.salaryMax) && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="text-sm font-medium">{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Briefcase className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Job Type</p>
                  <p className="text-sm font-medium">{jobTypeLabels[job.jobType]}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                  <GraduationCap className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-sm font-medium">{experienceLabels[job.experienceLevel]}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="text-sm font-medium">{job.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Posted</p>
                  <p className="text-sm font-medium">{timeAgo(new Date(job.publishedAt))}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          {benefits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Sidebar Apply CTA */}
          {!job.applyUrl && (
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-center">Interested in this role?</h3>
                <p className="mt-1 text-sm text-muted-foreground text-center">
                  Apply now and get noticed by the hiring team.
                </p>
                <Button
                  onClick={() => setApplyOpen(true)}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Apply Dialog */}
      {!job.applyUrl && (
        <ApplyDialog
          jobId={job.id}
          jobTitle={job.title}
          contactEmail={job.contactEmail}
          applyUrl={job.applyUrl}
          open={applyOpen}
          onOpenChange={setApplyOpen}
        />
      )}
    </motion.div>
  );
}
