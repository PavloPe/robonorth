import { NextRequest, NextResponse } from 'next/server';

// TODO: Connect to Supabase for lead storage
// import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, city } = body;
    if (!name || !email || !city) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and city are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Log the inquiry (replace with Supabase insert)
    console.log('[RoboNorth Inquiry]', {
      name,
      email,
      phone: body.phone || null,
      city,
      robot: body.robot || 'general',
      message: body.message || null,
      timestamp: new Date().toISOString(),
    });

    // TODO: Store in Supabase
    // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
    // await supabase.from('inquiries').insert({ name, email, phone: body.phone, city, robot: body.robot, message: body.message });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
