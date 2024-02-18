import { CSSProperties, HTMLAttributes } from 'react';
import { TChildrenProps } from '../types/children-type';

type TPaper = TChildrenProps & {
  className?: string;
  style?: CSSProperties;
  props?: HTMLAttributes<HTMLDivElement>
  hoverable?: boolean;
}

export default function Paper({props, children, style, className, hoverable = false}: TPaper) {
  return (
    <div  {...props} style={style} className={`${hoverable && 'hover:bg-secondary-hover'} relative transition-all rounded-xl bg-secondary ${className}`} >{children}</div>
  )
}
