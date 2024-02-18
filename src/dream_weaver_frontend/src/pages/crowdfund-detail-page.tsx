import Lottie from "lottie-react";
import { FaHeart } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import donationAnimation from '../animations/donate.json';
import Button from "../components/button";
import Paper from "../components/paper";
import ProgressBar from "../components/progress-bar";


export default function CrowdfundDetailPage() {
  return (
    <div className="flex flex-col gap-5">
      <Paper className="p-5 flex flex-col gap-4">
        <div
        style={{
          backgroundImage: `url('https://storage.nu.or.id/storage/post/16_9/big/img-20211213-wa0014_1639381607.jpg')`}}
          className="bg-cover rounded-xl w-full h-[400px]" 
        ></div>
        <div className="px-5 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">“People cannot by korma on romadhon please help”</h1>
          <div className="flex justify-between items-end">
            <h1 className="font-black text-3xl"> 5 / 20 ICP</h1>
            <div className=""></div>
            <div className="text-gray-500">5 Days Left</div>
          </div>
          <ProgressBar percentage={40}/>
          <div className="py-5 mt-3 flex justify-between">
            <div className="w-full center flex-col gap-2">
              <FaHeart className="text-red-500 w-16 h-16"/>
              <div>8 Donated</div>
            </div>
            <div className="border-r border-gray-700"></div>
            <div className="w-full center flex-col gap-2">
              <FcAbout className="text-red-500 w-16 h-16"/>
              <div>Description</div>
            </div>
            <div className="border-r border-gray-700"></div>
            <div className="w-full center flex-col gap-2">
              <div className="w-16 h-16 relative">
              <Lottie className="w-60 left-[50%] translate-x-[-50%] translate-y-[-50%] top-[35%] absolute" animationData={donationAnimation}/>
              </div>
              <div>Donate</div>
            </div>
          </div>
        </div>
      </Paper>
      <Paper className="p-5">
          <h1 className="text-xl mb-2">Description</h1>
          <p className="text-gray-500">Once upon a time, in the bustling city of Romadhon, there was a peculiar tradition that baffled many outsiders. It was the month of Ramadan, a time of fasting and spiritual reflection for Muslims around the world.<br/><br/>However, in Romadhon, there was an additional, seemingly arbitrary rule that stirred curiosity and intrigue among both locals and visitors alike: during Ramadan, people were forbidden from buying or consuming korma.<br/><br/>Korma, a beloved dish of the region, with its rich blend of spices and tender meat or vegetables, was typically enjoyed year-round. But come Ramadan, it became elusive, unattainable to anyone who sought its comforting flavors.<br/><br/>Among the residents of Romadhon was a young man named Amir. Amir was a curious soul, always eager to unravel the mysteries that surrounded him. When he heard about the prohibition on korma during Ramadan, his interest was piqued. He couldn't understand why such a seemingly innocent dish would be forbidden during this holiest of months.
</p>

      </Paper>
      <div className="flex flex-col w-full gap-2">
        <Button  type="secondary" className="py-2 bg-gray-50">Share</Button>
        <Button className="py-2">Donate</Button>
      </div>
    </div>
  )
}
