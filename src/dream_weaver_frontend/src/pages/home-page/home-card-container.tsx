import Lottie from 'lottie-react'
import React, { useEffect, useRef, useState } from 'react'
import dogAnimation from '../../animations/dog.json'
import HomeCard, { THomeCardProps } from './home-card'

const DATAS: THomeCardProps[] = [
  {
    number: 1,
    description: 'Blockchain\'s transparent and immutable nature can provide a high level of transparency to donors, ensuring that their contributions are used as intended and providing accountability to the project creators.',
    title: 'Transparency'
  },
  {
    number: 2,
    description: 'Blockchain\'s decentralized and cryptographic features can enhance the security of crowdfunding transactions, reducing the risk of fraud and manipulation.',
    title: 'Security'
  },
  {
    number: 3,
    description: 'Blockchain technology can potentially make crowdfunding more accessible to individuals worldwide, including those who may not have access to traditional banking systems.',
    title: 'Accessbility'
  }
]

export default function HomeCardContainer() {
  const [current, setCurrent] = useState<number>(0);
  const refDiv = useRef<SVGSVGElement>(null);

  // Function to set the target value based on mouse scroll position relative to a reference div
  function setTargetValue(event: Event) {
      if (refDiv.current) {
          const divPosition = refDiv.current.getBoundingClientRect().top * -1 + 300;
          if (divPosition < 0) {
              setCurrent(0);
              return;
          }
          const height = refDiv.current.getBoundingClientRect().height;
          const target = (divPosition / height) * 1.4;
          setCurrent(target);
      }
  }

  useEffect(() => {
      window.addEventListener("scroll", setTargetValue);
      return () => {
          window.removeEventListener("scroll", setTargetValue);
      };
  }, []);

  return (
    <div className="flex gap-2 h-full">
      <div className="relative h-full w-[175px]">
        <svg ref={refDiv} className='absolute top-24 left-8' width="4" height="700" viewBox="0 0 4 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 0L1.99996 700" strokeLinecap='round' stroke="#3B7EFF" strokeOpacity="0.2" strokeWidth="3"/>
          <path d="M2 0L1.99996 700" pathLength='1' strokeLinecap='round'  strokeDasharray={`${current}px 1px`} stroke="#3B7EFF" strokeOpacity="0.77" strokeWidth="3"/>
        </svg>
      </div>
      <div className='flex flex-col gap-6'>
        <div className="text-5xl font-black text-center">Our Features</div>
        <div className="flex flex-col gap-8 relative">
          <Lottie animationData={dogAnimation} className="absolute w-[150px] left-20 top-0 translate-y-[-60%]">
          </Lottie>
          {DATAS.map((data) => <HomeCard {...data} key={data.title} />)}
        </div>
      </div>
    </div>
  )
}
