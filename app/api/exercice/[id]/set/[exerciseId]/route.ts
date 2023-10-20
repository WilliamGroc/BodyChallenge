import { getSession } from '@/app/_lib/auth';
import { prisma } from '@/app/_lib/prisma';

export async function DELETE(req: Request, { params: { exerciseId } }: { params: { id: string, exerciseId: string } }) {
  const session = await getSession();

  if (session?.user) {
    await prisma.exerciseSet.delete({
      where: {
        id: exerciseId
      },
    });

    return new Response('ok');
  }
  return new Response('Not authenticated', { status: 401 });
}