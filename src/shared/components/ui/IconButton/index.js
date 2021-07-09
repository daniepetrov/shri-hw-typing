import React from 'react'
import Icon from '@/shared/components/ui/Icon'
import s from './IconButton.module.scss'
import sx from 'clsx'

export default function IconButton({
  as = 'button',
  className,
  name,
  size = 'sm',
  children,
  ...props
}) {
  const classes = sx(s.root, className)
  return React.createElement(
    as,
    { className: classes, ...props },
    React.createElement(Icon, { name, size }),
    children && React.createElement('span', { className: s.text }, children),
  )
}
