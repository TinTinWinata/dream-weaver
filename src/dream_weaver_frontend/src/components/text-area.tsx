import React, { DetailedHTMLProps, ReactNode } from 'react';

type TTextArea = {
  title: string;
  placeholder: string;
  props?: DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
  children?: ReactNode
  type?: string;
  className?: string;
}

export default function TextArea({ type='text', className, title, placeholder, props, children} : TTextArea) {
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <textarea placeholder={placeholder} className={` border border-gray-500 rounded-xl px-3 py-2 bg-transparent ${className}`} {...props}/>
      {children}
    </div>
  )
}
