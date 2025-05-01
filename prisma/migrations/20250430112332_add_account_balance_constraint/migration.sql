/*
  Warnings:

  - Added the required column `state` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionState" AS ENUM ('FLAGGED', 'DEFAULT', 'APPROVED');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN "state" "TransactionState" NOT NULL DEFAULT 'DEFAULT';

ALTER TABLE "BankAccount" ADD CONSTRAINT "positive_balance" CHECK ("balance" >= 0);
