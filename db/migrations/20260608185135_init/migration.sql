/*
  Warnings:

  - Added the required column `image` to the `MenHero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenHero" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "ShopHero" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "WomenHero" ADD COLUMN     "images" TEXT[];
