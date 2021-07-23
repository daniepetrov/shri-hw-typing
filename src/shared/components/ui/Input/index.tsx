import { forwardRef, InputHTMLAttributes } from 'react'
import s from './Input.module.scss'

type Ref = HTMLInputElement
const Input = forwardRef<Ref, InputHTMLAttributes<HTMLInputElement>>(({ onChange, value, ...props }, ref) => {
  return <input className={s.root} ref={ref} value={value} onChange={onChange} {...props} />
})

Input.displayName = 'Input'

export default Input
