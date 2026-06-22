import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { AuditLog } from '@/lib/models';
import { getTokenFromRequest, getCookieConfig } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const admin = getTokenFromRequest(req);
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    if (admin) {
      // Connect to database to log audit event
      await dbConnect();
      await AuditLog.create({
        action: 'ADMIN_LOGOUT',
        adminUser: admin.username,
        details: 'Administrator logged out.',
        ipAddress: ip,
      });
    }

    const cookieConfig = getCookieConfig();
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

    // Clear JWT cookie
    response.cookies.set(cookieConfig.name, '', {
      ...cookieConfig.options,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
