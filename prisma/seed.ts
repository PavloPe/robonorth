import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import { robots } from '../src/data/robots';
import { manufacturers } from '../src/data/manufacturers';
import { partCategories } from '../src/data/parts';
import { parts } from '../src/data/parts-catalog';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🤖 Seeding RoboNorth database...\n');

  // Clean slate
  await prisma.inquiryItem.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.part.deleteMany();
  await prisma.partCategory.deleteMany();
  await prisma.manufacturer.deleteMany();
  await prisma.robot.deleteMany();
  console.log('🗑️  Cleared existing data');

  // ── Robots ──────────────────────────────────────────────────────────────
  for (const r of robots) {
    await prisma.robot.create({
      data: {
        id: r.id,
        name: r.name,
        manufacturer: r.manufacturer,
        manufacturerSlug: r.manufacturerSlug,
        price: r.price,
        priceMin: r.priceMin,
        availability: r.availability,
        category: r.category,
        useCase: JSON.stringify(r.useCase),
        description: r.description,
        country: r.country,
        imageUrl: r.imageUrl,
        featured: r.featured,
        canadaAvailable: r.canadaAvailable,
        specHeight: r.specs.height ?? null,
        specWeight: r.specs.weight ?? null,
        specDof: r.specs.dof ?? null,
        specBattery: r.specs.battery ?? null,
        specPayload: r.specs.payload ?? null,
        specSpeed: r.specs.speed ?? null,
        variants: r.variants ?? null,
        scores: r.scores ? JSON.stringify(r.scores) : null,
        categoryWinners: r.categoryWinners ? JSON.stringify(r.categoryWinners) : null,
        reviewSlug: r.reviewSlug ?? null,
      },
    });
  }
  console.log(`✅ Seeded ${robots.length} robots`);

  // ── Manufacturers ───────────────────────────────────────────────────────
  for (const m of manufacturers) {
    await prisma.manufacturer.create({
      data: {
        id: m.id,
        name: m.name,
        country: m.country,
        founded: m.founded,
        description: m.description,
        website: m.website,
        robotIds: JSON.stringify(m.robotIds),
        imageUrl: m.imageUrl,
        featured: m.featured,
      },
    });
  }
  console.log(`✅ Seeded ${manufacturers.length} manufacturers`);

  // ── Part Categories ─────────────────────────────────────────────────────
  for (const p of partCategories) {
    await prisma.partCategory.create({
      data: {
        id: p.id,
        name: p.name,
        description: p.description,
        itemCount: p.itemCount,
        imageUrl: p.imageUrl,
        popularItems: JSON.stringify(p.popularItems),
      },
    });
  }
  console.log(`✅ Seeded ${partCategories.length} part categories`);

  // ── Individual Parts ────────────────────────────────────────────────────
  for (const p of parts) {
    await prisma.part.create({
      data: {
        id: p.id,
        name: p.name,
        description: p.description,
        manufacturer: p.manufacturer,
        manufacturerSlug: p.manufacturerSlug,
        category: p.category,
        subcategory: p.subcategory,
        priceCAD: p.priceCAD,
        priceUSD: p.priceUSD,
        inStock: p.inStock,
        leadTimeDays: p.leadTimeDays,
        specifications: JSON.stringify(p.specifications),
        compatibility: JSON.stringify(p.compatibility),
        imageUrl: p.imageUrl,
        datasheetUrl: p.datasheetUrl,
        featured: p.featured,
      },
    });
  }
  console.log(`✅ Seeded ${parts.length} individual parts`);

  console.log('\n🎉 Done! Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
