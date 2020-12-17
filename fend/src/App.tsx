import { MuiThemeProvider } from '@material-ui/core'
import React, { useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import DatasetViewer from './components/dataset/DatasetView'
import NavBar from './components/meta/NavBar'
import Finder from './components/tracewizard/finder/Finder'
import TraceWizard from './components/tracewizard/TraceWizard'
import { appHistory, DatasetCallback, DATASET_ROUTE, OptionalStringCallback } from './constants'
import { initializeEmptyDataset } from './operations/initializers'
import { Dataset } from './operations/types/Dataset'
import './styles/App.scss'
import theme from './styles/theme'

interface IAppContext {
  error : string | undefined
  setError: OptionalStringCallback
  dataset: Dataset,
  setDataset: DatasetCallback
}
const WELCOME_MESSAGE = 'TraceViewer'

export const AppContext = React.createContext<IAppContext>({
  error: undefined,
  setError: (e: string | undefined) => console.error('not implemented'),
  dataset: initializeEmptyDataset(),
  setDataset: (dataset: Dataset) => console.error('not implemented')
})

function App () {
  const [error, setError] = useState<string | undefined>(undefined)
  const [dataset, setDataset] = useState<Dataset>(initializeEmptyDataset())

  const onSelectDataset = (dataset: Dataset) => {
    setDataset(dataset)
  }

  return (
    <div
      id="app"
      className="flexColumn sizeFull"
      style={{ position: 'absolute' }}
    >
      <Router history={appHistory}>
        <Switch>
          <MuiThemeProvider theme={theme}>
            <AppContext.Provider value={{ error, setError, dataset, setDataset: onSelectDataset }}>
              <header style={{ height: '10%' }}>
                <NavBar title={dataset.name === '' ? WELCOME_MESSAGE : dataset.name} />
              </header>
              <div>
                <main className="flexColumn widthFull" style={{ height: '90%' }}>
                  <Route path="/finder">
                    <Finder />
                  </Route>
                  <Route path={DATASET_ROUTE}>
                    <DatasetViewer />
                  </Route>
                  <Route path="/">
                    <TraceWizard />
                  </Route>
                </main>

              </div>
            </AppContext.Provider>
          </MuiThemeProvider>
        </Switch>
      </Router>
    </div>
  )
}

export default App
