import { Link } from "react-router-dom";
import Button from "../../components/button";
import CrowdfundCard from "./crowdfund-card";

export default function CrowdfundPage() {
  return (
    <div className="flex flex-col w-full gap-3">
      <Link to='/create-crowdfund'>
        <Button className="w-full">Create Crowdfund</Button>
      </Link>
      <div className="flex flex-col gap-8">
        <CrowdfundCard/>
        <CrowdfundCard/>
      </div>
    </div>
  )
}
