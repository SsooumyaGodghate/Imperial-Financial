import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Lead, AuditLog } from '@/lib/models';
import { getTokenFromRequest } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// PATCH: Update lead status or notes
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const admin = getTokenFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const { status, notes } = body;

    await dbConnect();

    // Find original lead for change auditing
    const lead = await Lead.findById(id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const changes: string[] = [];
    if (status && status !== lead.status) {
      changes.push(`status from "${lead.status}" to "${status}"`);
      lead.status = status;
    }
    if (notes !== undefined && notes !== lead.notes) {
      changes.push('notes updated');
      lead.notes = notes;
    }

    if (changes.length > 0) {
      await lead.save();

      // Log audit trail
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      await AuditLog.create({
        action: 'LEAD_UPDATE',
        adminUser: admin.username,
        details: `Updated lead "${lead.name}" (${lead.email}): ${changes.join(', ')}.`,
        ipAddress: ip,
      });
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Remove lead
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const admin = getTokenFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    await dbConnect();

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Log audit trail
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    await AuditLog.create({
      action: 'LEAD_DELETE',
      adminUser: admin.username,
      details: `Deleted lead "${lead.name}" (${lead.email}, Loan Type: ${lead.loanType}).`,
      ipAddress: ip,
    });

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
