import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Datasets from "./datasets/Datasets";
import Explore from "./explore/Explore";
import Home from "./home/Home";
import PageTitle from "./nav/PageTitle";
import "./styles/App.css";

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
  );
}

export default App;
