/*
  Warnings:

  - You are about to drop the column `name` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `userImage` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "name",
DROP COLUMN "userImage";
