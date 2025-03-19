import { prisma } from "@/lib/db";
import { NextAuthOptions } from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email as string },
        include: {
          accounts: true,
        },
      });

      try {
        if (session.user && user) {
          session.user.name = user.name as string;
          session.user.email = user.email;
          session.user.birthDate = user.birthDate ?? undefined;
          session.user.address = user.address ?? undefined;
          session.user.difficulty = user.difficulty;
          session.user.hasRegistered = user.hasRegistered;
          session.user.bankAccounts = user.accounts;
        }
      } catch (error) {
        console.error("Error in session callback", error);
        throw new Error("Error in session callback");
      }
      return session;
    },
  },
};
