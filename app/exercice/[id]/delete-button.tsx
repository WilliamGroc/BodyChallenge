"use client";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

type Props = {
  exerciceId: string;
}

export default function DeleteButton({ exerciceId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/exercice/${exerciceId}`, {
      method: 'DELETE'
    });

    if (response.ok){
      router.refresh();
      router.push('/');
    }
    else
      alert('Error');
  }

  return (
    <button onClick={handleDelete}>
      <DeleteIcon />
    </button>
  );
}