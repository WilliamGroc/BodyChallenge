import Button from "@/app/_components/button";
import Form from "@/app/_components/form";
import InputGroup from "@/app/_components/input-group";
import { Exercise } from "@prisma/client";

type Props = {
  initialData?: Exercise;
}

export default function FormExercice({ initialData }: Props) {
  return <Form method="POST" action="/api/exercice" >
    <InputGroup
      label="Name"
      name="name"
      defaultValue={initialData?.name || ''}
    />
    <InputGroup
      label="Description"
      name="description"
      defaultValue={initialData?.description || ''}
    />
    <Button>Send</Button>
  </Form>
}