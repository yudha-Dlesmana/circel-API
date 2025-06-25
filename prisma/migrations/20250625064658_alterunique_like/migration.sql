/*
  Warnings:

  - A unique constraint covering the columns `[tweetId,username]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_tweetId_username_key" ON "Like"("tweetId", "username");
