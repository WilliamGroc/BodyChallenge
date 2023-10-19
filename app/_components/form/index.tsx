"use client";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import styles from "./styles.module.css";

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  children: any,
  setLoading?: (val: boolean) => void;
}

export default function Form({ children, setLoading, ...props }: Props) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading?.(true);
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });

    try {
      const data = await response.json();
      setLoading?.(false);

      return data;
    } catch (e) {
    }

    setLoading?.(false);
  }

  return <form onSubmit={handleSubmit} className={`flex flex-col w-1/3 ${styles.form}`} {...props} >
    {children}
  </form>
}