import { ConnectButton, ConnectDialog, useWallet } from "@connect2ic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input";
import TransferProxy from "../../components/transfer-proxy";
import Wallet from "../../components/wallet";
import { toastSuccess } from "../../utils/toast";
import { TCrowdfundDetailModalProps } from "./crowdfund-detail-modal";
// @ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";

type TDonatePayload = {
  amount: number;
};

type TCrowdfundModalFormProps = {} & TCrowdfundDetailModalProps;

export default function CrowdfundModalForm({
  open,
  setOpen,
  post,
}: TCrowdfundModalFormProps) {
  const [transfering, setTransfering] = useState<boolean>(false);
  const [donatePayload, setDonatePayload] = useState<TDonatePayload>();
  const wallet = useWallet();

  console.log("Wallet : ", wallet);
  console.log(post.userWallet);
  console.log(post);

  if (!wallet || !wallet[0]) {
    return (
      <div className="text-white">
        <div className="mt-4">
          <ConnectButton></ConnectButton>
        </div>
        <ConnectDialog></ConnectDialog>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TDonatePayload>();

  const onSubmit = (data: TDonatePayload) => {
    setTransfering(true);
    setDonatePayload(data);
  };

  const onFinish = async () => {
    toastSuccess("Thankyou for your donation!");
    const cDonation = await dream_weaver_backend.createDonation(
      "",
      post.username,
      donatePayload.amount,
      "",
      "Crowdfund"
    );

    const updatePost = await dream_weaver_backend.postSurplus(
      donatePayload.amount,
      post.id
    );
    console.log(updatePost);
    console.log(cDonation);
    setOpen(false);
  };

  return (
    <>
      {transfering && (
        <TransferProxy
          onFinish={onFinish}
          amount={getValues("amount")}
          walletPrincipal={
            "ca3788107ce144cbfa94b68ff0a8b498b5729a9f68d35cc58739c2f32e96eabd"
          }
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-6"
      >
        <Wallet className="text-white"></Wallet>
        <Input
          className="text-white"
          props={{
            ...register("amount", {
              required: "Amount must be required",
              min: { value: 0, message: "Minimal value is 0" },
            }),
            type: "number",
            min: 0,
            max: 100,
            step: 0.0001,
          }}
          titleClassName="text-white"
          title="Amount"
          placeholder="0.01 ICP"
        ></Input>
        <div className="sm:flex">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:w-auto"
          >
            Donate
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
