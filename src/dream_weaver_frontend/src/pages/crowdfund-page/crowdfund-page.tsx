import Button from "../../components/button";
import ProxyLink from "../../components/proxy-link";
import CrowdfundCard from "./crowdfund-card";

export default function CrowdfundPage() {
  return (
    <div className="flex flex-col w-full gap-3">
      <ProxyLink to='/create-crowdfund'>
        <Button className="w-full">Create Crowdfund</Button>
      </ProxyLink>
      <div className="flex flex-col gap-8">
        <CrowdfundCard/>
        <CrowdfundCard/>
      </div>
    </div>
  )
}
