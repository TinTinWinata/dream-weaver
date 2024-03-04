import React from 'react'

import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import notFound from '../animations/not-found-2.json'
import Button from '../components/button'

type TNotFoundProps = {
  text?: string;
  buttonText?: string;
  link?: string;
}

export default function NotFoundPage({text = 'Ups! It\'s looks you\'re missing!', buttonText= 'Take me to home page', link = '/'}: TNotFoundProps) {
  return (
    <div className='bg-secondary rounded-xl pt-8 pb-20 center flex-col  w-full h-full'>
      <Lottie className="size-[50%]" animationData={notFound}/>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className='text-[2.4em] text-center font-bold'>{text}</h1>
        <Link to={link}>
          <Button className='py-2 px-20'>{buttonText}</Button>
        </Link>
      </div>
    </div>
  )
}

