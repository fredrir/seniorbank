/*
  Warnings:

  - You are about to drop the column `approvedAt` on the `Transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Approval" AS ENUM ('APPROVED', 'DENIED');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "approvedAt",
ADD COLUMN     "approvalStatus" "Approval",
ADD COLUMN     "approvalTime" TIMESTAMP(3),
ADD COLUMN     "held" BOOLEAN NOT NULL DEFAULT false;
