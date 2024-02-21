import { ReactNode } from "react";

type TFooterIconProps = {
  icon: ReactNode
  link: string;
}

export default function FooterIcon({icon, link}: TFooterIconProps) {
  return (
      <a href={link} target="_blank">
        <div className="cursor-pointer rounded-full bg-white">
            <div className="p-1 center">{icon}</div>
        </div>
      </a>
  )
}
