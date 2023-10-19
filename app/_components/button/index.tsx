import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: string;
}

export default function Button({
  children,
  ...props
}: Props) {
  return <button className={styles.button} {...props}>{children}</button>
}