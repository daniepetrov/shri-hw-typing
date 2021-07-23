import React from 'react'
import Icon, { iconsMap, sizesMap } from '@/shared/components/ui/Icon'
import s from './IconButton.module.scss'
import sx from 'clsx'
import { ReactNode } from 'react'

type IconButtonProps = {
  as?: string
  className?: string
  name: keyof typeof iconsMap
  size?: keyof typeof sizesMap
  children: ReactNode
  onClick?: () => void
  'data-testid'?: string
}

export default function IconButton({
  as = 'button',
  className,
  name,
  size = 'sm',
  children,
  ...props
}: IconButtonProps): JSX.Element {
  const classes = sx(s.root, className)

  return React.createElement(
    as,
    { className: classes, ...props },
    <Icon name={name} size={size} />,
    children && React.createElement('span', { className: s.text }, children),
  )
}
