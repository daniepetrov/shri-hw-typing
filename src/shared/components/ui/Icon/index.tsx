import React from 'react'
import PropTypes from 'prop-types'
import Calendar from './icons/Calendar'
import Pending from './icons/Pending'
import Close from './icons/Close'
import Commit from './icons/Commit'
import Done from './icons/Done'
import Fail from './icons/Fail'
import Gear from './icons/Gear'
import Play from './icons/Play'
import Rebuild from './icons/Rebuild'
import Stopwatch from './icons/Stopwatch'
import User from './icons/User'

export const iconsMap = {
  fail: Fail,
  done: Done,
  gear: Gear,
  pending: Pending,
  calendar: Calendar,
  close: Close,
  commit: Commit,
  play: Play,
  rebuild: Rebuild,
  stopwatch: Stopwatch,
  user: User,
}

export const sizesMap = {
  xs: 12,
  sm: 16,
  md: 24,
}

type IconProps = {
  name: keyof typeof iconsMap
  size: keyof typeof sizesMap
  className?: string
  color?: string
}

export default function Icon({ name, size = 'sm', className, color = 'currentColor', ...props }: IconProps): JSX.Element {
  if (!name) {
    throw new Error('name property is now specified')
  }
  return React.createElement(iconsMap[name], {
    fill: color,
    width: sizesMap[size],
    height: sizesMap[size],
    className,
    ...props
  })
}

Icon.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizesMap)),
}
