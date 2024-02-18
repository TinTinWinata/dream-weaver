import { CSSProperties } from "react";
import { TChildrenProps } from "../types/children-type";


type TButton = TChildrenProps & {
  style? : CSSProperties;
  className?: string;
  type?: 'primary' | 'secondary'
}

export default function Button({type = 'primary', children, style, className}: TButton) {
  let bgColor = ''
  if(type === 'primary'){
    bgColor = 'from-accent-1 to-accent-2 bg-gradient-to-b'
  }else if(type === 'secondary'){
    bgColor = 'bg-gray-700 hover:bg-gray-600'
  }
  return (
    <button style={style} className={`${className} ${bgColor} transition-all py-1.5 px-5  rounded-md `}>{children}</button>
  )
}
