import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { createLogger } from '@/lib/logger';

const log = createLogger('api:inquiry');

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // Rate limiting — 5 requests per minute per IP
  const rateLimit = checkRateLimit(`inquiry:${ip}`);
  if (!rateLimit.allowed) {
    log.warn('Rate limit exceeded', { ip, resetAt: rateLimit.resetAt });
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again in a minute.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { name, email, city } = body;

    // CSRF protection — verify origin matches
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host) {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        log.warn('CSRF origin mismatch', { origin, host, ip });
        return NextResponse.json(
          { success: false, message: 'Invalid request origin.' },
          { status: 403 }
        );
      }
    }

    if (!name || !email || !city) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and city are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Honeypot check (if _hp field is filled, it's a bot)
    if (body._hp) {
      log.info('Honeypot triggered', { ip, email });
      // Return success to not tip off bots
      return NextResponse.json({
        success: true,
        message: "Thank you! We'll be in touch within 24 hours.",
      });
    }

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: body.phone || null,
        city,
        robot: body.robot || null,
        message: body.message || null,
      },
    });

    log.info('Inquiry saved', {
      id: inquiry.id,
      name,
      email,
      city,
      robot: body.robot || null,
      ip,
    });

    // Email notification placeholder
    // TODO: Replace with Resend/SendGrid integration
    sendNotificationEmail({
      id: inquiry.id,
      name,
      email,
      city,
      robot: body.robot || null,
      message: body.message || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within 24 hours.",
      },
      {
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  } catch (err) {
    log.error('Failed to process inquiry', {
      error: err instanceof Error ? err.message : String(err),
      ip,
    });
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// ============================================================================
// Email Notification Placeholder
// ============================================================================
// This function logs the notification for now. Replace with actual email
// sending (Resend, SendGrid, AWS SES) when ready for production.

interface InquiryNotification {
  id: string;
  name: string;
  email: string;
  city: string;
  robot: string | null;
  message: string | null;
}

function sendNotificationEmail(inquiry: InquiryNotification) {
  const emailLog = createLogger('email:inquiry-notification');

  emailLog.info('New inquiry notification (email not configured — logging only)', {
    to: 'hello@robonorth.ca',
    subject: `New Inquiry from ${inquiry.name} (${inquiry.city})`,
    inquiry: {
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      city: inquiry.city,
      robot: inquiry.robot,
      messagePreview: inquiry.message?.slice(0, 100) || '(none)',
    },
  });

  // TODO: Uncomment and configure when email service is set up
  // import { Resend } from 'resend';
  // const resend = new Resend(env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'RoboNorth <notifications@robonorth.ca>',
  //   to: ['hello@robonorth.ca'],
  //   subject: `New Inquiry: ${inquiry.name} — ${inquiry.city}`,
  //   html: `...`,
  // });
}
