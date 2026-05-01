'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface LegalPageProps {
  title: string;
  content: string;
}

export default function LegalPage({ title, content }: LegalPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
          <Shield className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Content */}
      <div
        className="prose prose-sm max-w-none text-muted-foreground leading-relaxed
          prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-8 prose-headings:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
          prose-li:text-muted-foreground prose-li:leading-relaxed
          prose-strong:text-foreground
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
          prose-ul:my-2 prose-ol:my-2"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
}
