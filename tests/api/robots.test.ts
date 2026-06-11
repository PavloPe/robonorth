import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the query layer used by the route — keeps the test focused on the
// HTTP layer (status code, body shape, error wrapping) and avoids touching
// either Prisma or the real DB. Use vi.hoisted() so the factory and the
// test body share the same fn (vi.mock hoists above ordinary const).
const { getAllRobots } = vi.hoisted(() => ({ getAllRobots: vi.fn() }));
vi.mock('@/lib/queries', () => ({ getAllRobots }));

import { GET } from '@/app/api/robots/route';

describe('GET /api/robots', () => {
  beforeEach(() => getAllRobots.mockReset());

  it('returns the robot list with 200', async () => {
    getAllRobots.mockResolvedValueOnce([
      { id: 'unitree-h1', name: 'Unitree H1' },
      { id: 'tesla-optimus', name: 'Tesla Optimus' },
    ]);
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
    expect(body[0].id).toBe('unitree-h1');
  });

  it('returns 500 with a user-safe error when the query layer throws', async () => {
    getAllRobots.mockRejectedValueOnce(new Error('SELECT failed'));
    const res = await GET();
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toMatch(/Failed to load robots/i);
    // Verify internal error message is NOT leaked to the client
    expect(JSON.stringify(body)).not.toMatch(/SELECT failed/);
  });

  it('returns an empty array (not a 500) when the catalog is empty', async () => {
    getAllRobots.mockResolvedValueOnce([]);
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });
});
