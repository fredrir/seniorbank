import { Difficulty } from "@prisma/client";
import { Account, DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      hasRegistered: boolean;
      accounts: Account[];
      difficulty: Difficulty;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    difficulty: Difficulty;
    hasRegistered: boolean;
    accounts: Account[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      name: string;
      email: string;
      hasRegistered: boolean;
      accounts: Account[];
      difficulty: Difficulty;
    };
  }
}
