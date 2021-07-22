import { Switch, Route } from 'react-router-dom'
import Footer from '@/shared/components/composite/Footer'
import Header from '@/shared/components/composite/Header'

import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import Build from '@/pages/Build'
import Error from '@/pages/Error'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/build/:id">
            <Build />
          </Route>
          <Route component={Error} />
        </Switch>
      </main>
      <Footer />
    </>
  )
}

export default App
