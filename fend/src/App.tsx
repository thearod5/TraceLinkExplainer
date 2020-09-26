import { MuiThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { DATASET_ROUTE, HOME_ROUTE, SELECT_DATASET_STEP, SELECT_SOURCE_ARTIFACTS, SELECT_SOURCE_STEP, SELECT_TARGET_ARTIFACTS, SELECT_TARGET_STEP, TRACE_VIEW_ROUTE, VIEW_TRACE_STEP } from "./components/constants";
import DatasetViewer from "./components/datasets/DatasetView";
import AppSnackBar from "./components/footer/AppSnackBar";
import Home from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import ViewerController from "./components/viewer/controller/ViewerController";
import { changeStep } from "./redux/actions";
import { appHistory, persistor, store } from "./redux/store";
import "./styles/App.scss";
import theme from "./styles/theme";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    appHistory.listen((location: any) => {
      switch (location.pathname) {
        case HOME_ROUTE:
          dispatch(changeStep(SELECT_DATASET_STEP))
          break;
        case SELECT_SOURCE_ARTIFACTS:
          dispatch(changeStep(SELECT_SOURCE_STEP))
          break;
        case SELECT_TARGET_ARTIFACTS:
          dispatch(changeStep(SELECT_TARGET_STEP))
          break;
        case TRACE_VIEW_ROUTE:
          dispatch(changeStep(VIEW_TRACE_STEP))
          break;
        default:
          return;
      }
    });
    // eslint-disable-next-line
  }, [])

  return (
    <div
      id="app"
      className="flexColumn sizeFull"
      style={{ position: "absolute" }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={appHistory}>
            <MuiThemeProvider theme={theme}>
              <header style={{ height: "10%" }}>
                <NavBar />
              </header>

              <main className="flexColumn widthFull" style={{ height: "90%" }}>
                <Switch>
                  <Route path={[SELECT_SOURCE_ARTIFACTS, SELECT_TARGET_ARTIFACTS, TRACE_VIEW_ROUTE]}>
                    <ViewerController />
                  </Route>
                  <Route path={DATASET_ROUTE}>
                    <DatasetViewer />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
                <AppSnackBar />
              </main>
            </MuiThemeProvider>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
