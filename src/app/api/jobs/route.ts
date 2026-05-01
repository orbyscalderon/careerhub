import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const locationType = searchParams.get('locationType');
    const jobType = searchParams.get('jobType');
    const experienceLevel = searchParams.get('experienceLevel');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const featured = searchParams.get('featured');

    // Build where clause
    const where: Record<string, unknown> = { isPublished: true };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { company: { contains: search } },
        { location: { contains: search } },
      ];
    }

    if (category) where.category = category;
    if (locationType) where.locationType = locationType;
    if (jobType) where.jobType = jobType;
    if (experienceLevel) where.experienceLevel = experienceLevel;
    if (featured === 'true') where.isFeatured = true;

    const [jobs, total] = await Promise.all([
      db.job.findMany({
        where,
        orderBy: featured === 'true'
          ? { isFeatured: 'desc' }
          : { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          company: true,
          companyLogo: true,
          location: true,
          locationType: true,
          category: true,
          salaryMin: true,
          salaryMax: true,
          salaryCurrency: true,
          jobType: true,
          experienceLevel: true,
          tags: true,
          isExternal: true,
          isFeatured: true,
          viewCount: true,
          applicantCount: true,
          publishedAt: true,
        },
      }),
      db.job.count({ where }),
    ]);

    return NextResponse.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/jobs] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
