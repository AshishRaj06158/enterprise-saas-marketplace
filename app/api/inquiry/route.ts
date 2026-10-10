import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON payload received.' },
        { status: 400 }
      );
    }

    const { fullName, workEmail, company, systemRequested, requirements, budget, website_hp } = body;

    // Honeypot validation: bot hidden field protection
    if (website_hp && typeof website_hp === 'string' && website_hp.trim() !== '') {
      return NextResponse.json({ ok: true, message: 'Inquiry processed.' }, { status: 200 });
    }

    if (!fullName?.trim() || !workEmail?.trim() || !requirements?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Required fields missing: Full Name, Work Email, and Requirements are required.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail.trim())) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    // Log the inquiry explicitly for Vercel Runtime Logs
    console.log('[ENTERPRISE LEAD SUBMITTED]:', {
      fullName: fullName.trim(),
      workEmail: workEmail.trim().toLowerCase(),
      company: company?.trim() || 'N/A',
      systemRequested: systemRequested?.trim() || 'N/A',
      budget: budget?.trim() || 'N/A',
      requirements: requirements.trim(),
      timestamp: new Date().toISOString()
    });

    // Optional Resend Email Dispatch if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'NEXUS.OS Leads <onboarding@resend.dev>',
            to: ['ashishraj06158@gmail.com'],
            subject: `🚀 New Enterprise Inquiry from ${fullName.trim()}`,
            text: `Enterprise Lead Details:\n\nClient: ${fullName.trim()}\nEmail: ${workEmail.trim()}\nCompany: ${company || 'N/A'}\nSystem Requested: ${systemRequested || 'N/A'}\nBudget: ${budget || 'N/A'}\nRequirements:\n${requirements.trim()}`,
          }),
        });
      } catch (emailErr) {
        console.error('[RESEND DISPATCH ERROR]:', emailErr);
      }
    }

    return NextResponse.json(
      { ok: true, message: 'Inquiry received and logged successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in /api/inquiry:', error);
    return NextResponse.json(
      { ok: false, error: 'Server error processing deployment inquiry.' },
      { status: 500 }
    );
  }
}
