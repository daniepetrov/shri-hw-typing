import s from './NumberField.module.scss'
import Input from '../Input'

export default function NumberField(props: HTMLInputElement): JSX.Element {
  return (
    <div className={s.root}>
      <Input {...props} />
    </div>
  )
}
