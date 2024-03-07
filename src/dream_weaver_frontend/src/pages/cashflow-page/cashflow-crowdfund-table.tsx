import React from "react";
import { TCashflow } from "../../types/cashflow-type";

const activityItems = [
  {
    from: "mbe",
    amount: 20,
    message: "halo",
    donationType: "Crowdfund",
    done: false,
    createdAt: Date.now() / 1000,
  },
  {
    from: "mbe",
    amount: 20,
    message: "halo",
    donationType: "Crowdfund",
    done: true,
    createdAt: Date.now() / 1000,
  },
  {
    from: "mbe",
    amount: 20,
    message: "halo",
    donationType: "Crowdfund",
    done: true,
    createdAt: Date.now() / 1000,
  },
];

function toDate(dateUnix: number) {
  var date = new Date(dateUnix * 1000);
  return date.toDateString() + " " + date.toTimeString().substring(0, 8);
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CashflowCrowdfundTable({
  donations,
}: {
  donations: TCashflow[];
}) {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold leading-7 text-white sm:px-6 lg:px-8">
        Crowdfund List
      </h2>
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
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Amount
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {donations.map((item) => (
            <tr key={item.id}>
              <td className="w-[50%] py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <div
                    className={classNames(
                      item.done == true
                        ? "text-green-400 bg-green-400/10"
                        : "text-rose-400 bg-rose-400/10",
                      "flex-none rounded-full p-1"
                    )}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="text-white">{item.amount} ICP</div>
                </div>
              </td>

              <td className="w-[50%] py-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm font-medium leading-6 text-white">
                    {toDate(item.createdAt)}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
