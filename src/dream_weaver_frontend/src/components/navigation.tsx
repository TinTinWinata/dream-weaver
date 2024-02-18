import { Link } from "react-router-dom";
import Icon from "./icon";

export default function Navigation() {
  return (
    <div className="w-full center">
        <Link to='/'>
          <Icon/>
        </Link>
    </div>
  )
}
