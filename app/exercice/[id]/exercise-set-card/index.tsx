"use client";
import { ExerciseSet } from "@prisma/client"
import { format } from 'date-fns';
import styled from './styles.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";

type Props = {
  exerciseSet: ExerciseSet;
  exerciceId: string;
}

// component for exercice set card
export default function ExerciceSetCard({ exerciseSet, exerciceId }: Props) {
  const router = useRouter();
  
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`/api/exercice/${exerciceId}/set/${exerciseSet.id}`, {
      method: 'DELETE'
    });

    if (response.ok)
      router.refresh();
    else
      alert('Error');
  }

  return <div className={styled.card}>
    <div className="flex justify-between">
      <h3 className="text-xl font-bold">{format(exerciseSet.date!, 'dd/MM/yyyy HH:mm')}</h3>
      <form onSubmit={handleDelete}>
        <button type="submit">
          <DeleteIcon />
        </button>
      </form>
    </div>
    <div>
      <b>Reps</b>
      <div>
        {exerciseSet.reps}
      </div>
    </div>
    <div>
      <b>Weight</b>
      <div>
        {exerciseSet.weight} Kg
      </div>
    </div>
    <div>
      <b>Time</b>
      <div>
        {format(new Date(exerciseSet.time || 0), 'mm:ss')}
      </div>
    </div>
  </div>
}
