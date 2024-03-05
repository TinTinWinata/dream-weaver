import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import Overlay from '../components/overlay'
import useUser from '../hooks/use-user'
import { TDonation } from '../types/donation-type'
import NotFoundPage from './not-found-page'

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
    <Overlay currentDonation={currentDonation}/>
  ) : <></>;
}

