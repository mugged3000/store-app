/*
  Warnings:

  - The values [unisex] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [home] on the enum `PageType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('men', 'women', 'shop');
ALTER TABLE "Product" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "public"."Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PageType_new" AS ENUM ('men', 'women', 'shop');
ALTER TABLE "PageHero" ALTER COLUMN "pageName" TYPE "PageType_new" USING ("pageName"::text::"PageType_new");
ALTER TYPE "PageType" RENAME TO "PageType_old";
ALTER TYPE "PageType_new" RENAME TO "PageType";
DROP TYPE "public"."PageType_old";
COMMIT;
