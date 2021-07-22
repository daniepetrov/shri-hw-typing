import { createElement, ReactNode } from 'react'
import sx from 'clsx'
import s from './Button.module.scss'

type ButtonProps = {
  as: string
  variant: 'primary' | 'secondary' | 'clear'
  children: ReactNode
  disabled: boolean
  fullWidth: boolean
}

export default function Button({
  as = 'button',
  variant = 'primary',
  children,
  disabled,
  fullWidth,
  ...props
}: ButtonProps): ReactNode {
  const classes = sx(s.root, {
    [s.fullwidth]: fullWidth,
    [s.primary]: variant === 'primary',
    [s.secondary]: variant === 'secondary',
    [s.clear]: variant === 'clear',
    [s.disabled]: disabled,
  })

  return createElement(as, { className: classes, ...props }, children)
}
