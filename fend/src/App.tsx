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

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
  )
}

export default App
