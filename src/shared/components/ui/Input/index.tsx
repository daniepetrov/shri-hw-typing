import { forwardRef } from 'react'
import s from './Input.module.scss'

type Ref = HTMLInputElement
type Props = {
  onChange: React.FormEventHandler<HTMLInputElement>,
  value: string
}

const Input = forwardRef<Ref, Props>(({ onChange, value, ...props }, ref) => {
  return <input className={s.root} ref={ref} value={value} onChange={onChange} {...props} />
})

Input.displayName = 'Input'

export default Input
