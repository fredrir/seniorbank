import { OnlyFields } from "@/lib/types";

export type PublicBankAccountDetails = Pick<
  BankAccountData,
  "id" | "name" | "category"
>;

export class BankAccount {
  public id: string;
  public name: string;
  public category: string | null;
  public userId: string | null;
  public balance: number;
  public main: boolean;
  public countryCode: string;

  constructor({
    id,
    name,
    userId,
    balance,
    category,
    main,
    countryCode,
  }: BankAccountData) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.userId = userId;
    this.balance = balance;
    this.main = main;
    this.countryCode = countryCode;
  }

  publicDetails(): PublicBankAccountDetails {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
    };
  }
}

type BankAccountData = OnlyFields<BankAccount>;
