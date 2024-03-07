import React, { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react';
import { TChildrenProps } from "../types/children-type";

type TButton = TChildrenProps & {
  style? : CSSProperties;
  className?: string;
  type?: 'primary' | 'secondary'
  onClick? :() => void;
  props?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

export default function Button({onClick, type = 'primary',props, children, style, className}: TButton) {
  let bgColor = ''
  if(type === 'primary'){
    bgColor = 'from-accent-1 to-accent-2 bg-gradient-to-b'
  }else if(type === 'secondary'){
    bgColor = 'bg-gray-700 hover:bg-gray-600'
  }
  return (
    <button onClick={onClick} style={style} className={`${className} ${bgColor} transition-all cursor-pointer py-1.5 px-5  rounded-md `} {...props}>{children}</button>
  )
}
