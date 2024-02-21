import { AuthClient } from "@dfinity/auth-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dream_weaver_backend } from "../declarations/dream_weaver_backend";
import { TChildrenProps } from "../types/children-type";
import { TUser } from "../types/user-type";

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

    console.log('Get user response : ',getUserResponse)
    console.log('Name : ', name)
    console.log('Email : ', email)

    if('Err' in getUserResponse && 'UserNotFound' in getUserResponse.Err && name && email){
      const registerResponse = await dream_weaver_backend.register(
        name,
        email,
        authClient.getIdentity().getPrincipal()
      );
      if('Ok' in registerResponse){
        console.log('reigster user : ', registerResponse.Ok)
        setUser(registerResponse.Ok)
      }
    }else if('Ok' in getUserResponse){
      console.log('reigster user : ', getUserResponse.Ok)
      setUser(getUserResponse.Ok)
    }

    console.log('User : ', user)
    setUser(user);

    navigate("/me");
  };
  const auth = async (name: string, email: string) => {
    if (!authClient) return;
    authClient.login({
      onSuccess: async () => {
        update(authClient,name, email);
      },
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
