import prisma from './db';
import type { Robot, Manufacturer, PartCategory, Part } from '@/types';

type DbRobot = {
  id: string; name: string; manufacturer: string; manufacturerSlug: string;
  price: string; priceMin: number; availability: string; category: string;
  useCase: string; description: string; country: string; imageUrl: string;
  featured: boolean; canadaAvailable: boolean;
  specHeight: number | null; specWeight: number | null; specDof: number | null;
  specBattery: string | null; specPayload: number | null; specSpeed: number | null;
  variants: string | null; scores: string | null; categoryWinners: string | null;
  reviewSlug: string | null;
};

export function toRobot(r: DbRobot): Robot {
  return {
    id: r.id,
    name: r.name,
    manufacturer: r.manufacturer,
    manufacturerSlug: r.manufacturerSlug,
    price: r.price,
    priceMin: r.priceMin,
    availability: r.availability as Robot['availability'],
    category: r.category as Robot['category'],
    useCase: JSON.parse(r.useCase),
    description: r.description,
    country: r.country,
    imageUrl: r.imageUrl,
    featured: r.featured,
    canadaAvailable: r.canadaAvailable,
    specs: {
      height: r.specHeight,
      weight: r.specWeight,
      dof: r.specDof,
      battery: r.specBattery,
      payload: r.specPayload,
      speed: r.specSpeed,
    },
    variants: r.variants,
    scores: r.scores ? JSON.parse(r.scores) : null,
    categoryWinners: r.categoryWinners ? JSON.parse(r.categoryWinners) : [],
    reviewSlug: r.reviewSlug,
  };
}

export async function getFeaturedRobots(): Promise<Robot[]> {
  const rows = await prisma.robot.findMany({ where: { featured: true }, take: 6 });
  return rows.map(toRobot);
}

export async function getAllRobots(): Promise<Robot[]> {
  const rows = await prisma.robot.findMany({ orderBy: { name: 'asc' } });
  return rows.map(toRobot);
}

export async function getRobotBySlug(slug: string): Promise<Robot | null> {
  const row = await prisma.robot.findUnique({ where: { id: slug } });
  return row ? toRobot(row) : null;
}

export async function getRelatedRobots(robot: Robot, limit = 3): Promise<Robot[]> {
  const rows = await prisma.robot.findMany({
    where: {
      id: { not: robot.id },
      OR: [
        { manufacturerSlug: robot.manufacturerSlug },
        { category: robot.category },
      ],
    },
    take: limit,
  });
  return rows.map(toRobot);
}

type DbManufacturer = {
  id: string; name: string; country: string; founded: string;
  description: string; website: string; robotIds: string;
  imageUrl: string; featured: boolean;
};

function toManufacturer(m: DbManufacturer): Manufacturer {
  return { ...m, robotIds: JSON.parse(m.robotIds) };
}

export async function getAllManufacturers(): Promise<Manufacturer[]> {
  const rows = await prisma.manufacturer.findMany({ orderBy: { name: 'asc' } });
  return rows.map(toManufacturer);
}

export async function getFeaturedManufacturers(): Promise<Manufacturer[]> {
  const rows = await prisma.manufacturer.findMany({ where: { featured: true }, take: 6 });
  return rows.map(toManufacturer);
}

export async function getManufacturerBySlug(slug: string): Promise<Manufacturer | null> {
  const row = await prisma.manufacturer.findUnique({ where: { id: slug } });
  return row ? toManufacturer(row) : null;
}

type DbPartCategory = {
  id: string; name: string; description: string;
  itemCount: number; imageUrl: string; popularItems: string;
};

function toPartCategory(p: DbPartCategory): PartCategory {
  return { ...p, popularItems: JSON.parse(p.popularItems) };
}

export async function getAllPartCategories(): Promise<PartCategory[]> {
  const rows = await prisma.partCategory.findMany();
  return rows.map(toPartCategory);
}

export async function getAllRobotSlugs(): Promise<string[]> {
  const rows = await prisma.robot.findMany({ select: { id: true } });
  return rows.map(r => r.id);
}

export async function getAllManufacturerSlugs(): Promise<string[]> {
  const rows = await prisma.manufacturer.findMany({ select: { id: true } });
  return rows.map(m => m.id);
}

// ── Parts ─────────────────────────────────────────────────────────────────

type DbPart = {
  id: string; name: string; description: string; manufacturer: string;
  manufacturerSlug: string; category: string; subcategory: string;
  priceCAD: number; priceUSD: number; inStock: boolean; leadTimeDays: number | null;
  specifications: string; compatibility: string; imageUrl: string;
  datasheetUrl: string; featured: boolean;
};

