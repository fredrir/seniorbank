import { BankAccount } from "@prisma/client";
import { Difficulty } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      hasRegistered: boolean;
      bankAccounts: BankAccount[];
      difficulty: Difficulty;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    difficulty: Difficulty;
    hasRegistered: boolean;
    bankAccounts: BankAccount[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name: string;
      email: string;
      hasRegistered: boolean;
      bankAccounts: BankAccount[];
      difficulty: Difficulty;
    };
  }
}
