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
  query?: string;
  flagged?: boolean;
  approved?: boolean;
}

export interface BankAccountRepository {
  get: (id: string) => Promise<BankAccount>;
  changeBalance: (id: string, amount: number) => Promise<void>;
  getMany: (ids: string[]) => Promise<BankAccount[]>;
  list: (
    filter?: BankAccountFilter,
    page?: Pagination,
  ) => Promise<BankAccount[]>;
  find: (filter: BankAccountFilter) => Promise<BankAccount | null>;
  create: (account: BankAccount) => Promise<BankAccount>;
  createMany: (accounts: BankAccount[]) => Promise<BankAccount[]>;
  getTransaction: (id: string) => Promise<Transaction | null>;
  listTransactions: (
    filter: TransactionFilter,
    page?: Pagination,
  ) => Promise<Transaction[]>;
  createTransaction: (transaction: Transaction) => Promise<Transaction>;
  createManyTransactions: (
    transactions: Transaction[],
  ) => Promise<Transaction[]>;
}
