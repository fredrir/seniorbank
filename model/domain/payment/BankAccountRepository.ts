import { BankAccount } from "./BankAccount";
import { Pagination } from "@/model/utils/types";
import { Transaction } from "./Transaction";

export interface BankAccountFilter {
  userId?: string;
  name?: string;
  category?: string;
  countryCode?: string;
  main?: boolean;
}

export interface TransactionFilter {
  accountIds: string[];
  flagged?: boolean;
  held?: boolean;
  checked?: boolean;
}

export interface BankAccountRepository {
  get: (id: string) => Promise<BankAccount>;
  save: (account: BankAccount) => Promise<void>;
  changeBalance: (id: string, amount: number) => Promise<void>;
  getMany: (ids: string[]) => Promise<BankAccount[]>;
  list: (
    filter?: BankAccountFilter,
    page?: Pagination,
  ) => Promise<BankAccount[]>;
  find: (filter: BankAccountFilter) => Promise<BankAccount | null>;
  create: (account: BankAccount) => Promise<BankAccount>;
  createMany: (accounts: BankAccount[]) => Promise<BankAccount[]>;
  getTransaction: (id: string, accountId: string) => Promise<Transaction>;
  listTransactions: (
    filter: TransactionFilter,
    page?: Pagination,
  ) => Promise<Transaction[]>;
  createTransaction: (transaction: Transaction) => Promise<Transaction>;
  saveTransaction: (transaction: Transaction) => Promise<void>;
  createManyTransactions: (
    transactions: Transaction[],
  ) => Promise<Transaction[]>;
}
