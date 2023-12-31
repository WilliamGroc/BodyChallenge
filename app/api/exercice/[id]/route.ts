import { getSession } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  const formData = await req.formData();

  if (session?.user) {
    await prisma.exercise.update({
      where: {
        id: params.id
      },
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

export async function DELETE(_: Request, { params: { id } }: { params: { id: string } }) {
  const session = await getSession();

  if (session?.user) {
    await prisma.exerciseSet.deleteMany({
      where: {
        exerciseId: id
      },
    });

    await prisma.exercise.delete({
      where: {
        id,
      }
    });

    return new Response('ok');
  }

  return new Response('Not authenticated', { status: 401 });
}