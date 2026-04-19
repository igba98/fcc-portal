import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { mockUsers } from "@/data/mock-users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: "fcc-mock-super-secret-prototype",
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = mockUsers.find((u: any) => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          return { id: user.id, email: user.email, name: user.name, role: user.role, portal: user.portal };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.portal = user.portal;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.portal = token.portal as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  }
});
