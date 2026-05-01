import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      email,
      name,
      frequency = 'DAILY',
      categories,
      locations,
      keywords,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const subscription = await db.subscription.upsert({
      where: { email },
      create: {
        email,
        name,
        frequency,
        categories: categories ? JSON.stringify(categories) : null,
        locations: locations ? JSON.stringify(locations) : null,
        keywords: keywords ? JSON.stringify(keywords) : null,
        isActive: true,
      },
      update: {
        name: name || undefined,
        frequency,
        categories: categories ? JSON.stringify(categories) : undefined,
        locations: locations ? JSON.stringify(locations) : undefined,
        keywords: keywords ? JSON.stringify(keywords) : undefined,
        isActive: true,
      },
    });

    return NextResponse.json(
      { message: 'Subscription created successfully', subscription },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/subscriptions] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));

    const [subscriptions, total] = await Promise.all([
      db.subscription.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.subscription.count(),
    ]);

    return NextResponse.json({
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/subscriptions] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}
