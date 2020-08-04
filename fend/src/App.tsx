import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import styled from "styled-components";
import ArtifactSelector from "./components/artifacts/ArtifactsSelector";
import DatasetSummary from "./components/datasets/Viewer";
import Home from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import { DATASET_ROUTE, SELECT_ARTIFACTS_ROUTE } from "./components/nav/routes";
import WorkflowStepper from "./components/nav/WorkflowStepper";
import { getCurrentStep } from "./redux/selectors";
import { history, persistor, store } from "./redux/store";
import theme from "./styles/theme";

function App() {
  const activeStep = useSelector(getCurrentStep) - 1; //recreated index at 0, but remove select dataset move

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <AppContainer id="app">
              <AppHeader>
                <NavBar />
              </AppHeader>

              <AppContent>
                <Switch>
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

              <AppFooter>
                {activeStep >= 0 ? <WorkflowStepper /> : null}
              </AppFooter>
            </AppContainer>
          </Router>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const AppContainer = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 100%;
  weight: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AppContent = styled.main`
  height: 80%;
  width: 100%;
  overflow-y: hidden;
`;

const AppHeader = styled.header`
  height: 10%;
`;

const AppFooter = styled.footer`
  height: 10%;
  width: 100%;
  z-index: 5;
  box-shadow: 5px 10px;
`;

export default App;
