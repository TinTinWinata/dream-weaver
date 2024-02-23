import { AuthClient } from "@dfinity/auth-client";
// @ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TChildrenProps } from "../types/children-type";
import { TUser } from "../types/user-type";
import { toastError } from "../utils/toast";
type TUserContext = {
  auth: (
    username: string,
    email: string,
    walletPrincipal: string,
    callback?: () => void,
    failCallback?: () => void
  ) => Promise<void>;
  user: TUser | undefined;
  logout: () => Promise<void>;
};

const context = createContext<TUserContext>({} as TUserContext);

export function UserProvider({ children }: TChildrenProps) {
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [user, setUser] = useState<TUser>();

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

  const update = async (
    authClient: AuthClient,
    name?: string,
    email?: string,
    walletPrincipal?: string,
    callback?: () => void,
    failCallback?: () => void
  ) => {
    setAuthClient(authClient);

    const getUserResponse = await dream_weaver_backend.getUser(
      authClient.getIdentity().getPrincipal()
    );

    if (
      "Err" in getUserResponse &&
      "UserNotFound" in getUserResponse.Err &&
      name &&
      email &&
      walletPrincipal
    ) {
      const registerResponse = await dream_weaver_backend.register(
        name,
        email,
        authClient.getIdentity().getPrincipal(),
        walletPrincipal
      );
      if ("Ok" in registerResponse) {
        const user: TUser = registerResponse.Ok;
        user.principal = authClient.getIdentity().getPrincipal();
        setUser(user);
      } else {
        toastError(registerResponse.Err);
        if (failCallback) failCallback();
        return;
      }
    } else if ("Err" in getUserResponse) {
      await authClient.logout();
      toastError("You didn't have account, please register first!");
      if (failCallback) failCallback();
      return;
    } else if ("Ok" in getUserResponse) {
      const user: TUser = getUserResponse.Ok;
      user.principal = authClient.getIdentity().getPrincipal();
      setUser(user);
    }

    if (callback) callback();
  };
  const auth = async (
    name: string,
    email: string,
    walletPrincipal: string,
    callback?: () => void,
    failCallback?: () => void
  ) => {
    if (!authClient) return;
    const onSuccessCallback = async () => {
      update(authClient, name, email, walletPrincipal, callback, failCallback);
    };
    authClient.login({
      onSuccess: onSuccessCallback,
    });
  };
  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setUser(undefined);
  };
  const data = { auth, user, logout };
  return <context.Provider value={data}>{children}</context.Provider>;
}

export default function useAuth() {
  return useContext(context);
}
