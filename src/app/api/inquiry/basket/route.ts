import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { createLogger } from '@/lib/logger';

const log = createLogger('api:inquiry:basket');

function generateRefNumber(): string {
  const prefix = 'RN';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const rateLimit = checkRateLimit(`inquiry:${ip}`);
  if (!rateLimit.allowed) {
    log.warn('Rate limit exceeded', { ip });
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, city, items } = body;

    // CSRF check
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host) {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return NextResponse.json({ success: false, message: 'Invalid request origin.' }, { status: 403 });
      }
    }

    if (!name || !email || !city) {
      return NextResponse.json({ success: false, message: 'Name, email, and city are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'At least one item is required.' }, { status: 400 });
    }

    // Honeypot
    if (body._hp) {
      log.info('Honeypot triggered', { ip, email });
      return NextResponse.json({ success: true, referenceNumber: 'RN-XXXXX', message: 'Thank you!' });
    }

    const referenceNumber = generateRefNumber();

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: body.phone || null,
        company: body.company || null,
        city,
        message: body.message || null,
        type: 'basket',
        contactMethod: body.contactMethod || 'email',
        referenceNumber,
        items: {
          create: items.map((item: { itemType: string; itemId: string; itemName: string; quantity: number }) => ({
            itemType: item.itemType,
            itemId: item.itemId,
            itemName: item.itemName,
            quantity: item.quantity || 1,
          })),
        },
      },
    });

    log.info('Basket inquiry saved', {
      id: inquiry.id,
      ref: referenceNumber,
      name,
      email,
      city,
      itemCount: items.length,
      ip,
    });

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: "Thank you! We'll be in touch within 24 hours.",
    });
  } catch (err) {
    log.error('Failed to process basket inquiry', {
      error: err instanceof Error ? err.message : String(err),
      ip,
    });
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
