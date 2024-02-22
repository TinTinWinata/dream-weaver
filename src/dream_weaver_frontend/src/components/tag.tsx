
import React from 'react';

type TTagProps = {
  name: string;
  image: string;
  alt?: string;
}

export default function Tag({name, image, alt = 'Tag Image'} : TTagProps) {
  return (
    <div className='rounded-md bg-primary w-fit center gap-3 px-6 py-2'>
      <div className="">{name}</div>
      <img className="w-8" src={image} alt={alt} />
    </div>
  )
}
