import { Container, HStack, IconButton } from '@/shared/components/ui'
import { createBuild } from '@/shared/services/api'
import { useGetSettings } from '@/shared/services/hooks'
import { hashAtom, modalAtom } from '@/shared/store'
import sx from 'clsx'
import { useAtom } from 'jotai'
import { Link, useHistory, useLocation } from 'react-router-dom'
import s from './Header.module.scss'

export default function Header() {
  const { pathname } = useLocation()
  const history = useHistory()
  const { data: settings } = useGetSettings()
  const [, setIsModalOpened] = useAtom(modalAtom)
  const [currentHash] = useAtom(hashAtom)
  const isIndexPage = pathname === '/'
  const isSettingsPage = pathname.includes('/settings')
  const isBuildPage = pathname.includes('/build/')

  const logo = (settings: { data: { repoName: any } }) => {
    if ((settings?.data && isIndexPage) || isBuildPage) {
      return settings?.data?.repoName
    } else {
      return 'School CI Server'
    }
  }

  const logoClasses = sx(s.logo, {
    [s.saturated]: (settings?.data && isIndexPage) || isBuildPage,
  })

  const openModal = () => {
    setIsModalOpened(true)
  }

  const rebuild = async (hash) => {
    const { data } = await createBuild(hash)
    history.push(`/build/${data.id}`)
  }

  return (
    <header className={s.root} data-testid="header">
      <Container height="100%">
        <div className={s.row}>
          <div className={logoClasses}>
            {isIndexPage ? (
              <span>{logo(settings)}</span>
            ) : (
              <Link data-testid="home-link" to="/">
                {logo(settings)}
              </Link>
            )}
          </div>
          <HStack spacing={8}>
            {isBuildPage && (
              <IconButton
                data-testid="rebuild-button"
                onClick={() => rebuild(currentHash)}
                size="xs"
                name="rebuild"
              >
                Rebuild
              </IconButton>
            )}
            {isIndexPage && settings?.data && (
              <IconButton data-testid="run-button" onClick={openModal} size="xs" name="play">
                Run build
              </IconButton>
            )}
            {!isSettingsPage && (
              <Link to="/settings" data-testid="settings-link">
                <IconButton size="xs" name="gear">
                  {isIndexPage && !settings?.data && 'Settings'}
                </IconButton>
              </Link>
            )}
          </HStack>
        </div>
      </Container>
    </header>
  )
}
