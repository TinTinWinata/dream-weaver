import { ConnectButton, ConnectDialog, useWallet } from "@connect2ic/react";
import Lottie from "lottie-react";
import React from "react";
import { useParams } from "react-router-dom";
import dogAnimation from "../../animations/dog.json";
import Paper from "../../components/paper";
import useUser from "../../hooks/use-user";
import NotFoundPage from "../not-found-page";
import DonateForm from "./donate-form";

type TDonatePayload = {
  amount: number;
  message: string;
  checkbox: boolean;
};

export default function DonatePage() {
  const { name } = useParams();

  if (name) {
    const { user, isLoading } = useUser(name);
    const [wallet] = useWallet();

    if (isLoading) {
      return <></>;
    }

    if (!user) {
      return <NotFoundPage text="Ups! I cannot found the users"></NotFoundPage>;
    }

    if (!wallet) {
      return (
        <>
          <div>
            <ConnectButton></ConnectButton>
          </div>
          <ConnectDialog></ConnectDialog>
        </>
      );
    }
    return (
      <div>
        <h2 className="text-center text-2xl font-bold py-5 mt-2">{name}</h2>
        <div className="center relative">
          <Lottie
            animationData={dogAnimation}
            className="z-1 absolute top-20 left-56 w-40 translate-y-[-100%]"
          />
          <Paper className="max-w-[700px] mt-2 p-8">
            <>
              <DonateForm user={user} name={name} />
            </>
          </Paper>
        </div>
      </div>
    );
  }
  return <></>;
}
