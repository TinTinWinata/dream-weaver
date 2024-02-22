import React, { useState } from 'react';
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../contexts/auth-context";
import Button from "./button";
import Icon from "./icon";
import ProxyLink from "./proxy-link";

export default function Navigation() {
  const { auth, user , logout} = useAuth();
  const handleLogin = () => user ?  logout() : auth('', '', '') 
  const [hover, setHover] = useState<boolean>(false);
  // console.log('user : ', user)
  return (
    <div 
      className="relative z-50 cursor-pointer w-full center h-28"
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)} 
    >
      <div 
        className={`absolute transition-all duration-700  top-[50%] ${hover ? 'left-[40%]' : 'left-[50%]'} translate-x-[-50%] translate-y-[-50%] z-20 bg-primary nav-icon-gradient`}
        >
        <ProxyLink to='/' className="center gap-2">
          <Icon/>
          <FaAngleDoubleRight className="text-gray-600 mt-2 h-8 w-8"/>
        </ProxyLink>
      </div>
      <div className={`absolute transition-all duration-700  top-[50%] ${hover ? 'left-[53%] opacity-100' : 'left-[40%] opacity-0'}  translate-y-[-50%] z-10 mt-1 center gap-3 font-bold`}>
        <Button onClick={handleLogin} type="secondary"  className="py-1">{user ? 'Logout' : 'Login'}</Button>
        {user &&  <Link to='/profile' className="rounded-md bg-gray-800 px-2 py-2 center gap-2">
          <img src={user.profilePicture} className="w-8 h-8"/>
          <div className="">{user.username}</div>
          </Link> }
      </div>
    </div> 
  )
}
