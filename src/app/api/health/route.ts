import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const start = Date.now();

  try {
    // Verify DB connection with a simple query
    const robotCount = await prisma.robot.count();
    const manufacturerCount = await prisma.manufacturer.count();
    const responseTime = Date.now() - start;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        connected: true,
        robots: robotCount,
        manufacturers: manufacturerCount,
        responseMs: responseTime,
      },
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    const responseTime = Date.now() - start;

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          responseMs: responseTime,
        },
        version: process.env.npm_package_version || '0.1.0',
        environment: process.env.NODE_ENV || 'development',
      },
      { status: 503 }
    );
  }
}
