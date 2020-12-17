import { MuiThemeProvider } from '@material-ui/core'
import React, { useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import DatasetViewer from './components/dataset/DatasetView'
import NavBar from './components/meta/NavBar'
import Home from './components/Home'
import TraceWizard from './components/tracewizard/TraceWizard'
import { DatasetCallback, DATASET_ROUTE, OptionalStringCallback, SELECT_SOURCES_ROUTE, SELECT_TARGETS_ROUTE, VIEW_TRACE_ROUTE } from './constants'
import { Dataset } from './operations/types/Dataset'
import { initializeEmptyDataset } from './redux/initializers'
import { appHistory } from './redux/store'
import './styles/App.scss'
import theme from './styles/theme'

interface IAppContext {
  error : string | undefined
  setError: OptionalStringCallback
  dataset: Dataset,
  setDataset: DatasetCallback
}

export const AppContext = React.createContext<IAppContext>({
  error: undefined,
  setError: (e: string | undefined) => console.error('not implemented'),
  dataset: initializeEmptyDataset(),
  setDataset: (dataset: Dataset) => console.error('not implemented')
})

function App () {
  const [error, setError] = useState<string | undefined>(undefined)
  const [dataset, setDataset] = useState<Dataset>(initializeEmptyDataset())

  return (
    <div
      id="app"
      className="flexColumn sizeFull"
      style={{ position: 'absolute' }}
    >
      <AppContext.Provider value={{ error, setError, dataset, setDataset }}>
        <Router history={appHistory}>
          <MuiThemeProvider theme={theme}>
            <header style={{ height: '10%' }}>
              <NavBar />
            </header>
            <main className="flexColumn widthFull" style={{ height: '90%' }}>
              <Switch>
                <Route path={[SELECT_SOURCES_ROUTE, SELECT_TARGETS_ROUTE, VIEW_TRACE_ROUTE]}>
                  <TraceWizard />
                </Route>
                <Route path={DATASET_ROUTE}>
                  <DatasetViewer />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
          </MuiThemeProvider>
        </Router>
      </AppContext.Provider>
    </div>
  )
}

export default App
