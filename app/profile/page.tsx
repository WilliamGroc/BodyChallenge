import Form from "./form";
import { prisma } from '@/app/_lib/prisma';
import { getSession } from "../_lib/auth";


async function getData() {
  const session = await getSession();

  if (session?.user) {
    const profile = await prisma.user.findUnique({
      where: {
        id: session?.user.id
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      }
    })

    return profile;
  }
  return null;
}


export default async function Profile() {
  const initialValues = await getData();

  return <section className="flex justify-center">
    <Form initialData={{
      ...initialValues,
      firstname: initialValues?.firstname || '',
      lastname: initialValues?.lastname || '',
    }} />
  </section>
}