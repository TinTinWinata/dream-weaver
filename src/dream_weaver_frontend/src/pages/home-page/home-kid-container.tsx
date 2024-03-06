import Lottie from 'lottie-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import boyAnimation from '../../animations/boy.json';
import girlAnimation from '../../animations/girl.json';
import Button from '../../components/button';
import Input from '../../components/input';
import Paper from '../../components/paper';
import { TChildrenProps } from '../../types/children-type';

type THomeKidCardProps = {
  title: string;
  description: string;
  animationData: any;
  animationWidth?: string;
  animationTop?: string;
} & TChildrenProps;

function HomeKidCard({animationTop= '-120px', animationWidth = '180px', title, children, description, animationData}: THomeKidCardProps){
  return (
      <div className="relative w-full">
        <Lottie 
        style={{width: animationWidth, top: animationTop}}
        className="absolute z-10 left-[50%] translate-x-[-50%]" animationData={animationData}></Lottie>
        <Paper className="w-full h-[360px] relative z-20 flex flex-col p-10">
          <div className="w-full h-full">
            <div className="text-2xl font-black">{title}</div>
            <div className="text-secondary-text text-lg">{description}</div>
          </div>
          {children}
      </Paper>
    </div>
    )
}

export default function HomeKidContainer() {
  const { handleSubmit, register } = useForm<{title: string}>();
  const navigate = useNavigate();
  const onSubmit = ({title} : {title: string}) => {
    navigate('/donate/' + title)
  }

  return (
    <div className='flex w-full gap-12'>
      <HomeKidCard title='Person'  description='Your generous donation will directly impact the life of People you loved.' animationData={girlAnimation} animationTop='-190px' animationWidth='300px'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input  props={{...register('title')}} title="" ></Input>
          <Button >Search Name</Button>
        </form>
      </HomeKidCard>
      <HomeKidCard title='Crowdfund' description='Every contribution you make doesnt just change someone life, but also transforms the world into a better place.' animationData={boyAnimation}>
        <Link className='w-full' to='/crowdfund'>
          <Button className='w-full'>Donate Now</Button>
        </Link>
      </HomeKidCard>
    </div>
  )
}
