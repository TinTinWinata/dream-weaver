import React from 'react';
import Paper from '../../components/paper';

export type THomeCardProps = {
  title: string;
  description: string;
  number: number;
}

export default function HomeCard({title, description, number}: THomeCardProps) {
  return (
    <div className={`w-full flex ${number % 2 === 0 && 'flex-row-reverse'} gap-3`}>
      <Paper className="p-12 flex flex-col gap-1">
        <div className="font-bold text-3xl">{title}</div>
        <div className="font-semibold text-xl opacity-70 text-secondary-text">{description}</div>
      </Paper>
      <Paper className="w-[200px] min-w-[200px] center text-7xl">{number.toString().padStart(2, '0')}</Paper>
    </div>
  )
}
