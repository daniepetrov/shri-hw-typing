import { vars, px } from '@/shared/utils/common'
import sx from 'clsx'
import { ReactNode } from 'react'
import s from './Stack.module.scss'

type StackProps = {
  children: ReactNode
  direction: 'horizontal' | 'vertical'
  spacing: number | string
  alignItems: string
  justifyContent: string
  inline: boolean
}

export default function Stack({
  children,
  direction = 'horizontal',
  spacing,
  alignItems,
  justifyContent,
  inline,
}: StackProps): JSX.Element {
  const classes = sx(s.root, {
    [s.horizontal]: direction === 'horizontal',
    [s.vertical]: direction === 'vertical',
  })

  const style = vars({
    spacing: px(spacing),
    alignItems,
    justifyContent,
    inline: inline ? 'start' : '',
  })

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

export function VStack(props): JSX.Element {
  return <Stack direction="vertical" {...props} />
}

export function HStack(props): JSX.Element {
  return <Stack direction="horizontal" {...props} />
}
