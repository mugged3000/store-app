/*
  Warnings:

  - You are about to drop the `MenHero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopHero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopSlide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WomenHero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShopSlide" DROP CONSTRAINT "ShopSlide_shopHeroId_fkey";

-- DropTable
DROP TABLE "MenHero";

-- DropTable
DROP TABLE "ShopHero";

-- DropTable
DROP TABLE "ShopSlide";

-- DropTable
DROP TABLE "WomenHero";
