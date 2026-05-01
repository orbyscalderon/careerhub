import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobId = formData.get('jobId') as string;
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const coverLetter = formData.get('coverLetter') as string | null;
    const resumeFile = formData.get('resume') as File | null;

    // Validate required fields
    if (!jobId || !fullName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: jobId, fullName, email' },
        { status: 400 }
      );
    }

    // Check if job exists
    const job = await db.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Handle file upload
    let resumeUrl: string | null = null;
    if (resumeFile && resumeFile.size > 0) {
      const uploadsDir = join(process.cwd(), 'public', 'uploads');

      // Ensure uploads directory exists
      await mkdir(uploadsDir, { recursive: true });

      // Generate unique filename
      const ext = resumeFile.name.split('.').pop() || 'pdf';
      const uniqueName = `${crypto.randomUUID()}.${ext}`;
      const filePath = join(uploadsDir, uniqueName);

      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(filePath, buffer);
      resumeUrl = `/uploads/${uniqueName}`;
    }

    // Create application
    const application = await db.application.create({
      data: {
        jobId,
        fullName,
        email,
        phone,
        coverLetter,
        resumeUrl,
      },
    });

    // Update job applicant count
    await db.job.update({
      where: { id: jobId },
      data: { applicantCount: { increment: 1 } },
    });

    // TODO: Send email notification to employer via Resend
    console.log(
      `[Email Notification] New application received:\n` +
      `  Job: ${job.title} at ${job.company}\n` +
      `  Candidate: ${fullName} (${email})\n` +
      `  Phone: ${phone || 'N/A'}\n` +
      `  Resume: ${resumeUrl || 'Not provided'}\n` +
      `  Cover Letter: ${coverLetter ? 'Yes' : 'No'}\n` +
      `  Time: ${new Date().toISOString()}`
    );

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/applications] Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
