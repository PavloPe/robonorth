import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, city } = body;

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

    // Save to database
    await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: body.phone || null,
        city,
        robot: body.robot || null,
        message: body.message || null,
      },
    });

    console.log('[RoboNorth Inquiry] Saved:', { name, email, city, robot: body.robot });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    });
  } catch (err) {
    console.error('[RoboNorth Inquiry] Error:', err);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
