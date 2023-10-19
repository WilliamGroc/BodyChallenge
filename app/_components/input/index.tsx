import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

export default function Input(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <input {...props} className={styles.input} />
}