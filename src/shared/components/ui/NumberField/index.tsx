import s from './NumberField.module.scss'
import Input from '../Input'
import { InputHTMLAttributes } from 'react'

export default function NumberField(props: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <div className={s.root}>
      <Input {...props} />
    </div>
  )
}
