import { useState } from "react";
import { useForm } from "react-hook-form";

import { TransferError } from "@connect2ic/core";
import React from "react";
import { io } from "socket.io-client";
import Button from "../../components/button";
import Checkbox from "../../components/checkbox";
import Input from "../../components/input";
import Tag from "../../components/tag";
import TransferProxy from "../../components/transfer-proxy";
import Wallet from "../../components/wallet";
import useLoading from "../../contexts/loading-context";
import { TDonation } from "../../types/donation-type";
import { TUser } from "../../types/user-type";
import { toastError, toastSuccess } from "../../utils/toast";
// @ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
import { useNavigate } from "react-router-dom";

const defaultIcpButton = [1, 2, 3, 5, 10];

type TDonateFormProps = {
  name: string;
  user: TUser;
};

type TDonatePayload = {
  from: string;
  amount: number;
  message: string;
  checkbox: boolean;
};

export default function DonateForm({ name, user }: TDonateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TDonatePayload>();
  const { setLoading } = useLoading();
  const [transfering, setTransfering] = useState<boolean>(false);
  const socket = io("http://localhost:8888", { query: { name } });
  const navigate = useNavigate();
  const [donation, setDonation] = useState<TDonation>();

  const onSubmit = async (data: TDonatePayload) => {
    setTransfering(true);
    setDonation({
      amount: data.amount,
      from: data.from,
      message: data.message,
    });
  };

  const onError = (error: { kind: TransferError } | undefined) => {
    if (error) {
      toastError(error);
    }
  };

  const onLoading = (bool: boolean) => {
    setLoading(bool);
  };

  const onFinish = async () => {
    setTransfering(false);
    toastSuccess("Succesfully transfer!");
    setLoading(false);
    const cDonation = await dream_weaver_backend.createDonation(
      donation.from,
      name,
      Number(donation.amount),
      donation.message,
      "Donation"
    );
    socket.emit("send-message", { room: name, donation });
    navigate("/me");
  };

  const handleAdd = (val: string) => {
    let temp = parseInt(getValues("amount").toString(), 10);
    if (!temp) {
      temp = 0;
    }
    setValue("amount", temp + parseInt(val, 10));
  };

  return (
    <form
      className="relative z-10 flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Wallet></Wallet>
      {transfering && (
        <TransferProxy
          onFinish={onFinish}
          walletPrincipal={user.walletPrincipal}
          onLoading={onLoading}
          amount={getValues("amount")}
        />
      )}
      <Input
        errors={errors}
        placeholder="From"
        title="From"
        props={{
          ...register("from", {
            required: "From must be required",
            maxLength: {
              value: 40,
              message: "From cannot be more than 40 characters",
            },
          }),
        }}
      />
      <Input
        errors={errors}
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
        placeholder="1 ICP"
        title="Amount"
      >
        <div className="mt-1 grid grid-cols-5 grid-rows-1 gap-5">
          {defaultIcpButton.map((val) => (
            <Button
              props={{ type: "button" }}
              onClick={() => handleAdd(val.toString())}
              key={val}
              className="py-1 px-4"
            >{`${val} ICP`}</Button>
          ))}
        </div>
      </Input>
      <div className="flex flex-col gap-1">
        <h1>To</h1>
        <Tag name={name} image="/assets/profile.png" />
      </div>
      <Input
        errors={errors}
        placeholder="So nice to meet you!"
        title="Message"
        props={{
          ...register("message", {
            required: "Message must be required",
            maxLength: {
              value: 40,
              message: "Message cannot be more than 40 characters",
            },
          }),
        }}
      />
      <Checkbox
        props={{
          ...register("checkbox", { required: "Checkbox is required" }),
        }}
        description="I agree that this support is provided on a voluntary basis and not in return for commercial activities, in accordance with"
      />
      <Button className="w-full">Submit</Button>
    </form>
  );
}
