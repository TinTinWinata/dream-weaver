import { CSSProperties } from "react";
import { TChildrenProps } from "../types/children-type";

type TButton = TChildrenProps & {
  style? : CSSProperties;
  className?: string;
}

export default function Button({children, style, className}: TButton) {
  return (
    <button style={style} className={`bg-gradient-to-b py-1.5 px-5 from-accent-1 to-accent-2 rounded-md ${className}`}>{children}</button>
  )
}
