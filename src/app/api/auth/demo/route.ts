import { NextRequest, NextResponse } from 'next/server';
import { DEMO_ACCOUNTS } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = DEMO_ACCOUNTS[email.toLowerCase().trim()];

    if (!user) {
      return NextResponse.json(
        { error: 'No demo account found with this email' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Demo login successful',
      user,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    console.error('[POST /api/auth/demo] Error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
}
