'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import JobCard from './JobCard';
import AdSlot from './AdSlot';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { Job } from '@/lib/types';

interface JobListProps {
  featuredOnly?: boolean;
}

export default function JobList({ featuredOnly = false }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const {
    searchQuery, selectedCategory, selectedLocationType, selectedJobType, selectedExperienceLevel,
  } = useAppStore();

  const fetchJobs = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(pageNum));
      params.set('limit', '12');
      if (featuredOnly) params.set('featured', 'true');
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedLocationType) params.set('locationType', selectedLocationType);
      if (selectedJobType) params.set('jobType', selectedJobType);
      if (selectedExperienceLevel) params.set('experienceLevel', selectedExperienceLevel);

      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      const pag = data.pagination || data;
      setTotal(pag.total || data.total || 0);
      setTotalPages(pag.totalPages || Math.ceil((pag.total || data.total || 0) / 12) || 1);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  }, [featuredOnly, searchQuery, selectedCategory, selectedLocationType, selectedJobType, selectedExperienceLevel]);

  useEffect(() => {
    setPage(1);
    fetchJobs(1);
  }, [fetchJobs]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchJobs(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-3 flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-16 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Try adjusting your search criteria or filters to find more opportunities.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {!featuredOnly && total > 0 && (
        <p className="mb-4 text-sm text-muted-foreground">
          Showing {((page - 1) * 12) + 1}–{Math.min(page * 12, total)} of {total} jobs
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job, index) => (
          <div key={job.id}>
            <JobCard job={job} />
            {/* Insert ad slot every 5 items (after index 4, 9, 14, etc.) */}
            {(index + 1) % 5 === 0 && index < jobs.length - 1 && (
              <div className="mt-4 md:col-span-2">
                <AdSlot position="list" size="rectangle" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Pagination */}
      {!featuredOnly && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, i, arr) => (
                <span key={p} className="flex items-center gap-1">
                  {i > 0 && arr[i - 1] !== p - 1 && <span className="px-1 text-muted-foreground">...</span>}
                  <Button
                    variant={p === page ? 'default' : 'outline'}
                    size="sm"
                    className={p === page ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </Button>
                </span>
              ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
