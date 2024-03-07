import { TransferError, TransferResult } from "@connect2ic/core";
import { useTransfer } from "@connect2ic/react";
import React, { useEffect } from "react";
import { toastError } from "../utils/toast";

type TransferProxyProps = {
  amount: number;
  walletPrincipal: string;
  onError?: (error: { kind: TransferError } | undefined) => void;
  onLoading?: (bool: boolean) => void;
  onFinish?: () => void;
};

export default function TransferProxy({
  amount,
  walletPrincipal,
  onError,
  onLoading,
  onFinish,
}: TransferProxyProps) {
  const [transfer, { loading, error }] = useTransfer({
    to: walletPrincipal,
    amount: amount,
  });

  useEffect(() => {
    if (onLoading) onLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (onError) onError(error);
  }, [error]);

  const init = async () => {
    // const resp: TransferResult = await transfer();
    // if (resp.isErr()) {
    // toastError(resp.error)
    // } else {
    if (onFinish) onFinish();
    // }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}
