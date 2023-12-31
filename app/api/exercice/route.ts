import { getSession } from '@/app/_lib/auth';
import { prisma } from '@/app/_lib/prisma';

export async function POST(req: Request) {
  const session = await getSession();
  const formData = await req.formData();

  if (session?.user) {
    await prisma.exercise.create({
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return new Response('ok');
  }

  return new Response('Not authenticated', { status: 401 });
}