import { NextResponse } from 'next/server';
import { getAllRobots } from '@/lib/queries';
import { createLogger } from '@/lib/logger';

const log = createLogger('api:robots');

export async function GET() {
  try {
    const robots = await getAllRobots();
    return NextResponse.json(robots);
  } catch (err) {
    log.error('Failed to fetch robots', {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: 'Failed to load robots. Please try again.' },
      { status: 500 }
    );
  }
}
