import bcrypt from 'bcrypt';
import { prisma } from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formdata = await req.formData();

    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const passwordValidate = formdata.get('passwordValidate') as string;

    if (password && password === passwordValidate) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        }
      });

      return NextResponse.redirect('/auth/signin');
    }
    else {
      throw new Error('Password and password validation do not match');
    }

  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}