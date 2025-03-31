import { BankAccount } from "@prisma/client";
import { Difficulty } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import type { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User | null
    email: string
  }
}
