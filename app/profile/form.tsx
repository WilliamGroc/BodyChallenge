"use client"
import { useState } from "react"
import Button from "../_components/button"
import Form from "../_components/form"
import InputGroup from "../_components/input-group"

type Props = {
  initialData: any
}
export default function FormProfile({ initialData }: Props) {

  const [formValues, setFormValues] = useState(initialData);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const body = new FormData(form)
    const response = await fetch('/api/profile', {
      method: 'PATCH',
      body,
    })
    if (response.ok) {
      const result = await response.json()
      console.log(result)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  return <Form onSubmit={onSubmit}>
    <InputGroup
      label="Firstname"
      name="firstname"
      value={formValues.firstname}
      onChange={handleChange}
    />
    <InputGroup
      label="Lastname"
      name="lastname"
      value={formValues.lastname}
      onChange={handleChange}
    />
    <Button type="submit">Save</Button>
  </Form>
}