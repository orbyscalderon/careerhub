import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      content,
      excerpt,
      coverImage,
      category,
      tags,
      isPublished = false,
      authorId,
    } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, authorId' },
        { status: 400 }
      );
    }

    // Generate slug from title
    let slug = slugify(title);

    // Ensure slug uniqueness
    const existingPost = await db.post.findUnique({ where: { slug } });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        category,
        tags: tags ? JSON.stringify(tags) : null,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
        authorId,
      },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return NextResponse.json({ message: 'Blog post created successfully', post }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/admin/blog] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
