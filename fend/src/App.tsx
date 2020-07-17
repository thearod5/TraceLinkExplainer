import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import ArtifactSelector from "./components/artifacts/ArtifactsSelector";
import DatasetSummary from "./components/datasets/DatasetSummary";
import Home from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import {
  DATASET_ROUTE,
  SELECT_ARTIFACTS_ROUTE,
  TRACE_VIEW_ROUTE,
} from "./components/nav/routes";
import TraceLinkView from "./components/trace/TraceLinkView";
import { history } from "./redux/store";

function App() {
  return (
    <div>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path={TRACE_VIEW_ROUTE}>
            <TraceLinkView />
          </Route>
          <Route path={SELECT_ARTIFACTS_ROUTE}>
            <ArtifactSelector />
          </Route>
          <Route path={DATASET_ROUTE}>
            <DatasetSummary />
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
