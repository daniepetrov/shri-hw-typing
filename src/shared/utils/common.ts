export const vars = (obj: Record<string, string>): Record<string, string> => {
  return Object.keys(obj).reduce(
    (acc, item) => (obj[item] ? { ...acc, [`--${item}`]: obj[item] } : acc),
    {},
  )
}

export const px = (val: string | number): string => (typeof val === 'number' ? val + 'px' : val)

export const isEmpty = (obj: Record<string, string>): boolean => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false
  }
  return true
}
