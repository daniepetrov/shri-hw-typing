import s from './NumberField.module.scss'
import Input from '../Input'

export default function NumberField(props) {
  return (
    <div className={s.root}>
      <Input {...props} />
    </div>
  )
}
