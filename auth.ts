import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            // Check hardcoded demo credentials fallback if database has not been seeded
            if (
              email === "admin@nexus.enterprise" &&
              password === "CyberNexus@2026"
            ) {
              return {
                id: "admin-root-01",
                name: "CyberNexus Root Admin",
                email: "admin@nexus.enterprise",
                role: "ADMIN",
                companyName: "Nexus Cybernetics Inc.",
              };
            }
            if (
              email === "client@enterprise.io" &&
              password === "CyberNexus@2026"
            ) {
              return {
                id: "client-demo-01",
                name: "Enterprise Client Corp",
                email: "client@enterprise.io",
                role: "CLIENT",
                companyName: "HyperScale Global Systems Ltd.",
              };
            }
            return null;
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            companyName: user.companyName,
          };
        } catch (error) {
          // Fallback demo credentials if database connection is offline during review/preview
          if (
            email === "admin@nexus.enterprise" &&
            password === "CyberNexus@2026"
          ) {
            return {
              id: "admin-root-01",
              name: "CyberNexus Root Admin",
              email: "admin@nexus.enterprise",
              role: "ADMIN",
              companyName: "Nexus Cybernetics Inc.",
            };
          }
          if (
            email === "client@enterprise.io" &&
            password === "CyberNexus@2026"
          ) {
            return {
              id: "client-demo-01",
              name: "Enterprise Client Corp",
              email: "client@enterprise.io",
              role: "CLIENT",
              companyName: "HyperScale Global Systems Ltd.",
            };
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "CLIENT";
        token.companyName = user.companyName || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || token.sub || "";
        session.user.role = (token.role as string) || "CLIENT";
        session.user.companyName = (token.companyName as string) || null;
      }
      return session;
    },
  },
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "nexus_enterprise_secret_cyber_neo_brutalism_key_2026_auth",
});
