import { describe, it, expect } from 'vitest';
import { toRobot } from '@/lib/queries';

describe('toRobot (pure transform)', () => {
  const baseRow = {
    id: 'unitree-h1',
    name: 'Unitree H1',
    manufacturer: 'Unitree',
    manufacturerSlug: 'unitree',
    price: '$90,000 USD',
    priceMin: 90000,
    availability: 'shipping',
    category: 'enterprise',
    useCase: JSON.stringify(['research', 'logistics']),
    description: 'A test robot.',
    country: 'CN',
    imageUrl: '/img/h1.png',
    featured: true,
    canadaAvailable: false,
    specHeight: 180,
    specWeight: 47,
    specDof: 25,
    specBattery: '60min',
    specPayload: 30,
    specSpeed: 5,
    variants: null,
    scores: null,
    categoryWinners: null,
    reviewSlug: null,
  };

  it('parses JSON-encoded useCase array', () => {
    const r = toRobot(baseRow);
    expect(r.useCase).toEqual(['research', 'logistics']);
  });

  it('packs flat spec* columns into a nested specs object', () => {
    const r = toRobot(baseRow);
    expect(r.specs).toEqual({
      height: 180,
      weight: 47,
      dof: 25,
      battery: '60min',
      payload: 30,
      speed: 5,
    });
  });

  it('returns null spec fields untouched (not undefined)', () => {
    const r = toRobot({
      ...baseRow,
      specHeight: null,
      specWeight: null,
      specDof: null,
      specBattery: null,
      specPayload: null,
      specSpeed: null,
    });
    expect(r.specs.height).toBeNull();
    expect(r.specs.battery).toBeNull();
  });

  it('parses scores JSON when present, null when absent', () => {
    const withScores = toRobot({
      ...baseRow,
      scores: JSON.stringify({ overall: 8.5, value: 9 }),
    });
    expect(withScores.scores).toEqual({ overall: 8.5, value: 9 });
    expect(toRobot(baseRow).scores).toBeNull();
  });

  it('defaults categoryWinners to [] when DB column is null', () => {
    expect(toRobot(baseRow).categoryWinners).toEqual([]);
  });

  it('parses categoryWinners JSON when present', () => {
    const r = toRobot({
      ...baseRow,
      categoryWinners: JSON.stringify(['best-payload', 'best-value']),
    });
    expect(r.categoryWinners).toEqual(['best-payload', 'best-value']);
  });

  it('forwards reviewSlug, variants, and featured untouched', () => {
    const r = toRobot({
      ...baseRow,
      reviewSlug: 'unitree-h1-review',
      variants: 'h1-edu, h1-pro',
      featured: false,
    });
    expect(r.reviewSlug).toBe('unitree-h1-review');
    expect(r.variants).toBe('h1-edu, h1-pro');
    expect(r.featured).toBe(false);
  });

  it('preserves availability and category as typed strings', () => {
    const r = toRobot({ ...baseRow, availability: 'preorder', category: 'consumer' });
    expect(r.availability).toBe('preorder');
    expect(r.category).toBe('consumer');
  });
});
