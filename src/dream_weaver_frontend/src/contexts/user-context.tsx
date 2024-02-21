import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dream_weaver_backend } from "../declarations/dream_weaver_backend";
import { TChildrenProps } from "../types/children-type";
type User = {
  identity: Identity;
  principal: Principal;
  name: string;
  email: string;
};

type TUserContext = {
  auth: (username: string, email: string) => Promise<void>;
  user: User | undefined;
  logout: () => Promise<void>;
};

const context = createContext<TUserContext>({} as TUserContext);

export function UserProvider({ children }: TChildrenProps) {
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const init = async () => {
    const authClient = await AuthClient.create();
    setAuthClient(authClient);
    if (await authClient.isAuthenticated()) {
      console.log(authClient.getIdentity().getPrincipal());
      const response = await dream_weaver_backend.getUser(
        authClient.getIdentity().getPrincipal()
      );
      console.log(response);
      update(authClient);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const update = async (authClient: AuthClient) => {
    setAuthClient(authClient);
    const identity = authClient.getIdentity();
    const principal = identity.getPrincipal();
    const user: User = {
      email: "tintin6892@gmail.com",
      identity,
      principal,
      name: "tintinwinata",
    };
    setUser(user);
    navigate("/me");
  };
  const auth = async (name: string, email: string) => {
    if (!authClient) return;
    authClient.login({
      onSuccess: async () => {
        const response = await dream_weaver_backend.register(
          name,
          email,
          authClient.getIdentity().getPrincipal()
        );
        update(authClient);
      },
    });
  };
  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    navigate("/");
  };
  const data = { auth, user, logout };
  return <context.Provider value={data}>{children}</context.Provider>;
}

export default function useUser() {
  return useContext(context);
}
