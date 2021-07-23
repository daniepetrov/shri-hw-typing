import { CSSProperties, ReactNode } from 'react'
import s from './Container.module.scss'

type ContainerProps = {
  children: ReactNode
  height?: string
}

interface CssPropertiesVars extends CSSProperties {
  '--height': string
}

export default function Container({ children, height }: ContainerProps): JSX.Element {
  const containerStyle = height ? { '--height': height } : undefined

  return (
    <div className={s.root} style={containerStyle as CssPropertiesVars}>
      {children}
    </div>
  )
}
