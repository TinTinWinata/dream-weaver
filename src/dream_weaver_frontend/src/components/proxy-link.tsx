import { Link } from 'react-router-dom';
import { TChildrenProps } from '../types/children-type';

type TProxyLinkProps  = TChildrenProps & {
  to: string;
}

export default function ProxyLink({to, children}: TProxyLinkProps) {
  return (
    <Link to={`${to}`}>{children}</Link>
  )
}
