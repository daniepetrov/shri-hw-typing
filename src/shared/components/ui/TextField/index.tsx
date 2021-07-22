import s from './TextField.module.scss'
import Input from '../Input'
import IconButton from '../IconButton'
import React, { useEffect, useState } from 'react'

type TextFieldProps = {
  value: string
  onChange: React.FormEventHandler<HTMLInputElement>
  error: string
  onReset: () => void
  label: string
  required: boolean
}

export default function TextField({
  value,
  onChange,
  error,
  onReset,
  label,
  required,
  ...props
}: TextFieldProps): JSX.Element {
  const [input, setInput] = useState('')

  const handleReset = () => {
    onReset()
    setInput('')
  }

  useEffect(() => {
    setInput(value)
  }, [value])

  return (
    <label className={s.root}>
      {label && (
        <div className={s.label}>
          {label}
          {required && <span className={s.required}> *</span>}
        </div>
      )}
      <div className={s.field}>
        <Input value={input} onChange={onChange} {...props} />
        {input && (
          <IconButton as="div" onClick={handleReset} name="close" size="sm" className={s.button} />
        )}
      </div>
      {error && <div className={s.error}>{error}</div>}
    </label>
  )
}
