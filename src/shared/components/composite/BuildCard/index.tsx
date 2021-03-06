import { HStack, Icon } from '@/shared/components/ui'
import s from './BuildCard.module.scss'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import duration from 'dayjs/plugin/duration'
import { BuildStatusType } from '@/types/api'
dayjs.locale('ru')
dayjs.extend(duration)

const statusMap = {
  InProgress: 'pending',
  Success: 'done',
  Waiting: 'pending',
  Fail: 'fail',
}

const toDur = (duration: number, type: string): string => {
  const typeMap = {
    H: 'ч',
    m: 'мин',
    s: 'сек',
  }
  const durMs = dayjs.duration((duration || 0) * 1000).format(type)
  return Number(durMs) ? `${durMs} ${typeMap[type]}` : ''
}

interface BuildCardProps {
  status: BuildStatusType
  buildNumber: number
  commitMessage: string
  commitHash: string
  branchName: string
  authorName: string
  start: Date
  duration: number
  variant?: 'normal' | 'wide'
}

export default function BuildCard({
  status,
  buildNumber,
  commitHash,
  commitMessage,
  branchName = 'master',
  authorName,
  start,
  duration,
  variant,
}: BuildCardProps): JSX.Element {
  const commitHashTail = commitHash?.slice(-7)
  const datejs = dayjs(start)
  const month = datejs.format('MMM').slice(0, 3)
  const date = datejs.format('D')
  const hours = datejs.format('H')
  const minutes = datejs.format('mm')

  return (
    <div className={s.root} data-testid="build-card">
      <div className={s.inner}>
        <div className={s.grid}>
          <div className={s.status} data-status={statusMap[status]}>
            <Icon name={statusMap[status] || 'pending'} size="md" data-testid="status-icon" />
          </div>
          <div className={s.gridInner} data-variant={variant}>
            <div className={s.info}>
              <div className={s.heading}>
                <span className={s.number} data-status={statusMap[status]}>
                  #{buildNumber}
                </span>
                <span className={s.commit}>{commitMessage}</span>
              </div>
              <div className={s.bottom}>
                <div className={s.bottomInner}>
                  <HStack spacing={4} inline alignItems="center">
                    <Icon name="commit" size="sm" className={s.branchIcon} />
                    <div className={s.branchName}>{branchName}</div>
                    <div className={s.commitHash}>{commitHashTail}</div>
                  </HStack>
                  <HStack spacing={4} inline alignItems="center">
                    <Icon name="user" size="sm" className={s.userIcon} />
                    <div className={s.userName}>{authorName}</div>
                  </HStack>
                </div>
              </div>
            </div>
            <div className={s.times} data-variant={variant}>
              <HStack spacing={4} inline>
                <Icon name="calendar" className={s.datetimeIcon} />
                <div className={s.datetime}>
                  {date} {month}, {hours}:{minutes}
                </div>
              </HStack>
              {status === 'Success' && (
                <HStack spacing={4} inline>
                  <Icon name="stopwatch" className={s.datetimeIcon} />
                  <div className={s.duration}>
                    {toDur(duration, 'H')} {toDur(duration, 'm')} {toDur(duration, 's')}
                  </div>
                </HStack>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
