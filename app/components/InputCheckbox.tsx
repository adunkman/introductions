import type { ReactNode } from "react";

type InputCheckboxProps = {
  name: string
  checked: boolean
  onChecked: (value: boolean) => any
  children: ReactNode
}

export const InputCheckbox = ({ name, checked, onChecked, children }: InputCheckboxProps) => {
  return <div className="checkbox-wrapper">
    <input type="checkbox" name={name} id={name} checked={checked} onChange={(e) => onChecked(e.target.checked)} />
    <label htmlFor={name}>{children}</label>
  </div>;
}
