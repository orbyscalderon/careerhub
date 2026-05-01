import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/helpers';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(request, params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(request, params);
}

async function handleUpdate(
  request: NextRequest,
  params: Promise<{ id: string }>
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingPost = await db.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Build update payload
    const data: Record<string, unknown> = {};

    if (body.title !== undefined) {
      data.title = body.title;
      // Regenerate slug if title changed
      let newSlug = slugify(body.title);
      if (newSlug !== existingPost.slug) {
        const slugExists = await db.post.findUnique({ where: { slug: newSlug } });
        if (slugExists) newSlug = `${newSlug}-${Date.now()}`;
        data.slug = newSlug;
      }
    }

    if (body.content !== undefined) data.content = body.content;
    if (body.excerpt !== undefined) data.excerpt = body.excerpt;
    if (body.coverImage !== undefined) data.coverImage = body.coverImage;
    if (body.category !== undefined) data.category = body.category;
    if (body.tags !== undefined) data.tags = Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags;
    if (body.isPublished !== undefined) {
      data.isPublished = body.isPublished;
      // Set publishedAt when first publishing
      if (body.isPublished && !existingPost.isPublished) {
        data.publishedAt = new Date();
      } else if (!body.isPublished) {
        data.publishedAt = null;
      }
    }

    const updatedPost = await db.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return NextResponse.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('[PUT/PATCH /api/admin/blog/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingPost = await db.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await db.post.delete({ where: { id } });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/admin/blog/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
