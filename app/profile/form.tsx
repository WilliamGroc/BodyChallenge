"use client"
import { useMemo, useState } from "react"
import Button from "../_components/button"
import Form from "../_components/form"
import InputGroup from "../_components/input-group"
import { PhysicalStatics, User } from "@prisma/client"

type Props = {
  initialData?: {
    id: string;
    firstname: string | null;
    lastname: string | null;
    physicalStat: {
      id: string;
      weight: number | null;
      height: number | null;
      date: Date | null;
      userId: string;
    }[];
  } | null
}

export default function FormProfile({ initialData }: Props) {
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDirty(true);
  }

  const lastPhysicalStatistic = useMemo(() => {
    if (initialData?.physicalStat?.length) {
      return initialData.physicalStat.sort(
        (a: PhysicalStatics, b: PhysicalStatics) => {
          if (a.date && b.date) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          }
          return 0;
        }
      )[initialData.physicalStat.length - 1];
    }
    return null;
  }, [initialData?.physicalStat]);


  return <Form method="PATCH" action="/api/profile" setLoading={setLoading}>
    <InputGroup
      label="Firstname"
      name="firstname"
      type="text"
      defaultValue={initialData?.firstname || ''}
      onChange={handleChange}
    />
    <InputGroup
      label="Lastname"
      name="lastname"
      type="text"
      defaultValue={initialData?.lastname || ''}
      onChange={handleChange}
    />
    <InputGroup
      label="Height"
      name="height"
      type="number"
      step={0.1}
      defaultValue={lastPhysicalStatistic?.height || 0}
      onChange={handleChange}
    />
    <InputGroup
      label="Weight"
      name="weight"
      type="number"
      step={0.1}
      defaultValue={lastPhysicalStatistic?.weight || 0}
      onChange={handleChange}
    />
    <Button type="submit" disabled={loading || !dirty}>Save</Button>
  </Form>
}