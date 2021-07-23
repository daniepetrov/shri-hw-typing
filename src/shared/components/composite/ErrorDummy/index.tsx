import { Button } from '@/shared/components/ui'
import s from './ErrorDummy.module.scss'

interface ErrorDummyProps {
  error: {
    text: string
    buttonText: string
  }
}

export default function ErrorDummy({ error }: ErrorDummyProps): JSX.Element {
  return (
    <div className={s.root}>
      <p className={s.title}>{error.text}</p>
      <div className={s.buttonWrapper}>
        <Button as="a" href="/">
          {error.buttonText}
        </Button>
      </div>
    </div>
  )
}
