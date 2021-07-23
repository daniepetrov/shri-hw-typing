import ErrorDummy from '@/shared/components/composite/ErrorDummy'
import { Container } from '@/shared/components/ui'

const NotFound = (): JSX.Element => (
  <Container>
    <ErrorDummy error={{ text: '404 - Not Found', buttonText: 'To Homepage' }} />
  </Container>
)

export default NotFound
