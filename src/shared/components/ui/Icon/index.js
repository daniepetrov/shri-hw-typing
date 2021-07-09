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

const iconsMap = {
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

const sizesMap = {
  xs: 12,
  sm: 16,
  md: 24,
}

export default function Icon({ name, size = 'sm', className, color = 'currentColor', ...props }) {
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
