/*
  Warnings:

  - You are about to drop the column `username` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tweetId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_username_fkey";

-- DropIndex
DROP INDEX "Like_commentId_username_key";

-- DropIndex
DROP INDEX "Like_tweetId_username_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_tweetId_userId_key" ON "Like"("tweetId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_commentId_userId_key" ON "Like"("commentId", "userId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
