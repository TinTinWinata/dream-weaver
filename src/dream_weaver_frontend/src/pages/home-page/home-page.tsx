import Lottie from "lottie-react";
import React from 'react';
import gamingVrAnimation from '../../animations/gaming-vr.json';
import peoplesAnimation from '../../animations/peoples.json';
import Button from "../../components/button";
import Paper from "../../components/paper";
import ProxyLink from "../../components/proxy-link";
import HomeCardContainer from "./home-card-container";
import HomeKidContainer from "./home-kid-container";

export default function HomePage() {
  return (
    <div className=" flex flex-col gap-12">
      <div className="">

        <Paper className="px-12 py-20 mt-5">
          <div className="flex ">
            <div className="w-full pl-6">
              <h1 className="text-5xl uppercase font-black">Dream Weaver</h1>
              <p className="text-secondary-text text-xl">Make's your dream come true</p>
              <ProxyLink to='/register'>
                <Button className="mt-5 px-16 py-3">take me to the space</Button>
              </ProxyLink>
            </div>
            <div className="relative  w-full h-full ">
              <Lottie className="absolute left-0 translate-y-[-40%]" animationData={gamingVrAnimation}/>
            </div>
          </div>
        </Paper>
      </div>



      <div className="h-32"></div>
      <HomeKidContainer/>
      <Paper className="mt-5 text-white bg-gradient-to-r to-accent-2 from-accent-1 p-12 flex flex-col">
        <div className="font-extrabold text-3xl ">
          Are you ready for something new ?
        </div>
        <div className="text-xl">Lets go dive in to the page!</div>
        <button className="transition-all hover:bg-white hover:text-gray-400 w-fit mt-8 px-6 py-3 rounded-xl border border-white border-opacity-20">Create Account</button>
      </Paper>
      <div className="h-12"></div>
      <HomeCardContainer/>
      <div className="h-2"></div>

      <div className=" h-[600px]">
        <div className="flex w-full h-full flex-col gap-3 ">
          <div className="flex  justify-center items-end  h-[40%] relative">
            <div className="absolute bottom-0 z-10 left-[55%] translate-x-[-50%] translate-y-[60%]">
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="53" viewBox="0 0 90 53" fill="none">
                <path d="M9.49232 52.7591L0.783591 -46.5229L89.9709 -6.02828L9.49232 52.7591Z" fill="#D9D9D9"/>
              </svg>
            </div>
            <div className="bg-white relative z-20 rounded-full p-12 text-center text-primary text-5xl font-black  w-[80%] h-[60%] center">SMALL DONATION FOR THE BIG IMPACT!</div>
          </div>
          <div className="relative h-[60%] w-full">
            <Lottie animationData={peoplesAnimation} className="w-full h-full absolute left-[50%] translate-x-[-50%] bottom-[-49px]"></Lottie>
          </div>
        </div>
      </div>
    </div>
  )
}
