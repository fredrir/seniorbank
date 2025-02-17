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
    // async jwt({ token, user, account }) {
    // },
    // async session({ session, token }) {},
  },
};
