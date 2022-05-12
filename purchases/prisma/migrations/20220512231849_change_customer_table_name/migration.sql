/*
  Warnings:

  - You are about to drop the column `costumerId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `Costumer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_costumerId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "costumerId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Costumer";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authUserId_key" ON "Customer"("authUserId");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
