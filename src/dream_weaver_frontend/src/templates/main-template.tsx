import Footer from "../components/footer/footer";
import Navigation from "../components/navigation";
import { TChildrenProps } from "../types/children-type";

export default function MainTemplate({children}: TChildrenProps) {
  return (
    <div className="transition-all bg-primary center w-full min-h-screen min-w-screen">
      <div className="text-white min-h-screen  font-nunito font-semibold max-w-screen-lg w-full">
        <Navigation/>
        <div className="min-h-screen">
          {children}
        </div>
        <Footer/>
      </div>
    </div>
  )
}
