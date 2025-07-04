/*
  Warnings:

  - You are about to drop the column `username` on the `Tweet` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_username_fkey";

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
