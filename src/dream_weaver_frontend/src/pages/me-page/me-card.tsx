import Lottie from 'lottie-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '../../components/paper';

export type TMeCardProps =  { 
  title: string;
  description: string;
  animationData: any;
  link?: string;
}

export default function MeCard({title, description, animationData, link}: TMeCardProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if(link) navigate(link)
  }
  return (
    <Paper hoverable={true} props={{onClick: handleClick}}  className={`${link && 'cursor-pointer'}  h-52 relative px-8 py-8 overflow-hidden`}>
      <div className="">
        <h1 className='font-black text-4xl'>{title}</h1>
        <p>{description}</p>
      </div>
      <Lottie className="h-36 absolute right-5 bottom-[-30px]" animationData={animationData}/>
    </Paper>
  )
}
