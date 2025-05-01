/*
  Warnings:

  - You are about to drop the column `state` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "state",
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "flagged" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "TransactionState";
