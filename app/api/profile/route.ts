import { getSession } from "@/app/_lib/auth";
import { prisma } from '@/app/_lib/prisma';

export async function PATCH(req: any) {
  const session = await getSession();
  const formData = await req.formData();

  if (!session?.user)
    return new Response('Not authenticated', { status: 401 });

  const profile = await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname')
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
    }
  });

  return new Response(JSON.stringify(profile), { status: 200 });
}