'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Briefcase, Building2, Users, FileCheck2 } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

function StatItem({ icon: Icon, value, label, suffix = '' }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <Icon className="h-7 w-7" />
      </div>
      <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {isInView ? <AnimatedCounter value={value} suffix={suffix} /> : `0${suffix}`}
      </p>
      <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
    </motion.div>
  );
}

interface StatsSectionProps {
  stats?: {
    totalJobs: number;
    totalCompanies: number;
    totalCandidates: number;
    totalApplications: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const [apiStats, setApiStats] = useState(stats);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (stats) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setApiStats(data);
        }
      } catch {
        // Use defaults
      }
    }
    fetchStats();
  }, [stats]);

  const statItems = [
    {
      icon: Briefcase,
      value: apiStats?.totalJobs ?? 542,
      label: 'Jobs Posted',
      suffix: '+',
    },
    {
      icon: Building2,
      value: apiStats?.totalCompanies ?? 215,
      label: 'Companies',
      suffix: '+',
    },
    {
      icon: Users,
      value: apiStats?.totalCandidates ?? 1250,
      label: 'Candidates',
      suffix: '+',
    },
    {
      icon: FileCheck2,
      value: apiStats?.totalApplications ?? 3200,
      label: 'Applications',
      suffix: '+',
    },
  ];

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">Trusted by Professionals Worldwide</h2>
          <p className="mt-2 text-muted-foreground">
            Our platform continues to grow every day with new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4">
          {statItems.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
