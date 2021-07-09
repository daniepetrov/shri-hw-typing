import React from 'react'
import sx from 'clsx'
import s from './Button.module.scss'

export default function Button({ as = 'button', variant = 'primary', children, ...props }) {
  const classes = sx(s.root, {
    [s.fullwidth]: props.fullWidth,
    [s.primary]: variant === 'primary',
    [s.secondary]: variant === 'secondary',
    [s.clear]: variant === 'clear',
    [s.disabled]: props.disabled,
  })

  return React.createElement(as, { className: classes, ...props }, children)
}
