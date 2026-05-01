import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await db.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    if (!post || !post.isPublished) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment view count
    await db.post.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({
      ...post,
      viewCount: post.viewCount + 1,
    });
  } catch (error) {
    console.error('[GET /api/blog/[slug]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
