/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tweetCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_tweetId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "profile",
DROP COLUMN "tweetCount",
ADD COLUMN     "fullname" TEXT NOT NULL;

-- DropTable
DROP TABLE "Notification";
