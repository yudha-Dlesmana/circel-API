/*
  Warnings:

  - You are about to drop the column `repliesId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_repliesId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "repliesId",
ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
