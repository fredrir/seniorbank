import {
  getServerSession as _getServerSession,
  NextAuthOptions,
} from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import { redirect } from "next/navigation";
import { RegisteredSession } from "./next-auth";
import { userService } from "@/model/core";

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
    async session({ session, token }) {
      if (!token.sub) {
        console.error("No user id present in token");
        return session;
      }

      if (!token.email) {
        console.error("No email present in token");
        return session;
      }

      const user = await userService.get(token.sub);

      session.userId = token.sub;
      session.email = token.email;
      session.user = user;
      session.isRegistered = Boolean(user);

      return session;
    },
  },
};

export async function getUnregisteredSession() {
  const session = await _getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function getSession() {
  const session = await getUnregisteredSession();

  if (session.user === null || !session.isRegistered) {
    redirect("/register");
  }

  return { ...session, user: session.user } satisfies RegisteredSession;
}
