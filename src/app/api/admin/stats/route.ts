import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [totalJobs, totalApplications, totalUsers, totalPosts] =
      await Promise.all([
        db.job.count({ where: { isPublished: true } }),
        db.application.count(),
        db.user.count(),
        db.post.count({ where: { isPublished: true } }),
      ]);

    // Recent applications for activity feed
    const recentApplications = await db.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        status: true,
        createdAt: true,
        job: {
          select: { title: true, company: true },
        },
      },
    });

    // Jobs by category breakdown
    const jobsByCategory = await db.job.groupBy({
      by: ['category'],
      where: { isPublished: true },
      _count: { category: true },
    });

    // Applications by status breakdown
    const applicationsByStatus = await db.application.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    return NextResponse.json({
      totalJobs,
      totalApplications,
      totalUsers,
      totalPosts,
      recentApplications,
      jobsByCategory: jobsByCategory.map((item) => ({
        category: item.category,
        count: item._count.category,
      })),
      applicationsByStatus: applicationsByStatus.map((item) => ({
        status: item.status,
        count: item._count.status,
      })),
    });
  } catch (error) {
    console.error('[GET /api/admin/stats] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
