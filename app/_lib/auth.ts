import { NextAuthOptions, Session, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/app/_lib/prisma';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@auth/prisma-adapter";

export type UserSession = Session & {
  user?: {
    id: string
  }
}

export async function getSession(): Promise<UserSession | null> {
  return getServerSession(authOption);
}

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    signIn({ user }) {
      return !!user;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup"
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign in",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        console.log('credentials', credentials)
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email
            }
          });

          if (user && await bcrypt.compare(credentials?.password || '', user.password)) {
            return user;
          }

          throw new Error('Bad user/password');
        } catch (err) {
          return null;
        }
      },
    })
  ]
}