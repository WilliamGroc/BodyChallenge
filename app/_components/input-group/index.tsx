import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import Input from "../input";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
  className?: string;
}

export default function InputGroup({ label, className, ...props }: Props) {
  return <label className={`flex flex-col ${className}`}>
    {label}
    <Input {...props} />
  </label>
}