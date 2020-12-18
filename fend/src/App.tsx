import { Box, MuiThemeProvider } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { Router } from 'react-router-dom'
import NavBar from './components/meta/NavBar'
import TraceWizard from './components/tracewizard/TraceWizard'
import { appHistory, DatasetCallback, OptionalStringCallback } from './constants'
import { initializeEmptyDataset } from './types/initializers'
import { Project } from './types/Project'
import './styles/App.scss'
import theme from './styles/theme'
interface IAppContext {
  error : string | undefined
  setError: OptionalStringCallback
  project: Project,
  setDataset: DatasetCallback
}
const WELCOME_MESSAGE = 'Trace Explainer'

export const AppContext = React.createContext<IAppContext>({
  error: undefined,
  setError: (e: string | undefined) => console.error('not implemented'),
  project: initializeEmptyDataset(),
  setDataset: (project: Project) => console.error('not implemented')
})

export default function App () {
  const [error, setError] = useState<string | undefined>(undefined)
  const [project, setDataset] = useState<Project>(initializeEmptyDataset())

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
          <AppContext.Provider value={{ error, setError: onSetError, project, setDataset: onSelectDataset }}>
            <Box style={{ height: '10%' }}>
              <NavBar title={project.name === '' ? WELCOME_MESSAGE : project.name} />
            </Box>
            <Box style={{ height: '90%' }}>
              <TraceWizard />
            </Box>
          </AppContext.Provider>
        </MuiThemeProvider>
      </Router>
    </div>
  )
}
