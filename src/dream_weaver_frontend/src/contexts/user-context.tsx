import { AuthClient } from "@dfinity/auth-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dream_weaver_backend } from "../declarations/dream_weaver_backend";
import { TChildrenProps } from "../types/children-type";
import { TUser } from "../types/user-type";
import { toastError } from "../utils/toast";

type TUserContext = {
  auth: (username: string, email: string) => Promise<void>;
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
      console.log("Authenticated!")
      update(authClient); 
    }
  };

  useEffect(() => {
    init();
  }, []);

  const update = async (authClient: AuthClient, name?: string, email?: string) => {
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
    }else if('Ok' in getUserResponse){
      setUser(getUserResponse.Ok)
    }

    setUser(user);
  };
  const auth = async (name: string, email: string) => {
    if (!authClient) return;
    const onSuccessCallback = async () => {
      console.log('Callback : ', name, email)
      update(authClient, name, email)
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
