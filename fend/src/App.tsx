import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ArtifactSelector from "./components/artifacts/PanelController";
import DatasetViewer from "./components/datasets/DatasetView";
import Home from "./components/home/Home";
import NavBar from "./components/nav/NavBar";
import { DATASET_ROUTE, SELECT_ARTIFACTS_ROUTE } from "./components/nav/routes";
import AppSnackBar from "./components/snack/AppSnackBar";
import { appHistory, persistor, store } from "./redux/store";
import "./styles/App.scss";
import theme from "./styles/theme";


function App() {
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
