import s from './Container.module.scss'

export default function Container({ children, height = 'auto' }) {
  return (
    <div className={s.root} style={height && { '--height': height }}>
      {children}
    </div>
  )
}
