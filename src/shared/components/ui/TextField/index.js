import s from './TextField.module.scss'
import Input from '../Input'
import IconButton from '../IconButton'
import { useEffect, useState } from 'react'

export default function TextField({ value, onChange, error, onReset, ...props }) {
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
      {props.label && (
        <div className={s.label}>
          {props.label}
          {props.required && <span className={s.required}> *</span>}
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
