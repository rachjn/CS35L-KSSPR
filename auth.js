import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./lib/database";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.id = parseInt(token.sub, 10);
      }
      session.user.id = parseInt(token.id);
      

      
      // Fetch user data directly from database to ensure we have createdAt
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(token.id)
        }
      });

      if (user?.createdAt) {
        session.user.createdAt = user.createdAt;
      }
      
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.createdAt = user.createdAt;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
});