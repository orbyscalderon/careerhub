'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import {
  JOB_CATEGORIES,
  LOCATION_TYPES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
} from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const locationLabels: Record<string, string> = {
  REMOTE: 'Remote',
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
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

export default function JobFilters() {
  const {
    searchQuery,
    selectedCategory,
    selectedLocationType,
    selectedJobType,
    selectedExperienceLevel,
    setSearchQuery,
    setSelectedCategory,
    setSelectedLocationType,
    setSelectedJobType,
    setSelectedExperienceLevel,
    resetFilters,
  } = useAppStore();

  const hasActiveFilters =
    searchQuery || selectedCategory || selectedLocationType || selectedJobType || selectedExperienceLevel;

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
          Filters
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs text-muted-foreground">
            <X className="mr-1 h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search jobs by title, company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdowns Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val === 'all' ? '' : val)}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {JOB_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocationType} onValueChange={(val) => setSelectedLocationType(val === 'all' ? '' : val)}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Any Location Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Location Type</SelectItem>
            {LOCATION_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{locationLabels[type]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedJobType} onValueChange={(val) => setSelectedJobType(val === 'all' ? '' : val)}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Any Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Job Type</SelectItem>
            {JOB_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{jobTypeLabels[type]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedExperienceLevel} onValueChange={(val) => setSelectedExperienceLevel(val === 'all' ? '' : val)}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Any Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Experience</SelectItem>
            {EXPERIENCE_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>{experienceLabels[level]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active filter tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5">
          {searchQuery && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery('')} className="hover:text-emerald-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('')} className="hover:text-emerald-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedLocationType && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              {locationLabels[selectedLocationType]}
              <button onClick={() => setSelectedLocationType('')} className="hover:text-emerald-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedJobType && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              {jobTypeLabels[selectedJobType]}
              <button onClick={() => setSelectedJobType('')} className="hover:text-emerald-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedExperienceLevel && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              {experienceLabels[selectedExperienceLevel]}
              <button onClick={() => setSelectedExperienceLevel('')} className="hover:text-emerald-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
