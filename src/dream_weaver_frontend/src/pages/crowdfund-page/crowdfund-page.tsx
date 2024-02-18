import CrowdfundCard from "./crowdfund-card";

export default function CrowdfundPage() {
  return (
    <div className="flex flex-col gap-8">
      <CrowdfundCard/>
      <CrowdfundCard/>
    </div>
  )
}
