import { Difficulty } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      difficulty?: Difficulty | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    difficulty?: Difficulty;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    difficulty?: string;
  }
}
