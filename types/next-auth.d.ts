import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: "ADMIN" | "CLIENT" | string;
    companyName?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CLIENT" | string;
      companyName?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "ADMIN" | "CLIENT" | string;
    companyName?: string | null;
  }
}
