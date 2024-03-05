import { ErrorMessage } from "@hookform/error-message";
import React, { DetailedHTMLProps, ReactNode } from 'react';
import ErrorText from "./error-text";

type TInput = {
  title: string;
  placeholder?: string;
  props?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  children?: ReactNode
  errors?: { [x: string]: any; };
  className?: string;
  titleClassName?:string;
}

export default function Input({titleClassName= '' ,className = '', errors,  title, placeholder, props, children} : TInput) {
  let name = ''
  if(props && props.name){
    name = props.name;
  }
  return (
    <div className="flex flex-col gap-1">
      <h1 className={titleClassName}>{title}</h1>
      <input placeholder={placeholder} className={`border border-gray-500 rounded-xl px-3 py-2 bg-transparent ${className}`} {...props}/>
      {children}
      {errors && 
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <ErrorText>{message}</ErrorText>}
          />
        }
    </div>
  )
}
