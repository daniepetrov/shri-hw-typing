import { useState } from 'react'
import s from './Input.module.scss'

type InputProps = {
  id: string
  label: string
  type: string
}

const Input = ({ id = '', label = '', type = 'text' }: InputProps): JSX.Element => {
  const [value, handleChange] = useState('')
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className={s.root}
        type={type}
        id={id}
        data-testid={id}
        onChange={({ target }) => {
          handleChange(target.value)
        }}
        value={value}
      />
    </div>
  )
}

export default Input
