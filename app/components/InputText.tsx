import type { ReactNode } from "react";

type InputTextProps = {
  name: string
  defaultValue?: string | undefined
  required?: boolean
  children: ReactNode
}

export const InputText = ({ name, defaultValue, required = false, children }: InputTextProps) => {
  return <>
    <label htmlFor={name}>{children}</label>
    <input type="text" name={name} id={name} defaultValue={defaultValue} required={required}/>
  </>;
}
