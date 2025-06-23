/*
  Warnings:

  - You are about to drop the column `img` on the `Tweet` table. All the data in the column will be lost.
  - Made the column `text` on table `Tweet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "img",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "text" SET NOT NULL;
