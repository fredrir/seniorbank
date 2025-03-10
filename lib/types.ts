export type tParams = Promise<{ id: string }>;

//TODO change to prisma generated types
export type BankAccount = {
  title: string;
  accountNumber: string;
  balance: number;
  type: "savings" | "loan";
};
