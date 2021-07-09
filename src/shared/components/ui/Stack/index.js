import { vars, px } from '@/shared/utils/common'
import sx from 'clsx'
import s from './Stack.module.scss'

export default function Stack({
  children,
  direction = 'horizontal',
  spacing,
  alignItems,
  justifyContent,
  inline,
}) {
  const classes = sx(s.root, {
    [s.horizontal]: direction === 'horizontal',
    [s.vertical]: direction === 'vertical',
  })

  const style = vars({
    spacing: px(spacing),
    alignItems,
    justifyContent,
    inline: inline && 'start',
  })

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

export function VStack(props) {
  return <Stack direction="vertical" {...props} />
}

export function HStack(props) {
  return <Stack direction="horizontal" {...props} />
}
