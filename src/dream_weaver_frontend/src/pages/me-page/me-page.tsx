import crowdfundAnimation from "../../animations/blockchain.json";
import overlayAnimation from "../../animations/gaming-3.json";
import cashflowAnimation from "../../animations/money.json";
import settingAnimation from "../../animations/setting.json";
import Button from "../../components/button";
import useUser from "../../contexts/user-context";
import MeCard, { TMeCardProps } from "./me-card";

const meCards: TMeCardProps[] = [
  {
    animationData: overlayAnimation,
    title: "Overlay",
    description: "OBS overlay for streaming experience .",
    link: "/overlay",
  },
  {
    animationData: cashflowAnimation,
    title: "Cashflow",
    description: "See your block chain coin transactions.",
    link: "/cashflow",
  },
  {
    animationData: settingAnimation,
    title: "Profile",
    description: "Setup your profile for better experience.",
    link: "/profile",
  },
  {
    animationData: crowdfundAnimation,
    title: "Crowdfund",
    description: "Gather a fund to help people get better.",
    link: "/crowdfund",
  },
];

export default function MePage() {
  const { logout } = useUser();

  const signout = () => {
    logout();
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3">
      {meCards.map((card) => (
        <MeCard {...card} key={card.title} />
      ))}
      <form onSubmit={signout}>
        <Button>Logout</Button>
      </form>
    </div>
  );
}
