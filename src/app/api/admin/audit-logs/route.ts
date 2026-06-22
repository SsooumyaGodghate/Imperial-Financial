import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { AuditLog } from '@/lib/models';
import { getTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // 1. Verify Authentication
    const admin = getTokenFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Connect to Database
    await dbConnect();

    // 3. Fetch latest 100 audit logs
    const logs = await AuditLog.find({}).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error('Fetch audit logs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
