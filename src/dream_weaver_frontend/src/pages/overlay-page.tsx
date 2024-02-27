import Lottie from 'lottie-react'
import React from 'react'
import coinAnimation from '../animations/coin.json'
import Icon from '../components/icon'

export default function OverlayPage() {
  return (
    <div className="p-5 font-nunito">
      <div className='rounded-lg overlay-shadow leading-10 bg-secondary text-white w-full h-fit px-10 pb-10 py-3 flex flex-col gap-2'>
        <div className="flex justify-between items-center">
          <div className="shadow-xl">
            <h2 className='text-xl'>TinTin has donate you</h2>
            <div className="text-[2.4em] font-bold flex items-center gap-4">
              <h1>0.0001 ICP</h1> 
              <div className="relative">
                <Lottie className='absolute top-[-2px] left-[15px] translate-x-[-50%] translate-y-[-50%] size-24' animationData={coinAnimation }/>
              </div>
            </div>
          </div>
          <div className=""></div>
          <div className="">
            <Icon/>
          </div>
        </div>
        <h1 className='text-2xl text-center font-bold text-[2em] mt-5'>" Semangat Ya Kamu "</h1>
      </div>
    </div>
  )
}

