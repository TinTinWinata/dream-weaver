import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import donationAnimation from "../../animations/donate.json";
import Button from "../../components/button";
import Paper from "../../components/paper";
import ProgressBar from "../../components/progress-bar";
import { TPost } from "../../types/post-type";
//@ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
import moment, { Moment } from "moment";
import { toastError } from "../../utils/toast";
import CrowdfundDetailModal from "./crowdfund-detail-modal";

export default function CrowdfundDetailPage() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [post, setPost] = useState<TPost>();
  const [endDate, setEndDate] = useState<Moment>();
  const [currDate, setCurrDate] = useState<Moment>();
  const nav = useNavigate();

  useEffect(() => {
    async function getPostWithId() {
      const getPostResponse = await dream_weaver_backend.getPost(id);
      if ("Ok" in getPostResponse) {
        setPost(getPostResponse.Ok);
        setEndDate(moment(Number(getPostResponse.Ok.endDate)));
        setCurrDate(moment());
      } else {
        toastError(getPostResponse.Err.PostNotFound);
        nav("/crowdfund");
      }
    }
    getPostWithId();
  }, []);

  return (
    <>
    {post &&
      <CrowdfundDetailModal post={post} open={openModal} setOpen={setOpenModal}/>
    }
    <div className="flex flex-col gap-5">
      <Paper className="p-5 flex flex-col gap-4">
        <div
          style={{
            backgroundImage: `url('${post?.imageUrl}')`,
          }}
          className="bg-cover rounded-xl w-full h-[400px]"
        ></div>
        <div className="px-5 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">“{post?.title}”</h1>
          <div className="flex justify-between items-end">
            <h1 className="font-black text-3xl">
              {post?.currentAmount} / {post?.target} ICP
            </h1>
            <div className=""></div>
            {endDate?.diff(currDate, "days") > 0 && (
              <div className="text-gray-500">
                {endDate?.diff(currDate, "days")} Days left
              </div>
            )}
            {endDate?.diff(currDate, "days") == 0 && (
              <div className="text-gray-500">
                {endDate.diff(currDate, "hours")} Hours left
              </div>
            )}
            {endDate?.diff(currDate, "hours") == 0 && (
              <div className="text-gray-500">
                {endDate.diff(currDate, "minutes")} minutes left
              </div>
            )}
          </div>
          <ProgressBar percentage={post?.currentAmount / post?.target} />
          <div className="py-5 mt-3 flex justify-between">
            <div className="w-full center flex-col gap-2">
              <FaHeart className="text-red-500 w-16 h-16" />
              <div>8 Donated</div>
            </div>
            <div className="border-r border-gray-700"></div>
            <div className="w-full center flex-col gap-2">
              <FcAbout className="text-red-500 w-16 h-16" />
              <div>Description</div>
            </div>
            <div className="border-r border-gray-700"></div>
            <div className="w-full center flex-col gap-2">
              <div className="w-16 h-16 relative">
                <Lottie
                  className="w-60 left-[50%] translate-x-[-50%] translate-y-[-50%] top-[35%] absolute"
                  animationData={donationAnimation}
                />
              </div>
              <div>Donate</div>
            </div>
          </div>
        </div>
      </Paper>
      <Paper className="p-5">
        <h1 className="text-xl mb-2">Description</h1>
        <p className="text-gray-500">{post?.description}</p>
      </Paper>
      <div className="flex flex-col w-full gap-3">
        <Button type="secondary" className="py-2 bg-gray-50">
          Share
        </Button>
        <Button className="py-2" onClick={() => setOpenModal(true)}>Donate</Button>
      </div>
    </div>
    </>
  );
}
