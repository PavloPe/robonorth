import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Important: this module installs a setInterval on import — replace with fake
// timers BEFORE importing so the interval is registered against fake timers
// (otherwise the suite never exits cleanly).
vi.useFakeTimers();

import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

describe('rate-limit', () => {
  beforeEach(() => {
    // Each test gets a fresh frozen clock anchored at a known epoch so the
    // module-internal Map state from previous tests has expired.
    vi.setSystemTime(new Date('2026-06-11T12:00:00Z'));
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('checkRateLimit', () => {
    it('allows the first request and reports remaining', () => {
      const res = checkRateLimit('ip:1.2.3.4');
      expect(res.allowed).toBe(true);
      expect(res.remaining).toBe(4); // default max=5, this one consumes 1
      expect(res.resetAt).toBeGreaterThan(Date.now());
    });

    it('blocks the 6th request inside the same window', () => {
      for (let i = 0; i < 5; i++) {
        const r = checkRateLimit('ip:burst');
        expect(r.allowed).toBe(true);
      }
      const blocked = checkRateLimit('ip:burst');
      expect(blocked.allowed).toBe(false);
      expect(blocked.remaining).toBe(0);
    });

    it('resets the window after the configured duration', () => {
      for (let i = 0; i < 5; i++) checkRateLimit('ip:reset');
      expect(checkRateLimit('ip:reset').allowed).toBe(false);

      // Advance past the 60s window
      vi.advanceTimersByTime(61_000);

      const after = checkRateLimit('ip:reset');
      expect(after.allowed).toBe(true);
      expect(after.remaining).toBe(4);
    });

    it('isolates buckets by key', () => {
      for (let i = 0; i < 5; i++) checkRateLimit('ip:A');
      const a = checkRateLimit('ip:A');
      const b = checkRateLimit('ip:B');
      expect(a.allowed).toBe(false);
      expect(b.allowed).toBe(true);
    });

    it('honors caller-supplied limits over defaults', () => {
      const a = checkRateLimit('ip:custom', 2, 60_000);
      const b = checkRateLimit('ip:custom', 2, 60_000);
      const c = checkRateLimit('ip:custom', 2, 60_000);
      expect(a.allowed).toBe(true);
      expect(b.allowed).toBe(true);
      expect(c.allowed).toBe(false);
    });
  });

  describe('getClientIp', () => {
    const makeReq = (headers: Record<string, string>): Request =>
      new Request('http://localhost/x', { headers });

    it('prefers the first entry in x-forwarded-for', () => {
      const req = makeReq({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' });
      expect(getClientIp(req)).toBe('1.1.1.1');
    });

    it('falls back to x-real-ip', () => {
      const req = makeReq({ 'x-real-ip': '3.3.3.3' });
      expect(getClientIp(req)).toBe('3.3.3.3');
    });

    it('returns localhost when no proxy headers are present', () => {
      const req = makeReq({});
      expect(getClientIp(req)).toBe('127.0.0.1');
    });

    it('trims whitespace from forwarded-for entries', () => {
      const req = makeReq({ 'x-forwarded-for': '   4.4.4.4   , 5.5.5.5' });
      expect(getClientIp(req)).toBe('4.4.4.4');
    });
  });
});
