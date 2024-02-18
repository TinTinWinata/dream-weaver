import { CSSProperties } from 'react';
import { TChildrenProps } from '../types/children-type';

type TPaper = TChildrenProps & {
  className?: string;
  style?: CSSProperties;
}

export default function Paper({children, style, className}: TPaper) {
  return (
    <div style={style} className={`rounded-xl bg-secondary ${className}`} >{children}</div>
  )
}
