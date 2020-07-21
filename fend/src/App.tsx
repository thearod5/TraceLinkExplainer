import Box from "@material-ui/core/Box";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";
import ArtifactSelector from "./components/artifacts/ArtifactsSelector";
import DatasetSummary from "./components/datasets/Viewer";
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
    <AppContainer id="app">
      <Router history={history}>
        <AppHeader>
          <NavBar />
        </AppHeader>

        <AppContent>
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
        </AppContent>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.div``;

const AppHeader = styled.header``;

export default App;
