import * as React from "react";
import Dashboard from "./components/Dashboard";
import Login from "./pages/login";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registration from "./pages/registration";

function App() {
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/results">
            <Registration />
          </Route>
          <Route path="/qna">
            <Registration />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
