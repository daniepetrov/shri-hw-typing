// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

global.renderWithRouter = (
  component,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const Wrapper = ({ children }) => (
    <Router history={history}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Router>
  )
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  }
}
