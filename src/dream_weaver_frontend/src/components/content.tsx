import { ErrorMessage } from "@hookform/error-message";
import React, { DetailedHTMLProps, ReactNode, useState } from 'react';
import ErrorText from "./error-text";

type TContent = {
  title: string;
  props?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  children?: ReactNode
  value: string;
  errors?: { [x: string]: any; };
}

export default function Content({value = '', errors,  title, props, children} : TContent) {
  const [currentValue, setCurrentValue] = useState<string>(value);
  let name = ''
  if(props && props.name){
    name = props.name;
  }
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <input  
       value={currentValue}
       disabled={true} 
       onChange={(e) => setCurrentValue(e.target.value)} 
       className="border border-gray-500 rounded-xl px-3 text-gray-300 py-2 bg-transparent" {...props}/>
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
