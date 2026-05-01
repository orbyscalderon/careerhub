'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  Megaphone,
  Handshake,
  Package,
  BarChart3,
  Server,
  Headphones,
  DollarSign,
  Users,
  Cpu,
  GraduationCap,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import type { Category } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Engineering: Code2,
  Design: Palette,
  Marketing: Megaphone,
  Sales: Handshake,
  Product: Package,
  'Data Science': BarChart3,
  DevOps: Server,
  'Customer Support': Headphones,
  Finance: DollarSign,
  'Human Resources': Users,
};

const FALLBACK_ICONS: React.ElementType[] = [Cpu, GraduationCap, Package, BarChart3];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CategoryGrid() {
  const { setSelectedCategory, navigate } = useAppStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || data);
        } else {
          // Fallback to default categories
          const defaultCategories: Category[] = [
            'Engineering', 'Design', 'Marketing', 'Sales', 'Product',
            'Data Science', 'DevOps', 'Customer Support', 'Finance', 'Human Resources',
          ].map((name, i) => ({
            id: `cat-${i}`,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            description: null,
            icon: null,
            jobCount: Math.floor(Math.random() * 50) + 10,
          }));
          setCategories(defaultCategories);
        }
      } catch {
        // silent fallback
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category.name);
    navigate('jobs');
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {categories.map((cat, index) => {
        const IconComponent = CATEGORY_ICONS[cat.name] || FALLBACK_ICONS[index % FALLBACK_ICONS.length];
        return (
          <motion.div key={cat.id} variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card
              className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-emerald-200"
              onClick={() => handleCategoryClick(cat)}
            >
              <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{cat.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {cat.jobCount} {cat.jobCount === 1 ? 'job' : 'jobs'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
