'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { JOB_CATEGORIES } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const STATS = [
  { icon: Briefcase, value: '500+', label: 'Jobs Posted' },
  { icon: Building2, value: '200+', label: 'Companies' },
  { icon: TrendingUp, value: '50+', label: 'Categories' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HeroSection() {
  const { navigate, setSearchQuery, setSelectedCategory } = useAppStore();
  const [heroSearch, setHeroSearch] = useState('');
  const [heroCategory, setHeroCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch) setSearchQuery(heroSearch);
    if (heroCategory) setSelectedCategory(heroCategory);
    navigate('jobs');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Your dream career is just a search away
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Find Your{' '}
            <span className="bg-gradient-to-r from-emerald-200 to-teal-100 bg-clip-text text-transparent">
              Dream Career
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-lg text-emerald-100/90 leading-relaxed"
          >
            Discover thousands of job opportunities from top companies worldwide.
            Whether you&apos;re looking for remote work or onsite positions, we&apos;ve got you covered.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            variants={item}
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl shadow-black/10 sm:flex-row sm:gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Job title, keyword, or company..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="h-12 border-0 bg-transparent pl-10 pr-4 text-base shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex gap-2">
              <Select value={heroCategory} onValueChange={setHeroCategory}>
                <SelectTrigger className="h-12 w-full min-w-[160px] border-0 bg-muted/50 shadow-none sm:w-auto">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {JOB_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="h-12 bg-emerald-600 px-6 text-white hover:bg-emerald-700 shrink-0"
              >
                <Search className="mr-2 h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">Search Jobs</span>
                <ArrowRight className="h-4 w-4 sm:hidden" />
              </Button>
            </div>
          </motion.form>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-center gap-8 sm:gap-12"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-emerald-200/80">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
