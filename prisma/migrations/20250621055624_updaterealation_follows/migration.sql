/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Follows` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followerUsername,followingUsername]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerUsername` to the `Follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingUsername` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- DropIndex
DROP INDEX "Follows_followerId_followingId_key";

-- AlterTable
ALTER TABLE "Follows" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "followerUsername" TEXT NOT NULL,
ADD COLUMN     "followingUsername" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followerUsername_followingUsername_key" ON "Follows"("followerUsername", "followingUsername");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingUsername_fkey" FOREIGN KEY ("followingUsername") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerUsername_fkey" FOREIGN KEY ("followerUsername") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
