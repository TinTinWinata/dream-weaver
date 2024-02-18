import Lottie from "lottie-react";
import animation from '../animations/hero.json';
import Button from "../components/button";
import Paper from "../components/paper";

export default function CashflowPage() {
  return (
    <div>
      <Paper>
        <div className="flex  px-5">
          <div className="w-full py-12 pl-8 flex justify-center flex-col gap-3">
            <div className="flex flex-col">
              <h2>Total Token</h2>
              <h1 className="font-black text-4xl">5 ICP</h1>
            </div>
            <div>You can withdraw the token to your bank account</div>
            <Button>Withdraw</Button>
          </div>
          <div className="relative w-full">
            <Lottie className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] w-66" animationData={animation}/>
          </div>
        </div>
      </Paper>
    </div>
  )
}
