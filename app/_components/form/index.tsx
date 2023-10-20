"use client";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import styles from "./styles.module.css";

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  children: any,
  setLoading?: (val: boolean) => void;
  onSubmitted?: (data: any) => void;
}

export default function Form({ children, onSubmitted, setLoading, ...props }: Props) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading?.(true);
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });

    if (response.status >= 400)
      onSubmitted?.(new Error(await response.text()));
    else {
      try {
        const data = await response.json();
        onSubmitted?.(data);
      } catch (e) {
      }
      onSubmitted?.(null);
    }

    setLoading?.(false);
  }

  return <form onSubmit={handleSubmit} className={`flex flex-col w-full ${styles.form}`} {...props} >
    {children}
  </form>
}