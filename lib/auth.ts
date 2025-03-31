import { prisma } from "@/lib/db";
import { getServerSession as _getServerSession, NextAuthOptions, Session } from "next-auth";
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
        where: { email: session.email },
        include: {
          accounts: true,
        },
      });

      session.user = user

      return session;
    },
  },
};

let session: Session | null = null;
export async function getServerSession() {
  if (!session) {
    session = await _getServerSession(authOptions);

    if (!session) {
      throw new Error("No session found");
    }
  }
  return session;
}

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session) {
    throw new Error("No session found");
  }
  if (!session.user) {
    throw new Error("No user found");
  }
  return session.user;
}

