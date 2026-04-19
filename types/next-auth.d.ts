import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      portal: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
    portal?: string;
  }
}
