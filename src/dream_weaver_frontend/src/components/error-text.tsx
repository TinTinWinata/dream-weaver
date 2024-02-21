import { TChildrenProps } from "../types/children-type";

export type TErrorText = TChildrenProps & {
  className?: string;
}

export default function ErrorText({className, children}: TErrorText) {
  return (
    <div className={`${className} text-red-400 text-sm`}>{children}</div>
  )
}
