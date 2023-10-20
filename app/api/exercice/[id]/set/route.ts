import { parse } from "date-fns";

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
  const formData = await req.formData();

  console.log(formData.get('time'))

  const exercice = await prisma?.exerciseSet.create({
    data: {
      weight: Number(formData.get('weight')),
      reps: Number(formData.get('reps')),
      time: parse(formData.get('time') as string, 'mm:ss', 0).getTime(),
      date: new Date(),
      exercise: {
        connect: {
          id: id,
        },
      },
    },
  });

  return new Response(JSON.stringify(exercice), {
    status: 201,
    headers: { 'content-type': 'application/json' },
  });
}