import moment from "moment";
import React from "react";
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
    navigate("/crowdfund/" + post.id);
  };
  const endDate = moment(Number(post.endDate));
  const currDate = moment();

  return (
    <Paper
      props={{ onClick: handleClick }}
      hoverable={true}
      className="relative cursor-pointer"
    >
      <div className="flex gap-5">
        <div style={{backgroundImage: `url('${post.imageUrl}')`}} className="bg-cover w-[40%] h-[220px]  rounded-l-lg rounded-r-md"></div>
        {/* <img className="rounded-md h-full w-[40%]" src={post.imageUrl} /> */}
        <div className="w-[60%] px-8 py-10 flex flex-col gap-5">
          <h1 className="text-xl font-bold">{post.description}</h1>
          <div className="flex flex-col gap-1">
            <div className="">
              {post.currentAmount} / {post.target} ICP
            </div>
            <ProgressBar percentage={post.currentAmount / post.target} />
          </div>
          <div className="flex justify-between">
            <div className="center gap-2">
              <img src={post.userProfile} className="w-8" />
              <h1>{post.username}</h1>
            </div>
            <div className=""></div>
            {endDate.diff(currDate, "days") > 0 && (
              <div className="">{endDate.diff(currDate, "days")} Days left</div>
            )}
            {endDate.diff(currDate, "days") == 0 && (
              <div className="">
                {endDate.diff(currDate, "hours")} Hours left
              </div>
            )}
            {endDate.diff(currDate, "hours") == 0 && (
              <div className="">
                {endDate.diff(currDate, "minutes")} minutes left
              </div>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
}
