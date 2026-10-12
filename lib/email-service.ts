import nodemailer from "nodemailer";

export interface InquiryData {
  name: string;
  email: string;
  company?: string;
  systemOfInterest?: string;
  budget?: string;
  message?: string;
  timestamp?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  channel?: "nodemailer" | "resend" | "none";
  messageId?: string;
  error?: string;
}

/**
 * Builds Cybernetic Neo-Brutalist HTML email body.
 * Theme: Pitch Navy (#07090E), Card Canvas (#0D111A), Cyan accents (#00F0FF),
 * Emerald CTA (#10B981), Monospace typography, Hard offset borders.
 */
function buildNeoBrutalistEmailTemplate(data: InquiryData): string {
  const {
    name,
    email,
    company = "Not Specified",
    systemOfInterest = "General Architecture",
    budget = "Commercial Tier",
    message = "Direct Advisory",
    timestamp = new Date().toISOString(),
  } = data;

  const messagePayload = encodeURIComponent(
    `*⚡ SUTRA / NEXUS ENTERPRISE INQUIRY*\n\n` +
      `• *Lead Name:* ${name || "Enterprise Client"}\n` +
      `• *Email:* ${email || "N/A"}\n` +
      `• *Company:* ${company || "N/A"}\n` +
      `• *System:* ${systemOfInterest || "Enterprise SaaS"}\n` +
      `• *Message:* ${message || "Ready for SLA Dispatch"}`
  );
  const targetWhatsAppUrl = `https://wa.me/919771596801?text=${messagePayload}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enterprise System Advisory Request</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #07090E; font-family: 'SF Mono', Consolas, Monaco, 'Courier New', monospace; color: #F8FAFC;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background-color: #0D111A; border: 2px solid #00F0FF; box-shadow: 6px 6px 0px 0px #00F0FF;">
    <!-- HEADER STRIP -->
    <tr>
      <td style="padding: 24px; background-color: #07090E; border-bottom: 2px solid #1A2234;">
        <span style="display: inline-block; padding: 4px 12px; background-color: rgba(0, 240, 255, 0.12); border: 1px solid #00F0FF; color: #00F0FF; font-size: 11px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">
          ⚡ [NEXUS ADVISORY PIPELINE // PRIORITY DISPATCH]
        </span>
        <h1 style="margin: 14px 0 0 0; color: #FFFFFF; font-size: 22px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; font-family: monospace;">
          New System Advisory Request
        </h1>
        <p style="margin: 6px 0 0 0; color: #94A3B8; font-size: 13px; font-family: monospace;">
          Target Architecture: <strong style="color: #00F0FF;">${systemOfInterest}</strong>
        </p>
      </td>
    </tr>

    <!-- SUMMARY TABLE -->
    <tr>
      <td style="padding: 28px 24px;">
        <h3 style="margin: 0 0 16px 0; font-size: 12px; color: #00F0FF; letter-spacing: 1.5px; text-transform: uppercase; font-family: monospace;">
          // CLIENT SPECIFICATIONS &amp; PAYLOAD:
        </h3>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 2px solid #1A2234; background-color: #07090E; font-family: monospace;">
          <tr>
            <td style="padding: 12px 14px; width: 35%; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              [LEAD NAME]
            </td>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #FFFFFF; font-size: 13px; font-weight: bold;">
              ${name}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              [WORK EMAIL]
            </td>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #00F0FF; font-size: 13px; font-weight: bold;">
              <a href="mailto:${email}" style="color: #00F0FF; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              [ENTERPRISE / COMPANY]
            </td>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #FFFFFF; font-size: 13px;">
              ${company}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              [SYSTEM SELECTED]
            </td>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #FFFFFF; font-size: 13px; font-weight: bold;">
              ${systemOfInterest}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              [BUDGET TIER]
            </td>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #10B981; font-size: 13px; font-weight: bold;">
              ${budget}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold; vertical-align: top;">
              [PROJECT SCOPE / MESSAGE]
            </td>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #F1F5F9; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">
              ${message}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold;">
              [TIMESTAMP]
            </td>
            <td style="padding: 12px 14px; border: 1px solid #1A2234; color: #94A3B8; font-size: 12px;">
              ${timestamp}
            </td>
          </tr>
        </table>

        <!-- WHATSAPP CTA LINK -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 26px;">
          <tr>
            <td align="center">
              <a href="${targetWhatsAppUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 28px; background-color: #10B981; color: #000000; font-size: 12px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; border: 2px solid #000000; box-shadow: 4px 4px 0px 0px #10B981; font-family: monospace;">
                [CHAT ON WHATSAPP: +91 9771596801 ➔]
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="padding: 20px 24px; background-color: #07090E; border-top: 2px solid #1A2234; text-align: center;">
        <p style="margin: 0; font-size: 11px; color: #64748B; font-family: monospace;">
          NEXUS ENTERPRISE SAAS MARKETPLACE • AUTOMATED ADVISORY ENGINE<br>
          Target SLA Dispatch Response Window: &lt; 15 Minutes
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Creates and returns a configured Nodemailer transporter for Gmail SMTP.
 */
function createSmtpTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Dispatches an automated email notification to the administrator
 * upon inquiry submission.
 * Safe fallback: never throws an unhandled error or crashes the UI.
 */
export async function sendInquiryNotificationEmail(
  inquiryData: InquiryData
): Promise<EmailDispatchResult> {
  const {
    name,
    email,
    company = "Not Specified",
    systemOfInterest = "General Architecture",
    budget = "Commercial Tier",
    message = "Direct Advisory",
    timestamp = new Date().toISOString(),
  } = inquiryData;

  const targetRecipient =
    process.env.NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    "admin@nexus.enterprise";

  const subject = `[⚡ NEXUS INQUIRY] New System Advisory Request: ${systemOfInterest || "General Architecture"}`;
  const htmlBody = buildNeoBrutalistEmailTemplate(inquiryData);
  const textBody =
    `*⚡ SUTRA / NEXUS ENTERPRISE INQUIRY*\n\n` +
    `• Lead Name: ${name || "Enterprise Client"}\n` +
    `• Email: ${email || "N/A"}\n` +
    `• Company: ${company || "N/A"}\n` +
    `• System Selected: ${systemOfInterest || "Enterprise SaaS"}\n` +
    `• Budget: ${budget}\n` +
    `• Message: ${message || "Ready for SLA Dispatch"}\n` +
    `• Timestamp: ${timestamp}\n\n` +
    `Direct WhatsApp SLA Link: https://wa.me/919771596801`;

  // 1. Gmail / SMTP Dispatch via Nodemailer
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = createSmtpTransporter();
      const info = await transporter.sendMail({
        from: `"NEXUS Enterprise Advisory" <${process.env.SMTP_USER}>`,
        to: targetRecipient,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      console.log(
        `[GMAIL SMTP DISPATCH SUCCESS]: Notification sent to ${targetRecipient} (id: ${info.messageId})`
      );
      return {
        success: true,
        channel: "nodemailer",
        messageId: info.messageId,
      };
    } catch (smtpErr) {
      console.warn(
        "[GMAIL SMTP DISPATCH WARNING]: SMTP failed or misconfigured:",
        smtpErr
      );
      // Fall through to Resend if available
    }
  }

  // 2. Resend Fallback (if RESEND_API_KEY is configured)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "NEXUS.OS Leads <onboarding@resend.dev>",
          to: [targetRecipient],
          reply_to: email,
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });

      const resendData = await res.json().catch(() => ({}));
      if (res.ok) {
        console.log(
          `[RESEND DISPATCH SUCCESS]: Notification sent to ${targetRecipient}`
        );
        return {
          success: true,
          channel: "resend",
          messageId: resendData?.id,
        };
      } else {
        console.warn("[RESEND DISPATCH WARNING]:", resendData);
      }
    } catch (resendErr) {
      console.warn("[RESEND DISPATCH EXCEPTION]:", resendErr);
    }
  }

  // 3. Fallback when credentials are unconfigured
  if (!process.env.SMTP_USER && !process.env.RESEND_API_KEY) {
    console.warn(
      `[EMAIL DISPATCH NOTICE]: SMTP credentials (SMTP_USER/SMTP_PASS) are blank or unconfigured in environment. Notification logged safely to console. Target recipient: ${targetRecipient}`
    );
  }

  return {
    success: false,
    channel: "none",
    error: "No active email transport credentials configured or dispatch skipped.",
  };
}

// Alias for backwards compatibility
export const sendInquiryNotification = sendInquiryNotificationEmail;
export type InquiryPayload = InquiryData;
