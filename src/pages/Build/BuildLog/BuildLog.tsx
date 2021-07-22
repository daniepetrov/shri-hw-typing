import s from './BuildLog.module.scss'

const BuildLog = ({ children }) => (
  <div className={s.root} data-testid='build-log'>
    <div className={s.inner}>
      <div className={s.scroller}>{children}</div>
    </div>
  </div>
)

export default BuildLog
