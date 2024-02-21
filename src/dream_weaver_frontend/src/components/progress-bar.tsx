
type TProgressBar = {
  percentage: number;
  className?: string;
  props?:  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export default function ProgressBar({percentage, props, className} : TProgressBar) {
  return (
    <div className={`w-full h-3 rounded-full relative bg-gray-500 ${className}`} {...props}>
      <div className="absolute rounded-full h-full bg-gradient-to-b from-green-1 to-green-2 " style={{width: `${percentage}%`}}></div>
    </div>
  )
}
