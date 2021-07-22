import { ReactNode } from 'react'
import s from './Container.module.scss'

type ContainerProps = {
  children: ReactNode
  height: string
}

export default function Container({ children, height = 'auto' }: ContainerProps): JSX.Element {
  return (
    <div className={s.root} style={height ? { '--height': height } : null}>
      {children}
    </div>
  )
}
