import { Exercise } from "@prisma/client"
import styles from './styles.module.css';
import Link from "next/link";

type Props = {
  exercice: Exercise;
}

export default function ExerciceCard({ exercice }: Props) {
  return <Link href={`/exercice/${exercice.id}`}>
    <div className={styles.card}>
      <h2>{exercice.name}</h2>
      <p>{exercice.description}</p>
    </div>
  </Link>
}