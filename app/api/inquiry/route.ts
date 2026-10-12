import { NextResponse } from 'next/server';
import { sendInquiryNotificationEmail, InquiryData } from '@/lib/email-service';
import { createLead } from '@/lib/leads-feedback-service';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON payload received.' },
        { status: 400 }
      );
    }

    const { website_hp } = body;

    // Honeypot validation: bot hidden field protection
    if (website_hp && typeof website_hp === 'string' && website_hp.trim() !== '') {
      return NextResponse.json({ ok: true, message: 'Inquiry processed.' }, { status: 200 });
    }

    // Support both canonical and legacy field names
    const name = (body.name || body.fullName || '').trim();
    const email = (body.email || body.workEmail || '').trim().toLowerCase();
    const phone = (body.phone || body.phoneOrWhatsApp || body.whatsapp || '').trim() || null;
    const company = (body.company || '').trim() || 'Not Specified';
    const systemOfInterest = (body.productName || body.systemOfInterest || body.systemRequested || '').trim() || 'General Architecture';
    const budget = (body.budget || '').trim() || 'Commercial Tier';
    const message = (body.message || body.requirements || '').trim();
    const timestamp = body.timestamp || new Date().toISOString();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Required fields missing: Full Name, Work Email, and Requirements/Message are required.',
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    const inquiryData: InquiryData = {
      name,
      email,
      company,
      systemOfInterest,
      budget,
      message,
      timestamp,
    };

    // 1. Create Lead Record in Database via leads-feedback-service
    let savedLead = null;
    try {
      savedLead = await createLead({
        name,
        email,
        phone,
        company,
        productName: systemOfInterest,
        budget,
        message,
      });
    } catch (leadErr) {
      console.warn('[INQUIRY LEAD PERSISTENCE WARNING]:', leadErr);
    }

    // 2. Persist audit log record in Database
    try {
      const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
      await prisma.auditLog.create({
        data: {
          action: `INQUIRY_SUBMISSION: ${systemOfInterest} [${name} <${email}>]`,
          ipAddress: clientIp,
        },
      });
    } catch (dbErr) {
      console.warn('[INQUIRY AUDIT LOG WARNING]: Database unavailable:', (dbErr as Error).message);
    }

    // Explicit runtime logging for server telemetry
    console.log('[ENTERPRISE LEAD SUBMITTED & LOGGED]:', {
      leadId: savedLead?.id,
      ...inquiryData,
      phone,
    });

    // 3. Automated Dual-Channel Email Dispatch (Gmail SMTP / Nodemailer)
    try {
      await sendInquiryNotificationEmail(inquiryData);
    } catch (dispatchErr) {
      console.warn('[AUTOMATED EMAIL DISPATCH HANDLER WARNING]:', dispatchErr);
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Inquiry received and logged successfully.',
        leadId: savedLead?.id,
        timestamp,
      },
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
