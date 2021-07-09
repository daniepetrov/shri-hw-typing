import React, { useState } from 'react';
import s from './Input.module.scss'

const Input = ({ id = '', label = '', type = 'text' }) => {
  const [value, handleChange] = useState('');
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input className={s.root} type={type} id={id}
        data-testid={id}
        label={label}
        onChange={({ target }) => {
          handleChange(target.value)
        }}
        value={value}
      />
    </div>
  )
}

export default Input;