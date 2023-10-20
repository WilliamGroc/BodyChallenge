"use client";
import styled from './styles.module.css';
import Form from "../../../_components/form";
import InputGroup from "../../../_components/input-group";
import Button from "../../../_components/button";
import { useRouter } from 'next/navigation';

type Props = {
  exerciceId: string;
}

// component for exercice set card
export default function ExerciceSetCardForm({ exerciceId }: Props) {
  const router = useRouter();

  const handleSubmitted = (data: any) => {
    if (data instanceof Error)
      alert(data.message);
    else
      router.refresh();
  }

  return <div className={styled.card}>
    <Form method="POST" action={`/api/exercice/${exerciceId}/set`} onSubmitted={handleSubmitted} >
      <InputGroup label="Reps" name="reps" type="number" />
      <InputGroup label="Weight (Kg)" name="weight" type="number" />
      <InputGroup label="Time" name="time" type="time" />
      <Button>Save</Button>
    </Form>
  </div>
}
