import { Text } from '@ignite-ui-rcnald/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { getWeekDays } from '@/lib/utils'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <Text className="font-medium">
          Dezembro <span className="text-gray200">2022</span>
        </Text>
        <div className="flex gap-2 text-gray200">
          <button className="rounded-sm leading-[0] hover:text-gray100 focus:shadow [&_svg]:size-5">
            <ChevronLeft />
          </button>
          <button className="rounded-sm leading-[0] hover:text-gray100 focus:shadow [&_svg]:size-5">
            <ChevronRight />
          </button>
        </div>
      </div>

      <table className="w-full table-fixed border-spacing-1 font-default font-medium">
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th className="text-sm font-medium text-gray200" key={weekDay}>
                {weekDay}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:leading-[0.75rem] before:text-gray-800 before:content-['.']">
          <tr className="[&_td]:box-border">
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="aspect-square w-full cursor-pointer rounded-sm bg-gray600 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
                1
              </button>
            </td>
            <td>
              <button className="aspect-square w-full cursor-pointer rounded-sm bg-gray600 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
                3
              </button>
            </td>
            <td>
              <button className="aspect-square w-full cursor-pointer rounded-sm bg-gray600 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
                4
              </button>
            </td>
            <td>
              <button className="aspect-square w-full cursor-pointer rounded-sm bg-gray600 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
                5
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
