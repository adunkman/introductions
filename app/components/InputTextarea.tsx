import type { ReactNode } from "react";

type InputTextareaProps = {
  name: string
  value: string
  onChange: (value: string) => any
  children: ReactNode
}

export const InputTextarea = ({ name, value, onChange, children }: InputTextareaProps) => {
  return <>
    <label htmlFor={name}>{children}</label>
    <textarea name={name} id={name} value={value} onChange={(e) => onChange(e.target.value)}></textarea>
  </>;
}
