import { ErrorMessage } from "@hookform/error-message";
import { DetailedHTMLProps, ReactNode } from "react";
import ErrorText from "./error-text";

type TInput = {
  title: string;
  placeholder?: string;
  props?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  children?: ReactNode
  type?: string;
  errors?: { [x: string]: any; };
}

export default function Input({errors,  title, placeholder, props, children} : TInput) {
  let name = ''
  if(props && props.name){
    name = props.name;
  }
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <input  placeholder={placeholder} className="border border-gray-500 rounded-xl px-3 py-2 bg-transparent" {...props}/>
      {children}
      <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <ErrorText>{message}</ErrorText>}
          />
    </div>
  )
}
