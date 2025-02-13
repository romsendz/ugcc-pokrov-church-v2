import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@lib/prisma/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error(`Будь ласка, введіть email і пароль.`);
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error(`Неправильний email або пароль.`);
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        );
        if (!passwordMatch) {
          throw new Error(`Неправильний email або пароль.`);
        }

        // Now that we know email + password are correct, check verification
        if (!existingUser.isVerified) {
          throw new Error(
            JSON.stringify({
              code: "NOT_VERIFIED",
              userCreatedAt: existingUser.createdAt,
            }),
          );
        }

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
          isVerified: existingUser.isVerified,
          createdAt: existingUser.createdAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isVerified = token.isVerified;
      session.user.createdAt = token.createdAt;
      return session;
    },
    async redirect({ url, baseUrl }) {
      try {
        const parsedUrl = new URL(url, baseUrl);
        if (parsedUrl.origin === baseUrl) {
          return parsedUrl.href;
        }
      } catch {
        console.warn("Invalid redirect URL:", url);
      }
      return baseUrl + "/admin"; // Default safe fallback
    },
  },
};
