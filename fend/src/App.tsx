import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import PageTitle from "./components/nav/PageTitle";
import {
  SOURCE_ARTIFACT_ROUTE,
  TARGET_ARTIFACT_ROUTE,
  TRACE_VIEW_ROUTE,
} from "./components/nav/routes";
import SourceArtifactSearch from "./components/source/SourceArtifactSearch";
import TargetArtifactSearch from "./components/target/TargetArtifactSearch";
import TraceLinkView from "./components/trace/TraceLinkView";

function App() {
  return (
    <div>
      <Router>
        <PageTitle />
        <Switch>
          <Route path={SOURCE_ARTIFACT_ROUTE}>
            <SourceArtifactSearch />
          </Route>
          <Route path={TARGET_ARTIFACT_ROUTE}>
            <TargetArtifactSearch />
          </Route>
          <Route path={TRACE_VIEW_ROUTE}>
            <TraceLinkView />
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
