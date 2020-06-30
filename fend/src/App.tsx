import React from 'react'
import './styles/App.css'
import Home from './home/Home'
import Datasets from './datasets/Datasets'
import Explore from './explore/Explore'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import PageTitle from './nav/PageTitle'

function App() {
  return (
    <div>
      <PageTitle />
      <Router>
        <Switch>
          <Route path="/datasets">
            <Datasets />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
