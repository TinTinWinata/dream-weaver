import React from 'react';
import { useNavigate } from "react-router-dom";
import Paper from "../../components/paper";
import ProgressBar from "../../components/progress-bar";
import { TPost } from "../../types/post-type";

// type TCrowdfundCardProps = {
//   title: string;
// }

export default function CrowdfundCard({ post }: { post: TPost }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/crowdfund/1");
  };
  return (
    <Paper
      props={{ onClick: handleClick }}
      hoverable={true}
      className="relative cursor-pointer"
    >
      <div className="flex gap-5">
        <img
          className="rounded-md h-full w-[40%]"
          src="https://storage.nu.or.id/storage/post/16_9/big/img-20211213-wa0014_1639381607.jpg"
        />
        <div className="w-[60%] px-8 py-10 flex flex-col gap-5">
          <h1 className="text-xl font-bold">
            People cannot buy korma on romadhon please help
          </h1>
          <div className="flex flex-col gap-1">
            <div className="">5 / 20 ICP</div>
            <ProgressBar percentage={40} />
          </div>
          <div className="flex justify-between">
            <div className="center gap-2">
              <img src="/assets/profile.png" className="w-8" />
              <h1>TinTin Winata</h1>
            </div>
            <div className=""></div>
            <div className="">5 Days left</div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
