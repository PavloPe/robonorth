import { NextResponse } from 'next/server';
import { getAllRobots } from '@/lib/queries';

export async function GET() {
  const robots = await getAllRobots();
  return NextResponse.json(robots);
}
