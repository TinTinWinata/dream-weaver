import crowdfundAnimation from '../../animations/blockchain.json'
import overlayAnimation from '../../animations/gaming-3.json'
import cashflowAnimation from '../../animations/money.json'
import settingAnimation from '../../animations/setting.json'
import MeCard, { TMeCardProps } from "./me-card"

const meCards: TMeCardProps[] = [
  {
    animationData: overlayAnimation,
    title: 'Overlay',
    description: 'OBS overlay for streaming experience .' 
  },
  {
    animationData: cashflowAnimation,
    title: 'Cashflow',
    description: 'See your block chain coin transactions.' 
  },
  {
    animationData: settingAnimation,
    title: 'Profile',
    description: 'Setup your profile for better experience.' 
  },
  {
    animationData: crowdfundAnimation,
    title: 'Crowdfund',
    description: 'Gather a fund to help people get better.' 
  },
]


export default function MePage() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3">
      {meCards.map((card) => <MeCard {...card} key={card.title}/>)}
    </div>
  )
}

