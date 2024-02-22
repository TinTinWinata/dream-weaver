import { ErrorMessage } from "@hookform/error-message";
import React, { DetailedHTMLProps, ReactNode } from 'react';
import ErrorText from "./error-text";

type TTextArea = {
  title: string;
  placeholder: string;
  props?: DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  children?: ReactNode;
  type?: string;
  className?: string;
  errors?: { [x: string]: any };
};

export default function TextArea({
  type = "text",
  className,
  title,
  placeholder,
  props,
  children,
  errors,
}: TTextArea) {
  let name = "";
  if (props && props.name) {
    name = props.name;
  }
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <textarea
        placeholder={placeholder}
        className={` border border-gray-500 rounded-xl px-3 py-2 bg-transparent ${className}`}
        {...props}
      />
      {children}
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      )}
    </div>
  );
}
