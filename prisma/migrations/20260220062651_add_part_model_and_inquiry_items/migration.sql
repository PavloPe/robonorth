-- CreateTable
CREATE TABLE "Part" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "manufacturerSlug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL DEFAULT '',
    "priceCAD" REAL NOT NULL,
    "priceUSD" REAL NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "leadTimeDays" INTEGER,
    "specifications" TEXT NOT NULL DEFAULT '{}',
    "compatibility" TEXT NOT NULL DEFAULT '[]',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "datasheetUrl" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InquiryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inquiryId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "InquiryItem_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "city" TEXT NOT NULL,
    "robot" TEXT,
    "message" TEXT,
    "type" TEXT NOT NULL DEFAULT 'general',
    "contactMethod" TEXT NOT NULL DEFAULT 'email',
    "referenceNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Inquiry" ("city", "createdAt", "email", "id", "message", "name", "phone", "robot") SELECT "city", "createdAt", "email", "id", "message", "name", "phone", "robot" FROM "Inquiry";
DROP TABLE "Inquiry";
ALTER TABLE "new_Inquiry" RENAME TO "Inquiry";
CREATE INDEX "Inquiry_email_idx" ON "Inquiry"("email");
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");
CREATE INDEX "Inquiry_referenceNumber_idx" ON "Inquiry"("referenceNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Part_category_idx" ON "Part"("category");

-- CreateIndex
CREATE INDEX "Part_manufacturerSlug_idx" ON "Part"("manufacturerSlug");

-- CreateIndex
CREATE INDEX "Part_priceCAD_idx" ON "Part"("priceCAD");

-- CreateIndex
CREATE INDEX "Part_featured_idx" ON "Part"("featured");

-- CreateIndex
CREATE INDEX "Part_inStock_idx" ON "Part"("inStock");

-- CreateIndex
CREATE INDEX "InquiryItem_inquiryId_idx" ON "InquiryItem"("inquiryId");
