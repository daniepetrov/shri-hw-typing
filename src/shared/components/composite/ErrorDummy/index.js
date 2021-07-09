import { Button } from '@/shared/components/ui'
import s from './ErrorDummy.module.scss'

export default function ErrorDummy({ error }) {
  return (
    <div className={s.root}>
      <p className={s.title}>{error.text}</p>
      <div className={s.buttonWrapper}>
        <Button as='a' href='/' >{error.buttonText}</Button>
      </div>
    </div>
  )
}
