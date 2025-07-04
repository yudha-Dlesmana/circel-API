/*
  Warnings:

  - You are about to drop the column `followerUsername` on the `Follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingUsername` on the `Follows` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followerId,followingId]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `Follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerUsername_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingUsername_fkey";

-- DropIndex
DROP INDEX "Follows_followerUsername_followingUsername_key";

-- AlterTable
ALTER TABLE "Follows" DROP COLUMN "followerUsername",
DROP COLUMN "followingUsername",
ADD COLUMN     "followerId" TEXT NOT NULL,
ADD COLUMN     "followingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followerId_followingId_key" ON "Follows"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
