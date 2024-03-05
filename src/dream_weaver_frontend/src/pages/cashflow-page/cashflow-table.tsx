import React from 'react'

const statuses = { In: 'text-green-400 bg-green-400/10', Out: 'text-rose-400 bg-rose-400/10' }

const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    type: 'main',
    status: 'In',
    duration: '25s',
    date: '22-06-2003',
    amount: 300
  },
  {
    user: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    type: 'main',
    status: 'Out',
    duration: '1m 32s',
    date: '22-06-2003',
    amount: 200
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CashflowTable() {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold leading-7 text-white sm:px-6 lg:px-8">Donation List</h2>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              User
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
              Type
            </th>
      
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
              Point
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {activityItems.map((item) => (
            <tr key={item.date}>
              <td className="w-[50%] py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <img src={item.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                  <div className="truncate text-sm font-medium leading-6 text-white">{item.user.name}</div>
                </div>
              </td>
              <td className="w-[25%] hidden py-4 pl-0 pr-8 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-gray-400">{item.date}</div>
                  <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                    {item.type}
                  </div>
                </div>
              </td>
              <td className="w-[25%] py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="text-white">{item.amount}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
