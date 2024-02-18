
type TCheckboxProps  = { 
  description: string;
}

export default function Checkbox({description} : TCheckboxProps) {
  return (
    <div className="flex gap-2 ">
      <input type="checkbox" className="h-fit mt-[0.35em]" />
      <div>{description}</div>
    </div>
  )
}
