import { getSession } from "@/app/_lib/auth";
import { prisma } from '@/app/_lib/prisma';

export async function PATCH(req: any) {
  const session = await getSession();
  const formData = await req.formData();

  if (!session?.user)
    return new Response('Not authenticated', { status: 401 });

  await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname')
    }
  });

  await prisma.physicalStatics.create({
    data: {
      height: Number(formData.get('height')),
      weight: Number(formData.get('weight')),
      date: new Date(),
      user: {
        connect: {
          id: session.user.id
        }
      }
    }
  });

  const profile = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      physicalStat: true
    }
  });

  return new Response(JSON.stringify(profile), { status: 200 });
}