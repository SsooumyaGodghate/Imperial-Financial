import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Lead, AuditLog } from '@/lib/models';
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

    // 3. Fetch all leads
    const leads = await Lead.find({}).sort({ createdAt: -1 });

    // 4. Create CSV Content
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Loan Type', 'Message', 'Status', 'Notes', 'Submission Date'];
    const csvRows = [headers.join(',')];

    for (const lead of leads) {
      const row = [
        lead._id.toString(),
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.phone.replace(/"/g, '""')}"`,
        `"${lead.email.replace(/"/g, '""')}"`,
        `"${lead.loanType.replace(/"/g, '""')}"`,
        `"${lead.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${lead.status}"`,
        `"${(lead.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        lead.createdAt.toISOString(),
      ];
      csvRows.push(row.join(','));
    }

    const csvContent = csvRows.join('\n');

    // 5. Log Audit Log
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    await AuditLog.create({
      action: 'LEAD_EXPORT',
      adminUser: admin.username,
      details: `Exported ${leads.length} leads as CSV.`,
      ipAddress: ip,
    });

    // 6. Return response with CSV headers
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="imperial_financial_leads.csv"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Export leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
