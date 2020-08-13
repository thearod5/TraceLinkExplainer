import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import styled from "styled-components";
import ArtifactSelector from "./components/artifacts/Artifacts";
import DatasetViewer from "./components/datasets/DatasetView";
import Home from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import { DATASET_ROUTE, SELECT_ARTIFACTS_ROUTE } from "./components/nav/routes";
import WorkflowStepper from "./components/nav/WorkflowStepper";
import AppSnackBar from "./components/snack/AppSnackBar";
import { setError } from "./redux/actions";
import { getCurrentStep, getError } from "./redux/selectors";
import { history, persistor, store } from "./redux/store";
import "./styles/App.scss";
import theme from "./styles/theme";

function App() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const activeStep = useSelector(getCurrentStep) - 1; //recreated index at 0, but remove select dataset move

  const handleClose = () => dispatch(setError(undefined));
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <AppContainer id="app">
              <AppHeader>
                <NavBar />
              </AppHeader>

              <AppContent className="flexColumn">
                <Switch>
                  <Route path={SELECT_ARTIFACTS_ROUTE}>
                    <ArtifactSelector />
                  </Route>
                  <Route path={DATASET_ROUTE}>
                    <DatasetViewer />
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
            <AppSnackBar error={error} handleClose={handleClose} />
          </MuiThemeProvider>
        </Router>
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

const AppHeader = styled.header`
  display: flex;
  height: 10%;
`;

const AppContent = styled.main`
  min-height: 80%;
  max-height: 80%;
  width: 100%;
`;

const AppFooter = styled.footer`
  display: flex;
  position: absolute:
  bottom: 0px;
  height: 10%;
  width: 100%;
  z-index: 5;
  box-shadow: 5px 10px;
`;

export default App;
