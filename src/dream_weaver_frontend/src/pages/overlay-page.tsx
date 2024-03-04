import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import coinAnimation from '../animations/coin.json'
import Icon from '../components/icon'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import NotFoundPage from './not-found-page'
import useUser from '../hooks/use-user'
import { TDonation } from '../types/donation-type'

export default function OverlayPage() {
  const { name } = useParams();
  const { user, isLoading } = useUser(name);
  const [isVisible, setIsVisible] = useState(false);
  const [donations, setDonations] = useState<TDonation[]>([]);
  const [currentDonation, setCurrentDonation] = useState<TDonation>({
    amount: 0,
    from: "",
    message: ""
  });
  const socket = io("http://localhost:8888", { query: { name } });

  useEffect(() => {
    if (!isLoading && user) {

      socket.on('receive-message', (donation: TDonation) => {
        setDonations([...donations, donation]);
      });
    }
  }, [isLoading, name, user, socket]);

  useEffect(() => {
    if (donations.length != 0) {
      setIsVisible(true);
      setCurrentDonation(donations[0])

      const timer = setTimeout(() => {
        setIsVisible(false);
        setDonations(donations.slice(1))
      }, 2000);

      return () => {
        clearTimeout(timer)
      };
    }
  }, [donations])

  if (isLoading) {
    return <></>;
  }

  if (!user) {
    return <NotFoundPage text='Ups! I cannot found the users' />;
  }

  return isVisible ? (
    <div className="p-5 font-nunito">
      <div className='rounded-lg overlay-shadow leading-10 bg-secondary text-white w-full h-fit px-10 pb-10 py-3 flex flex-col gap-2'>
        <div className="flex justify-between items-center">
          <div className="shadow-xl">
            <h2 className='text-xl'>{currentDonation.from} has donated to you</h2>
            <div className="text-[2.4em] font-bold flex items-center gap-4">
              <h1>{currentDonation.amount} ICP</h1>
              <div className="relative">
                <Lottie className='absolute top-[-2px] left-[15px] translate-x-[-50%] translate-y-[-50%] size-24' animationData={coinAnimation} />
              </div>
            </div>
          </div>
          <div className=""></div>
          <div className="">
            <Icon />
          </div>
        </div>
        <h1 className='text-2xl text-center font-bold text-[2em] mt-5'>{currentDonation.message}</h1>
      </div>
    </div>
  ) : <></>;
}

