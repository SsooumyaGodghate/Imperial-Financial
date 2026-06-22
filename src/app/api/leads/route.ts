import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbConnect } from '@/lib/db';
import { Lead } from '@/lib/models';
import { isRateLimited } from '@/lib/rateLimit';

// Zod validation schema
const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^[+]?[0-9\s-]+$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
  loanType: z.string().min(1, 'Please select a loan type'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(1000),
  recaptchaToken: z.string().optional(),
});

// Basic input sanitization helper to prevent XSS
function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    // Max 5 submissions per IP per 5 minutes
    if (isRateLimited(ip, 5, 5 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again after 5 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Validate input with Zod
    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues.map((e) => e.message).join(', ');
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, phone, email, loanType, message, recaptchaToken } = validation.data;

    // 3. Optional reCAPTCHA Validation
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaToken) {
      try {
        const verifyRes = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
          { method: 'POST' }
        );
        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
          return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
        }
      } catch (err) {
        console.error('reCAPTCHA fetch error:', err);
        // Fail open or closed depending on requirements; in this case we logs and proceed
      }
    }

    // 4. Sanitize strings to mitigate XSS
    const sanitizedName = sanitizeString(name);
    const sanitizedPhone = sanitizeString(phone);
    const sanitizedEmail = sanitizeString(email.toLowerCase());
    const sanitizedLoanType = sanitizeString(loanType);
    const sanitizedMessage = sanitizeString(message);

    // 5. Connect to MongoDB
    await dbConnect();

    // 6. Create Lead
    const newLead = await Lead.create({
      name: sanitizedName,
      phone: sanitizedPhone,
      email: sanitizedEmail,
      loanType: sanitizedLoanType,
      message: sanitizedMessage,
      status: 'New',
    });

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully!', leadId: newLead._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
