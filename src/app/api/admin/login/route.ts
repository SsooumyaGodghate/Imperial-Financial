import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/db';
import { AuditLog } from '@/lib/models';
import { signToken, getCookieConfig } from '@/lib/auth';
import { isRateLimited } from '@/lib/rateLimit';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limit login attempts: max 5 requests per 10 minutes
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(`login_${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 10 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const { username, password } = validation.data;

    // Check credentials against env variables
    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!envPasswordHash) {
      return NextResponse.json(
        { error: 'Admin credentials not configured in environment.' },
        { status: 500 }
      );
    }

    if (username !== envUsername) {
      // Generic error message for security
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, envPasswordHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Connect to database to log login audit event
    await dbConnect();
    await AuditLog.create({
      action: 'ADMIN_LOGIN',
      adminUser: username,
      details: 'Administrator logged in successfully.',
      ipAddress: ip,
    });

    // Set secure cookie
    const token = signToken({ username, role: 'admin' });
    const cookieConfig = getCookieConfig();

    const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
    
    response.cookies.set(
      cookieConfig.name,
      token,
      cookieConfig.options
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
