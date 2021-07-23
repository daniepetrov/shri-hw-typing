import BuildList from '@/pages/Home/BuildList'
import CreateBuild from '@/pages/Home/CreateBuild'
import SettingsDummy from '@/pages/Home/SettingsDummy'
import ErrorDummy from '@/shared/components/composite/ErrorDummy'
import { Container, Spinner } from '@/shared/components/ui'
import Modal from '@/shared/components/ui/Modal'
import { useGetSettings } from '@/shared/services/hooks'
import { modalAtom } from '@/shared/store'
import { isEmpty } from '@/shared/utils/common'
import { useAtom } from 'jotai'

export default function Home(): JSX.Element {
  const [isModalOpened] = useAtom(modalAtom)
  const { data, error, isLoading, isError } = useGetSettings()

  if (isLoading) {
    return (
      <Container height="100%">
        <Spinner />
      </Container>
    )
  }

  if (isError) {
    return (
      <Container height="100%">
        <ErrorDummy error={{ text: error?.message, buttonText: 'Try again' }} />
      </Container>
    )
  }

  return (
    <>
      <Container height="100%">{isEmpty(data) ? <SettingsDummy /> : <BuildList />}</Container>
      <Modal data-testid="modal" isOpen={isModalOpened}>
        <CreateBuild />
      </Modal>
    </>
  )
}
