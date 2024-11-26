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
      session.user.scores = token.scores || [];
      // console.log({ sessionToken: token, session });
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          const scores = await prisma.score.findMany({
            where: { userId: parseInt(user.id, 10) },
            include: {
              challenge: true,
            },
          });

          // console.log("Fetched Scores for JWT:", scores);

          token.scores = scores.map((score) => ({
            id: score.id,
            score: score.score,
            wpm: score.wpm,
            challengeId: score.challengeId,
            challenge: score.challenge,
            createdAt: score.createdAt,
          }));
        } catch (error) {
          console.error("Error fetching scores in JWT callback:", error);
        }
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
