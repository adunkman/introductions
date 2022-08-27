import type { ReactNode } from "react";

type ToggleProps = {
  visible: boolean
  children: ReactNode
}

export const Toggle = ({ visible, children }: ToggleProps) => {
  return <>
    { visible ? children : "" }
  </>;
}
