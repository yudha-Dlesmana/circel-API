/*
  Warnings:

  - Added the required column `name` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userImage" TEXT;
