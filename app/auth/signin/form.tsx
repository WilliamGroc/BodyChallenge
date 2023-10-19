"use client";
import Button from "@/app/_components/button";
import InputGroup from "@/app/_components/input-group";
import styles from "./styles.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/app/_components/form";

export default function FormSignin() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      if (res?.url)
        router.push(res.url);
    } catch (e: any) {
      console.error(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  return <Form onSubmit={handleSubmit}>
    <InputGroup
      label="Email"
      name="email"
      type="email"
      value={formValues.email}
      onChange={handleChange}
    />
    <InputGroup
      label="Password"
      name="password"
      type="password"
      value={formValues.password}
      onChange={handleChange}
    />
    <Button type="submit">Sign in</Button>
  </Form>
}