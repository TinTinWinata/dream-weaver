// @ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
import { useEffect, useState } from "react";
import { TUser } from "../types/user-type";

export default function useUser(username: string){
  const [user, setUser] = useState<TUser>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetch = async (failCallback?: () =>void) => {
    setLoading(true);
    if(!username) return;
    const user = await dream_weaver_backend.getUserByName(username);
    if('Ok' in user){
      setUser(user.Ok)
    }else {
      if(failCallback) failCallback()
    }
    setLoading(false);
  }

  useEffect(()=> {
    fetch();
  },[username])

  return {user, isLoading};
}