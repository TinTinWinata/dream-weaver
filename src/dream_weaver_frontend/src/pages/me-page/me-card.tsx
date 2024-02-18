import Lottie from 'lottie-react';
import Paper from '../../components/paper';

export type TMeCardProps =  { 
  title: string;
  description: string;
  animationData: any;
}

export default function MeCard({title, description, animationData}: TMeCardProps) {
  return (
    <Paper className='h-52 relative px-8 py-8 overflow-hidden'>
      <div className="">
        <h1 className='font-black text-4xl'>{title}</h1>
        <p>{description}</p>
      </div>
      <Lottie className="h-36 absolute right-5 bottom-[-30px]" animationData={animationData}/>
    </Paper>
  )
}
