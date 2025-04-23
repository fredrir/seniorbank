import { prisma } from "@/lib/db";
import {
  getServerSession as _getServerSession,
  NextAuthOptions,
} from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import { redirect } from "next/navigation";

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
      if (!session.user?.email) {
        throw new Error("No email found in session");
      }

      session.email = session.user.email;

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          accounts: true,
        },
      });

      session.user = user;

      return session;
    },
  },
};

export async function getServerSession() {
  return await _getServerSession(authOptions);
}

export async function checkServerSession() {
  const session = await getServerSession();

  if (session === null) {
    redirect("/login");
  }

  return session;
}

export async function checkRegisteredUser() {
  const session = await checkServerSession();

  if (session.user === null) {
    redirect("/register");
  }

  return session.user;
}
