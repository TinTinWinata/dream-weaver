import { Link } from 'react-router-dom';
import { TChildrenProps } from '../types/children-type';

type TProxyLinkProps  = TChildrenProps & {
  to: string;
  className?: string;
}

export default function ProxyLink({to, children, className}: TProxyLinkProps) {
  return (
    <Link to={`${to}`} className={className}>{children}</Link>
  )
}
