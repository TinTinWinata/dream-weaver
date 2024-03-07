import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import animation from "../../animations/hero.json";
import Button from "../../components/button";
import Paper from "../../components/paper";
import CashflowCrowdfundTable from "./cashflow-crowdfund-table";
import CashflowDonateTable from "./cashflow-donate-table";
// @ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
import useAuth from "../../contexts/auth-context";
import { TCashflow } from "../../types/cashflow-type";
import { toastSuccess } from "../../utils/toast";

export default function CashflowPage() {
  const { user } = useAuth();
  const withdraw = async () => {
    const withdrawRes = await dream_weaver_backend.withdrawDonations(
      user.principal
    );
    console.log(withdrawRes);
  };
  const [donations, setDonations] = useState<TCashflow[]>([]);

  useEffect(() => {
    const getDonations = async () => {
      const userDonations = await dream_weaver_backend.getUserDonations(
        user.principal
      );
      console.log(userDonations);

      setDonations(userDonations.Ok);
    };
    getDonations();
  }, []);

  const onDonateLink = async () => {
    const url = `${import.meta.env.APP_URL}/donate/${user.username}`
    await navigator.clipboard.writeText(url);
    toastSuccess('Saved to your clipboard');
  }

  function filterDonation(arr: TCashflow[], type: string): TCashflow[] {
    return arr.filter((o) => o.donationType == type);
  }
  return (
    <div className="flex flex-col gap-3">
      <Paper>
        <div className="flex  px-5">
          <div className="w-full py-12 pl-8 flex justify-center flex-col gap-3">
            <div className="flex flex-col">
              <h2>Total Token</h2>
              <h1 className="font-black text-4xl">{user.currentMoney} ICP</h1>
            </div>
            <div>You can tell your friend to donate you!</div>
            <Button onClick={onDonateLink}>Get Donate Link</Button>
          </div>
          <div className="relative w-full">
            <Lottie
              className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] w-66"
              animationData={animation}
            />
          </div>
        </div>
      </Paper>
      <Paper className="p-5">
        <div className="">
          <CashflowDonateTable
            donations={filterDonation(donations, "Donation")}
          />
        </div>
      </Paper>
      <Paper className="p-5">
        <div className="">
          <CashflowCrowdfundTable
            donations={filterDonation(donations, "Crowdfund")}
          />
        </div>
      </Paper>
    </div>
  );
}
