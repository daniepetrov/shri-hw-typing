import { ReactNode } from 'react'
import s from './BuildLog.module.scss'

interface BuildLogProps {
  children: ReactNode
}

const BuildLog = ({ children }: BuildLogProps): JSX.Element => (
  <div className={s.root} data-testid='build-log'>
    <div className={s.inner}>
      <div className={s.scroller}>{children}</div>
    </div>
  </div>
)

export default BuildLog
