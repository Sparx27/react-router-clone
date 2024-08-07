import { lazy, Suspense } from 'react'
import './App.css'
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/About'))
const Buscar = lazy(() => import('./pages/Buscar'))

import Router from './navigation/Router'
import Route from './navigation/Route'

const routes = [
  {
    path: '/buscar/:query',
    Component: ({ routeParams }) => <Buscar routeParams={routeParams} />
  }
]

function App() {

  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes}>
          <Route path={'/'} Component={HomePage} />
          <Route path={'/about'} Component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
