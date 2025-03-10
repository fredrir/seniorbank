export type tParams = Promise<{ id: string }>;

//TODO change to prisma generated types
export type BankAccount = {
  title: string;
  accountNumber: string;
  balance: number;
  type: "savings" | "loan";
};

export type Transaction = {
  id: number;
  amount: number;
  date: string;
  to: string;
  from: string;
  description: string;
  accountNumber: string;
  type: "payment" | "deposit";
};
