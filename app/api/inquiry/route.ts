import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, workEmail, company, systemRequested, requirements, budget } = body;

    // Log the inquiry explicitly for Vercel Runtime Logs
    console.log('[ENTERPRISE LEAD SUBMITTED]:', JSON.stringify(body, null, 2));

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
            subject: `🚀 New Enterprise Inquiry from ${fullName || 'Client'}`,
            text: `Enterprise Lead Details:\n\nClient: ${fullName}\nEmail: ${workEmail}\nCompany: ${company || 'N/A'}\nSystem Requested: ${systemRequested || 'N/A'}\nBudget: ${budget || 'N/A'}\nRequirements:\n${requirements}`,
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
