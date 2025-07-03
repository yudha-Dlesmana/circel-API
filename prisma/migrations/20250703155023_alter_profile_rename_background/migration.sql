/*
  Warnings:

  - You are about to drop the column `backgound` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "backgound",
ADD COLUMN     "background" TEXT;
