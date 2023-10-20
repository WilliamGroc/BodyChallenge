import Link from "next/link";
import FormExercice from "./form";
import Button from "@/app/_components/button";
import { prisma } from "@/app/_lib/prisma";
import ExerciseSetCard from "@/app/exercice/[id]/exercise-set-card";
import ExerciceSetCardForm from "@/app/exercice/[id]/exercise-set-card/form";

//Get exercice by id
async function getExercise(id: string) {
  if (id === 'create') return null;

  const exercice = await prisma.exercise.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      name: true,
      description: true,
      exerciseSets: true
    }
  });

  return exercice;
}

export default async function Exercice({ params }: { params: { id: string } }) {
  const exercise = await getExercise(params.id);

  return <main>
    <Link href="/"><Button>Back</Button></Link>
    <section className="flex justify-center">
      <div className="w-1/3">
        <FormExercice initialData={exercise} isCreate={params.id === 'create'} />
      </div>
    </section>
    {
      exercise && <section className="w-full flex flex-wrap mt-3">
        <ExerciceSetCardForm exerciceId={exercise!.id!} />
        {exercise.exerciseSets.map(exerciseSet => <ExerciseSetCard exerciseSet={exerciseSet} key={exerciseSet.id} />)}
      </section>
    }

  </main>
}