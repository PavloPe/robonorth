-- CreateTable
CREATE TABLE "Robot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "manufacturerSlug" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "priceMin" INTEGER NOT NULL,
    "availability" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "useCase" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "canadaAvailable" BOOLEAN NOT NULL DEFAULT true,
    "specHeight" REAL,
    "specWeight" REAL,
    "specDof" INTEGER,
    "specBattery" TEXT,
    "specPayload" REAL,
    "specSpeed" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "founded" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "robotIds" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PartCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "itemCount" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "popularItems" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT NOT NULL,
    "robot" TEXT,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Robot_category_idx" ON "Robot"("category");

-- CreateIndex
CREATE INDEX "Robot_availability_idx" ON "Robot"("availability");

-- CreateIndex
CREATE INDEX "Robot_manufacturerSlug_idx" ON "Robot"("manufacturerSlug");

-- CreateIndex
CREATE INDEX "Robot_priceMin_idx" ON "Robot"("priceMin");

-- CreateIndex
CREATE INDEX "Robot_featured_idx" ON "Robot"("featured");

-- CreateIndex
CREATE INDEX "Inquiry_email_idx" ON "Inquiry"("email");

-- CreateIndex
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");
