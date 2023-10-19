import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import styles from "./styles.module.css";

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  children: any
}

export default function Form({ children, ...props }: Props) {
  return <form {...props} className={`flex flex-col w-1/3 ${styles.form}`} >
    {children}
  </form>
}