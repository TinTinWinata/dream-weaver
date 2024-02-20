import Icon from "./icon";
import ProxyLink from "./proxy-link";

export default function Navigation() {
  return (
    <div className="w-full center">
        <ProxyLink to='/'>
          <Icon/>
        </ProxyLink>
    </div>
  )
}
