import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface GetWeekDaysProps {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysProps = {}) {
  const formatter = Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase()
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}

export function convertTimeStringToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number)

  return hours * 60 + minutes
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
