import { BankAccount, Difficulty, Transaction } from "@prisma/client";

export type tParams = Promise<{ id: string }>;

export type searchParams = Promise<{
  search?: string;
}>;

export type TransactionDetails = Omit<
  Transaction,
  "fromAccountId" | "toAccountId"
> & {
  fromAccount: BankAccount;
  toAccount: BankAccount;
};

export type RegisterAccountFormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  difficulty: Difficulty;
};

export type PaymentFormData = {
  comment: string;
  amount: string;
  toAccount: string;
  fromAccount: string;
};
