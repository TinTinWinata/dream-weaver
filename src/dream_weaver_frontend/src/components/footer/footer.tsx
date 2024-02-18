import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Icon from "../icon";
import FooterIcon from "./footer-icon";


export default function Footer() {
  return (
    <div className='pb-10 w-full mt-12 border-t border-gray-500 border-opacity-50 justify-center items-center flex flex-col '>
      <Icon/>
      <div className="flex gap-3">
        <FooterIcon link='https://instagram.com' icon={<FaInstagram className="w-5 h-5 center text-primary"/>}/>
        <FooterIcon link='https://discord.com' icon={<FaDiscord className="w-5 h-5 center text-primary"/>}/>
        <FooterIcon link='https://tiktok.com' icon={<FaTiktok className="w-5 h-5 center text-primary"/>}/>
        <FooterIcon link='https://youtube.com' icon={<FaYoutube className="w-5 h-5 center text-primary"/>}/>
      </div>
      <div className="mt-5">©️Copyright Dream Weaver Cooperation 2024</div>
    </div>
  )
}
