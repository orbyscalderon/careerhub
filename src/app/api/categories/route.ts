import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Get all categories with live job counts from the Job model
    const categories = await db.category.findMany({
      orderBy: { name: 'asc' },
    });

    // Also get counts from actual jobs for accuracy
    const jobCountsByCategory = await db.job.groupBy({
      by: ['category'],
      where: { isPublished: true },
      _count: { category: true },
    });

    const countMap = new Map(
      jobCountsByCategory.map((item) => [item.category, item._count.category])
    );

    const result = categories.map((cat) => ({
      ...cat,
      jobCount: countMap.get(cat.name) || 0,
    }));

    // Also include categories from jobs that don't have a Category record
    const categoryNames = new Set(categories.map((c) => c.name));
    const uncategorizedJobs = jobCountsByCategory.filter(
      (item) => !categoryNames.has(item.category)
    );

    const extraCategories = uncategorizedJobs.map((item) => ({
      id: item.category,
      name: item.category,
      slug: item.category.toLowerCase().replace(/\s+/g, '-'),
      description: null,
      icon: null,
      jobCount: item._count.category,
    }));

    return NextResponse.json({
      categories: [...result, ...extraCategories],
    });
  } catch (error) {
    console.error('[GET /api/categories] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
