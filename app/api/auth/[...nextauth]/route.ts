import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/src/service/prisma';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@auth/prisma-adapter";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
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
      }
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Register",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" },
        passwordValidation: { label: "Password validation", type: "password" }
      },
      async authorize(credentials, req) {
        try {

          if (credentials?.email && credentials?.password && credentials?.password === credentials?.passwordValidation) {
            const user = await prisma.user.create({
              data: {
                email: credentials.email,
                password: bcrypt.hashSync(credentials.password, bcrypt.genSaltSync(10))
              }
            });

            if (user && await bcrypt.compare(credentials?.password || '', user.password)) {
              return user;
            }
          }

          throw new Error('Bad user/password');
        } catch (err) {
          return null;
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }