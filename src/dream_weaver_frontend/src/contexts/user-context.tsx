import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TChildrenProps } from "../types/children-type";

type User = { 
  identity: Identity;
  principal: Principal;
  name: string;
  email: string;
}

type TUserContext = {
  auth: () => Promise<void>;
  user: User | undefined;
}



const context = createContext<TUserContext>({} as TUserContext);

export function UserProvider({children}: TChildrenProps){
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const init = async () => {
    const authClient = await AuthClient.create()
    setAuthClient(authClient);
    if(await authClient.isAuthenticated()){
      update(authClient)
    }
  }

  useEffect(()=>{
    init()
  },[])

  const update = async (authClient: AuthClient) => {
    setAuthClient(authClient)
    const identity = authClient.getIdentity();
    const principal = identity.getPrincipal();
    const user: User = {
      email: 'tintin6892@gmail.com',
      identity,
      principal,
      name: 'tintinwinata'
    }
    setUser(user);
    navigate('/me')
  }
  const auth = async () => {
    if(!authClient) return;
    authClient.login({
      onSuccess: async () => {
        update(authClient);
      },
    });
  }

  const data = { auth , user}
  return <context.Provider value={data}>{children}</context.Provider>
}

export default function useUser(){
  return useContext(context);
}