function toPart(p: DbPart): Part {
  return {
    ...p,
    category: p.category as Part['category'],
    specifications: JSON.parse(p.specifications),
    compatibility: JSON.parse(p.compatibility),
  };
}

export async function getAllParts(): Promise<Part[]> {
  const rows = await prisma.part.findMany({ orderBy: { name: 'asc' } });
  return rows.map(toPart);
}

export async function getFeaturedParts(limit = 6): Promise<Part[]> {
  const rows = await prisma.part.findMany({ where: { featured: true }, take: limit });
  return rows.map(toPart);
}

export async function getPartBySlug(slug: string): Promise<Part | null> {
  const row = await prisma.part.findUnique({ where: { id: slug } });
  return row ? toPart(row) : null;
}

export async function getRelatedParts(part: Part, limit = 4): Promise<Part[]> {
  const rows = await prisma.part.findMany({
    where: {
      id: { not: part.id },
      category: part.category,
    },
    take: limit,
  });
  return rows.map(toPart);
}

export async function getPartsByCategory(category: string): Promise<Part[]> {
  const rows = await prisma.part.findMany({
    where: { category },
    orderBy: { name: 'asc' },
  });
  return rows.map(toPart);
}

export async function getCompatibleParts(robotSlug: string): Promise<Part[]> {
  // Since SQLite stores compatibility as JSON string, we use contains
  const rows = await prisma.part.findMany({
    where: { compatibility: { contains: robotSlug } },
    orderBy: { name: 'asc' },
  });
  return rows.map(toPart);
}

export async function getAllPartSlugs(): Promise<string[]> {
  const rows = await prisma.part.findMany({ select: { id: true } });
  return rows.map(p => p.id);
}

export async function getPartsCount(): Promise<number> {
  return prisma.part.count();
}

export async function getAdminStats() {
  const [robotCount, manufacturerCount, inquiryCount, recentInquiries] = await Promise.all([
    prisma.robot.count(),
    prisma.manufacturer.count(),
    prisma.inquiry.count(),
    prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  ]);

  const robots = await prisma.robot.findMany({
    select: { id: true, name: true, manufacturer: true, category: true, availability: true, featured: true, priceMin: true },
    orderBy: { name: 'asc' },
  });

  const categoryCounts = {
    consumer: robots.filter(r => r.category === 'consumer').length,
    enterprise: robots.filter(r => r.category === 'enterprise').length,
    research: robots.filter(r => r.category === 'research').length,
    announced: robots.filter(r => r.category === 'announced').length,
  };

  const availabilityCounts = {
    shipping: robots.filter(r => r.availability === 'shipping').length,
    preorder: robots.filter(r => r.availability === 'preorder').length,
    pilot: robots.filter(r => r.availability === 'pilot').length,
    announced: robots.filter(r => r.availability === 'announced').length,
    prototype: robots.filter(r => r.availability === 'prototype').length,
  };

  return { robotCount, manufacturerCount, inquiryCount, recentInquiries, robots, categoryCounts, availabilityCounts };
}

// ── Robots Page Queries ────────────────────────────────────────────────────

export async function getRobotsCount(): Promise<number> {
  return prisma.robot.count();
}

export async function getFilteredRobotsCount(where: Record<string, unknown>): Promise<number> {
  return prisma.robot.count({ where });
}

export async function getFilteredRobots(
  where: Record<string, unknown>,
  orderBy: Record<string, string>,
  skip: number,
  take: number
): Promise<Robot[]> {
  const rows = await prisma.robot.findMany({ where, orderBy, skip, take });
  return rows.map(toRobot);
}

export async function getRobotFacets() {
  const rows = await prisma.robot.findMany({
    select: { category: true, availability: true, manufacturerSlug: true, manufacturer: true, country: true, priceMin: true },
  });
  return rows;
}

// ── Parts Page Queries ─────────────────────────────────────────────────────

export async function getFilteredPartsCount(where: Record<string, unknown>): Promise<number> {
  return prisma.part.count({ where });
}

export async function getFilteredParts(
  where: Record<string, unknown>,
  orderBy: Record<string, string>,
  skip: number,
  take: number
): Promise<Part[]> {
  const rows = await prisma.part.findMany({ where, orderBy, skip, take });
  return rows.map(toPart);
}

export async function getPartFacets() {
  const rows = await prisma.part.findMany({
    select: { category: true, manufacturerSlug: true, manufacturer: true },
  });
  return rows;
}

// ── Manufacturer Detail Queries ────────────────────────────────────────────

export async function getRobotsByManufacturerSlug(slug: string): Promise<Robot[]> {
  const rows = await prisma.robot.findMany({
    where: { manufacturerSlug: slug },
    orderBy: { name: 'asc' },
  });
  return rows.map(toRobot);
}
