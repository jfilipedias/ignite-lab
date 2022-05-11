/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Costumer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Costumer" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Costumer_authUserId_key" ON "Costumer"("authUserId");
