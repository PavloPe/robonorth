import prisma from './db';
import type { Robot, Manufacturer, PartCategory } from '@/types';

type DbRobot = {
  id: string; name: string; manufacturer: string; manufacturerSlug: string;
  price: string; priceMin: number; availability: string; category: string;
  useCase: string; description: string; country: string; imageUrl: string;
  featured: boolean; canadaAvailable: boolean;
  specHeight: number | null; specWeight: number | null; specDof: number | null;
  specBattery: string | null; specPayload: number | null; specSpeed: number | null;
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
