import Lottie from 'lottie-react';
import { useParams } from 'react-router-dom';
import dogAnimation from '../animations/dog.json';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Input from '../components/input';
import Paper from '../components/paper';
import Tag from '../components/tag';

const defaultIcpButton = [1, 2, 3, 5, 10]

export default function DonatePage() {
  const { name }= useParams();
  return (
    <div>
      <h2 className='text-center text-2xl font-bold py-5 mt-2'>{name}</h2>
      <div className="center relative">
        <Lottie animationData={dogAnimation} className='z-1 absolute top-20 left-56 w-40 translate-y-[-100%]'/>
        <Paper className='max-w-[700px] mt-2 p-8'>
          <>
          <form className='relative z-10 flex flex-col gap-8'>
          <Input props={{type: 'number'}} placeholder='1 ICP' title='Amount'>
            <div className="mt-1 grid grid-cols-5 grid-rows-1 gap-5">
              {defaultIcpButton.map((val) => <Button className='py-1 px-4'>{`${val} ICP`}</Button>)}
            </div>
          </Input>
          <div className='flex flex-col gap-1'>
            <h1>From</h1>
            <Tag name={name!} image='/assets/profile.png'/>
          </div>
            <Input placeholder='So nice to meet you!' title='Message'/>
            <Checkbox description='I agree that this support is provided on a voluntary basis and not in return for commercial activities, in accordance with'/>
            <Button className='w-full'>Submit</Button>
          </form>
          </>
        </Paper>
        </div>
      </div>
  )
}
