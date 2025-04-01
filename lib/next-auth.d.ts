import type { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User | null;
    email: string;
  }
}
