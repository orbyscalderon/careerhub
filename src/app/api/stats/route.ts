import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [
      totalJobs,
      totalCompanies,
      totalCategories,
      totalCandidates,
      totalApplications,
    ] = await Promise.all([
      db.job.count({ where: { status: 'ACTIVE' } }),
      db.job.groupBy({ by: ['company'], where: { status: 'ACTIVE' } }),
      db.category.count(),
      db.user.count({ where: { role: 'CANDIDATE' } }),
      db.application.count(),
    ]);

    return NextResponse.json({
      totalJobs,
      totalCompanies: totalCompanies.length,
      totalCategories,
      totalCandidates,
      totalApplications,
    });
  } catch (error) {
    console.error('[GET /api/stats] Error:', error);
    return NextResponse.json(
      {
        totalJobs: 0,
        totalCompanies: 0,
        totalCategories: 0,
        totalCandidates: 0,
        totalApplications: 0,
      },
      { status: 200 }
    );
  }
}
