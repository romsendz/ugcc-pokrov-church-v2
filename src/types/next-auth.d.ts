import { DefaultSession, DefaultJWT } from "next-auth";

// Extend the User type to include isVerified and createdAt
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isVerified: boolean;
      createdAt: Date;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isVerified: boolean;
    createdAt: Date;
  }
}

// Extend the JWT token type to include isVerified and createdAt
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    isVerified: boolean;
    createdAt: Date;
  }
}
