import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Datasets from "./datasets/Datasets";
import Home from "./home/Home";
import PageTitle from "./nav/PageTitle";
import { DATASETS_ROUTE, EXPLORE_ROUTE } from "./nav/routes";
import TargetArtifactSearch from "./search/target/TargetArtifactSearch";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Router>
        <PageTitle />
        <Switch>
          <Route path={DATASETS_ROUTE}>
            <Datasets />
          </Route>
          <Route path={EXPLORE_ROUTE}>
            <TargetArtifactSearch />
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
