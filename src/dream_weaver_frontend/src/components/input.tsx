import { DetailedHTMLProps, ReactNode } from "react";

type TInput = {
  title: string;
  placeholder: string;
  props?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  children?: ReactNode
  type?: string;
}

export default function Input({ type='text', title, placeholder, props, children} : TInput) {
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <input  placeholder={placeholder} className="border border-gray-500 rounded-xl px-3 py-2 bg-transparent" {...props}/>
      {children}
    </div>
  )
}
