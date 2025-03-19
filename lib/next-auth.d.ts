import { BankAccount } from "@prisma/client";
import { Difficulty } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      birthDate?: Date;
      phoneNumber?: string;
      address?: string;
      hasRegistered: boolean;
      bankAccounts: BankAccount[];
      difficulty: Difficulty;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    difficulty: Difficulty;
    hasRegistered: boolean;
    bankAccounts: BankAccount[];
    birthDate?: Date;
    phoneNumber?: string;
    address?: string;
  }
}
