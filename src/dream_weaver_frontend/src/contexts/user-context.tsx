import { AuthClient } from "@dfinity/auth-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TChildrenProps } from "../types/children-type";
import { TUser } from "../types/user-type";
import { toastError } from "../utils/toast";
// @ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
type TUserContext = {
  auth: (username: string, email: string, callback?: () => void) => Promise<void>;
  user: TUser | undefined;
  logout: () => Promise<void>;
};

const context = createContext<TUserContext>({} as TUserContext);

export function UserProvider({ children }: TChildrenProps) {
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [user, setUser] = useState<TUser>();
  const navigate = useNavigate();

  const init = async () => {
    const authClient = await AuthClient.create();
    setAuthClient(authClient);
    if (await authClient.isAuthenticated()) {
      update(authClient); 
    }
  };

  useEffect(() => {
    init();
  }, []);

  const update = async (authClient: AuthClient, name?: string, email?: string, callback?: ()=>void) => {
    setAuthClient(authClient);

    const getUserResponse = await dream_weaver_backend.getUser(
      authClient.getIdentity().getPrincipal()
    );

    if('Err' in getUserResponse && 'UserNotFound' in getUserResponse.Err && name && email){
      const registerResponse = await dream_weaver_backend.register(
        name,
        email,
        authClient.getIdentity().getPrincipal()
      );
      if('Ok' in registerResponse){
        setUser(registerResponse.Ok)
      }else{
        toastError(registerResponse.Err)
      }
    }else if ('Err' in getUserResponse){
      await authClient.logout();
      toastError('You didn\'t have account, please register first!')
    }
    else if('Ok' in getUserResponse){
      setUser(getUserResponse.Ok)
    }

    if(callback) callback();
  };
  const auth = async (name: string, email: string, callback?: () => void) => {
    if (!authClient) return;
    const onSuccessCallback = async () => {
      update(authClient, name, email, callback)
    }
    authClient.login({
      onSuccess: onSuccessCallback,
    });
  };
  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setUser(undefined);
    navigate("/");
  };
  const data = { auth, user, logout };
  return <context.Provider value={data}>{children}</context.Provider>;
}

export default function useUser() {
  return useContext(context);
}
