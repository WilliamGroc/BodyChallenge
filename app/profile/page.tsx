import FormProfile from "./form";
import { prisma } from '@/app/_lib/prisma';
import { getSession } from "../_lib/auth";
import { Suspense, cache } from "react";

const getData = cache(async () => {
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
        physicalStat: true,
      }
    })

    return profile;
  }
  return null;
})


export default async function Profile() {
  const initialValues = await getData();

  return <section className="flex justify-center">
    <Suspense fallback={<div>Loading...</div>}>
      <FormProfile initialData={initialValues} />
    </Suspense>
  </section>
}