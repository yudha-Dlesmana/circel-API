/*
  Warnings:

  - Added the required column `profile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_tweetId_fkey";

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "text" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
