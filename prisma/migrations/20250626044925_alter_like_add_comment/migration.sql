/*
  Warnings:

  - A unique constraint covering the columns `[commentId,username]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "commentId" INTEGER,
ALTER COLUMN "tweetId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_commentId_username_key" ON "Like"("commentId", "username");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
