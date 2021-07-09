export const vars = (obj) => {
  return Object.keys(obj).reduce(
    (acc, item) => (obj[item] ? { ...acc, [`--${item}`]: obj[item] } : acc),
    {},
  )
}

export const px = (val) => (typeof val === 'number' ? val + 'px' : val)

/* eslint-disable */
export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}
