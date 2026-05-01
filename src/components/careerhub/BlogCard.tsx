'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { timeAgo, parseJsonField } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Post } from '@/lib/types';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { viewPost } = useAppStore();
  const tags = parseJsonField<string[]>(post.tags);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-emerald-200"
        onClick={() => viewPost(post.slug)}
      >
        {/* Cover Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-50">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <BookOpen className="h-12 w-12 text-emerald-300" />
            </div>
          )}
          {post.category && (
            <Badge className="absolute left-3 top-3 bg-white/90 text-emerald-700 backdrop-blur-sm border-0 text-xs">
              {post.category}
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          <h3 className="text-base font-semibold leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}

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
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.publishedAt ? timeAgo(new Date(post.publishedAt)) : 'Draft'}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.viewCount}
              </span>
            </div>
            <span className="flex items-center gap-1 font-medium text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100">
              Read More
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
