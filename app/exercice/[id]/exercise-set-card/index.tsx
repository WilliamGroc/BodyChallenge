import { ExerciseSet } from "@prisma/client"
import { format } from 'date-fns';
import styled from './styles.module.css';

type Props = {
  exerciseSet: ExerciseSet;
}

// component for exercice set card
export default function ExerciceSetCard({ exerciseSet }: Props) {
  return <div className={styled.card}>
    <h3 className="text-xl font-bold">{format(exerciseSet.date!, 'dd/MM/yyyy HH:mm')}</h3>
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
