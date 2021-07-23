import { Button } from '@/shared/components/ui'
import { Link } from 'react-router-dom'
import s from './SettingsDummy.module.scss'
import image from './image.svg'

export default function SettingsDummy(): JSX.Element {
  return (
    <div className={s.root}>
      <img className={s.image} width={124} height={124} src={image} alt="" />
      <p className={s.title}>
        Configure repository connection <br /> and synchronization settings
      </p>
      <div className={s.buttonWrapper}>
        <Link to="/settings">
          <Button>Open Settings</Button>
        </Link>
      </div>
    </div>
  )
}
