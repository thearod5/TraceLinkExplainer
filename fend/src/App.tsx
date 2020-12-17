import { MuiThemeProvider } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import NavBar from './components/meta/NavBar'
import TraceWizard from './components/tracewizard/TraceWizard'
import { appHistory, DatasetCallback, OptionalStringCallback } from './constants'
import { initializeEmptyDataset } from './operations/initializers'
import { Project } from './operations/types/Project'
import './styles/App.scss'
import theme from './styles/theme'
interface IAppContext {
  error : string | undefined
  setError: OptionalStringCallback
  dataset: Project,
  setDataset: DatasetCallback
}
const WELCOME_MESSAGE = 'TraceViewer'

export const AppContext = React.createContext<IAppContext>({
  error: undefined,
  setError: (e: string | undefined) => console.error('not implemented'),
  dataset: initializeEmptyDataset(),
  setDataset: (dataset: Project) => console.error('not implemented')
})

export default function App () {
  const [error, setError] = useState<string | undefined>(undefined)
  const [dataset, setDataset] = useState<Project>(initializeEmptyDataset())

  const onSelectDataset = useCallback(setDataset, [])
  const onSetError = useCallback(setError, [])

  return (
    <div
      id="app"
      className="flexColumn sizeFull"
      style={{ position: 'absolute' }}
    >
      <Router history={appHistory}>
        <MuiThemeProvider theme={theme}>
          <AppContext.Provider value={{ error, setError: onSetError, dataset, setDataset: onSelectDataset }}>
            <header style={{ height: '10%' }}>
              <NavBar title={dataset.name === '' ? WELCOME_MESSAGE : dataset.name} />
            </header>
            <main className="flexColumn widthFull" style={{ height: '90%' }}>
              <Switch>
                <Route path="/">
                  <TraceWizard />
                </Route>
              </Switch>
            </main>
          </AppContext.Provider>
        </MuiThemeProvider>
      </Router>
    </div>
  )
}
