import { forwardRef } from 'react'
import s from './Input.module.scss'

const Input = forwardRef((props, ref) => {
  return <input className={s.root} ref={ref} {...props} />
})

Input.displayName = 'Input'

export default Input
