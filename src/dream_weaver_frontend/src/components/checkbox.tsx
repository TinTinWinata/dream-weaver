import { ErrorMessage } from "@hookform/error-message";
import React, { DetailedHTMLProps } from 'react';
import ErrorText from "./error-text";

type TCheckboxProps  = { 
  description: string;
  props?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  errors?: { [x: string]: any; };
}

export default function Checkbox({description, props, errors} : TCheckboxProps) {
  let name = ''
  if(props && props.name){
    name = props.name;
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 ">
        <input {...props} type="checkbox" className="h-fit mt-[0.35em]" />
        <div>{description}</div>
      </div>
      {errors && 
          <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (<ErrorText>fakyu la bro {message}</ErrorText>)}
          />
        }
    </div>
  )
}
