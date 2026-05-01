'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  Calendar,
  Eye,
  User,
  BookOpen,
  Clock,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { timeAgo } from '@/lib/helpers';
import type { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface BlogDetailProps {
  postSlug: string;
}

export default function BlogDetail({ postSlug }: BlogDetailProps) {
  const { navigate } = useAppStore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog/${postSlug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        }
      } catch {
        // silently handle
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="aspect-[2/1] w-full rounded-xl" />
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="mt-4 text-lg font-semibold">Post not found</p>
        <p className="mt-1 text-sm text-muted-foreground">The blog post may have been removed.</p>
        <Button onClick={() => navigate('blog')} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back */}
      <Button variant="ghost" size="sm" onClick={() => navigate('blog')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Button>

      <article className="mx-auto max-w-3xl">
        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {post.category && (
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
              {post.category}
            </Badge>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {post.viewCount} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.publishedAt ? timeAgo(new Date(post.publishedAt)) : 'Draft'}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        {/* Author */}
        {post.author && (
          <div className="mt-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-semibold">
                {post.author.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name || 'CareerHub Team'}</p>
              <p className="text-xs text-muted-foreground">{post.author.email}</p>
            </div>
          </div>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mt-6 overflow-hidden rounded-xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <Separator className="my-6" />

        {/* Content */}
        <div className="prose prose-sm max-w-none leading-relaxed
          prose-headings:text-foreground prose-headings:font-semibold
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-li:text-muted-foreground prose-strong:text-foreground
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
          prose-code:text-emerald-600 prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-xs
          prose-blockquote:border-emerald-500 prose-blockquote:text-muted-foreground
          prose-img:rounded-xl">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Related Posts Placeholder */}
      <div className="mx-auto max-w-3xl">
        <Separator className="my-8" />
        <h2 className="text-xl font-semibold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="aspect-[16/9] bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-emerald-200" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
