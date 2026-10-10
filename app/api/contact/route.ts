import { NextResponse } from 'next/server';

// In-memory rate limiting map (IP -> timestamp) with automatic stale pruning
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip');
  return realIp ? realIp.trim() : null;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();

    // Prune stale entries if map size grows large to prevent memory leaks
    if (rateLimitMap.size > 1000) {
      for (const [key, timestamp] of rateLimitMap.entries()) {
        if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
          rateLimitMap.delete(key);
        }
      }
    }

    // Rate limiting check (only enforce when IP is identified)
    if (ip) {
      const lastRequest = rateLimitMap.get(ip);
      if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
        return NextResponse.json(
          { success: false, error: 'Rate limit exceeded. Please wait a minute before submitting again.' },
          { status: 429 }
        );
      }
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload received.' },
        { status: 400 }
      );
    }
    const { fullName, email, company, gstin, requirements, systemRequirements, website_hp } = body;

    // Honeypot validation: bot hidden field protection
    if (website_hp && website_hp.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Processed' }, { status: 200 });
    }

    // Accept either requirements or systemRequirements
    const reqText = requirements || systemRequirements;

    if (!fullName?.trim() || !email?.trim() || !reqText?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Required fields missing (Full Name, Email, and Requirements are required)' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    // Record rate limit timestamp
    if (ip) {
      rateLimitMap.set(ip, now);
    }

    const leadData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      gstin: gstin?.trim() || null,
      requirements: reqText.trim(),
      timestamp: new Date().toISOString(),
    };

    // Log valid lead
    console.log('Valid lead received:', leadData);

    // =========================================================================
    // TODO: Supabase Insertion (Uncomment & configure if using Supabase)
    // =========================================================================
    // const { data, error } = await supabase.from('leads').insert([leadData]);
    // if (error) throw error;

    // =========================================================================
    // TODO: Resend Email Notification (Uncomment & configure if using Resend)
    // =========================================================================
    // await resend.emails.send({
    //   from: 'Sutra Nexus Leads <leads@yourdomain.com>',
    //   to: ['admin@yourdomain.com'],
    //   subject: `New Enterprise Inquiry from ${leadData.fullName}`,
    //   text: `Name: ${leadData.fullName}\nEmail: ${leadData.email}\nCompany: ${leadData.company}\nGSTIN: ${leadData.gstin}\nRequirements:\n${leadData.requirements}`,
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry processed successfully',
        submissionId: `SN-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in /api/contact:', error);
    return NextResponse.json({ success: false, error: 'Server error. Please try again.' }, { status: 500 });
  }
}
