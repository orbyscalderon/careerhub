import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateFingerprint } from '@/lib/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      company,
      companyLogo,
      location,
      locationType = 'REMOTE',
      category,
      salaryMin,
      salaryMax,
      salaryCurrency = 'USD',
      jobType = 'FULL_TIME',
      experienceLevel = 'MID',
      tags,
      applyUrl,
      contactEmail,
      contactName,
      requirements,
      benefits,
      isExternal = false,
      isFeatured = false,
      sourceUrl,
      sourceName,
      expiresAt,
    } = body;

    if (!title || !description || !company || !location || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, company, location, category' },
        { status: 400 }
      );
    }

    // Generate fingerprint for deduplication
    const fingerprint = generateFingerprint(title, company, location);

    // Check if job already exists by fingerprint
    const existingJob = await db.job.findUnique({
      where: { fingerprint },
    });

    if (existingJob) {
      // Update lastSeenAt for existing job
      const updated = await db.job.update({
        where: { id: existingJob.id },
        data: {
          lastSeenAt: new Date(),
          // Update fields if new data is provided
          ...(description && { description }),
          ...(salaryMin !== undefined && { salaryMin }),
          ...(salaryMax !== undefined && { salaryMax }),
        },
      });
      return NextResponse.json({
        message: 'Job already exists, updated lastSeenAt',
        job: updated,
        isDuplicate: true,
      });
    }

    // Create new job
    const job = await db.job.create({
      data: {
        title,
        description,
        company,
        companyLogo,
        location,
        locationType,
        category,
        salaryMin: salaryMin ? parseInt(salaryMin, 10) : null,
        salaryMax: salaryMax ? parseInt(salaryMax, 10) : null,
        salaryCurrency,
        jobType,
        experienceLevel,
        tags: tags ? JSON.stringify(tags) : null,
        applyUrl,
        contactEmail,
        contactName,
        requirements: requirements ? JSON.stringify(requirements) : null,
        benefits: benefits ? JSON.stringify(benefits) : null,
        isExternal,
        isFeatured,
        fingerprint,
        sourceUrl,
        sourceName,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/jobs/create] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
