import { IApiConfGetData } from "@/types/api"

export const vars = (obj: Record<string, string>): Record<string, string> => {
  return Object.keys(obj).reduce(
    (acc, item) => (obj[item] ? { ...acc, [`--${item}`]: obj[item] } : acc),
    {},
  )
}

export const px = (val: string | number): string => (typeof val === 'number' ? val + 'px' : val)


type ArbitatyStringObject = {
  [key: string]: string
}

export const isEmpty = (obj: ArbitatyStringObject | IApiConfGetData): boolean => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false
  }
  return true
}
