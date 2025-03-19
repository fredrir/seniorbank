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
    // async signIn({ account }): Promise<string | boolean> {
    // },

    async jwt({ token, user, account }) {
      try {
        if (account && user) {
          const dbUser = await prisma.user.findUnique({
            where: {
              email: user.email as string,
            },
            include: {
              accounts: true,
            },
          });

          if (dbUser) {
            token.user = {
              ...user,
              hasRegistered: true,
              difficulty: dbUser.difficulty,
              accounts: dbUser.accounts,
            };
          } else {
            token.user = {
              ...user,
              hasRegistered: false,
              difficulty: null,
              accounts: [],
            };
          }
          return token;
        }
      } catch (error) {
        console.error("Error in jwt callback", error);
      }
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          session.user.difficulty = token.user.difficulty;
          session.user.hasRegistered = token.user.hasRegistered;
          session.user.accounts = token.user.accounts;
        }
      } catch (error) {
        console.error("Error in session callback", error);
      }

      return session;
    },
  },
};
