import { useBalance, useWallet } from "@connect2ic/react";
import React from 'react';
import Skeleton from "react-loading-skeleton";

type TWalletProps  = {
  isShowAddress?: boolean;
}

export default function Wallet({isShowAddress = false}: TWalletProps){
  const [wallet] = useWallet()
  const [assets] = useBalance()
  const icpAsset = assets ? assets.find((asset) => asset.name === 'ICP') : undefined;
  if(!wallet) return <></>
  return (
    <div className="">
      {isShowAddress && 
        <p>Your Wallet address: {wallet.principal}</p>
      }
      <div className="text-xl font-bold mt-3 flex gap-2">
        <div className="">ICP :</div>
        {!icpAsset ?
          <Skeleton />  :
          <div className="">{icpAsset.amount}</div>
        }
      </div>
    </div>
  )
}

