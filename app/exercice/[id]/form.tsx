"use client";

import Button from "@/app/_components/button";
import Form from "@/app/_components/form";
import InputGroup from "@/app/_components/input-group";
import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  initialData: Partial<Exercise> | null;
  isCreate?: boolean;
}

export default function FormExercice({ initialData, isCreate }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDirty(true);
  }

  const handleSubmitted = (data: any) => {
    if (data instanceof Error)
      alert(data.message);
    else
      router.refresh();
  }

  return <Form
    method="POST"
    action={isCreate ? "/api/exercice" : `/api/exercice/${initialData?.id}`}
    onSubmitted={handleSubmitted}
    setLoading={setLoading}

  >
    <InputGroup
      label="Name"
      name="name"
      defaultValue={initialData?.name || ''}
      onChange={handleChange}
    />
    <InputGroup
      label="Description"
      name="description"
      defaultValue={initialData?.description || ''}
      onChange={handleChange}
    />
    <Button disabled={loading || !dirty}>Save</Button>
  </Form>
}