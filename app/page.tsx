import Link from "next/link";
import Button from "./_components/button";
import { prisma } from '@/app/_lib/prisma';
import { getSession } from "./_lib/auth";
import ExerciceCard from "./exercise-card";
import styles from './styles.module.css';

// get all exercices by user connected from database using async function 
async function getExercices() {
  const session = await getSession();

  if (session?.user) {
    const exercices = await prisma.exercise.findMany({
      where: {
        userId: session.user.id
      }
    })

    return exercices;
  }

  return [];
}

export default async function Home() {
  const exercices = await getExercices();

  return <main>
    <section>
      <Link href="/exercice/create"><Button>Create exercice</Button></Link>
      <div className={styles['card-container']}>
        {exercices.map(exercice => <ExerciceCard exercice={exercice} key={exercice.id} />)}
      </div>
    </section>
  </main>
}
