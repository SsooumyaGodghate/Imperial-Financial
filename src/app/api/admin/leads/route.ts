import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Lead } from '@/lib/models';
import { getTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // 1. Verify Authentication
    const admin = getTokenFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Query Params
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const loanType = searchParams.get('loanType') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const skip = (page - 1) * limit;

    // 3. Connect to Database
    await dbConnect();

    // 4. Construct Query Filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (loanType) {
      filter.loanType = loanType;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { message: searchRegex },
      ];
    }

    // 5. Fetch Leads & Count
    const totalLeads = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        total: totalLeads,
        page,
        limit,
        pages: Math.ceil(totalLeads / limit),
      },
    });
  } catch (error) {
    console.error('Fetch leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
