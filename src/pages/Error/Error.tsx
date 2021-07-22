import ErrorDummy from '@/shared/components/composite/ErrorDummy'
import { Container } from '@/shared/components/ui'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <Container>
    <ErrorDummy error={{ text: '404 - Not Found', buttonText: 'To Homepage' }} />
  </Container>
)

export default NotFound
