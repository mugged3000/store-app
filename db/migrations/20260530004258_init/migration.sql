/*
  Warnings:

  - You are about to drop the `PageHero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PageHero";

-- DropEnum
DROP TYPE "PageType";

-- CreateTable
CREATE TABLE "MenHero" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "backgroundImage" TEXT NOT NULL,

    CONSTRAINT "MenHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WomenHero" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,

    CONSTRAINT "WomenHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopHero" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ShopHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopSlide" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "description" TEXT,
    "shopHeroId" TEXT NOT NULL,

    CONSTRAINT "ShopSlide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShopSlide" ADD CONSTRAINT "ShopSlide_shopHeroId_fkey" FOREIGN KEY ("shopHeroId") REFERENCES "ShopHero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
