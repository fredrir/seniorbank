import { Difficulty } from "@prisma/client";
import { Account, DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      hasRegistered: boolean;
      accounts: Account[];
      difficulty: Difficulty | null;
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
    difficulty: Difficulty;
    hasRegistered: boolean;
    accounts: Account[];
  }
}
