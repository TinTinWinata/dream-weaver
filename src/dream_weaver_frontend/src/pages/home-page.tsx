import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import gamingVrAnimation from '../animations/gaming-vr.json';
import Button from "../components/button";
import Paper from "../components/paper";

export default function HomePage() {
  return (
    <div className="">
      <Paper className="px-12 py-20 mt-5">
        <div className="flex ">
          <div className="w-full pl-20">
            <h1 className="text-4xl uppercase font-black">Dream Weaver</h1>
            <p>Make's your dream come true</p>
            <Link to='/login'>
              <Button className="mt-5 px-16 py-3">take me to the space</Button>
            </Link>
          </div>
          <div className="relative  w-full h-full ">
            <Lottie className="absolute left-0 translate-y-[-40%]" animationData={gamingVrAnimation}/>
          </div>
        </div>
      </Paper>
    </div>
  )
}
