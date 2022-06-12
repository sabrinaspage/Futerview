import * as React from "react";
import Login from "./pages/login";
import Results from "./pages/results";
import QNA from "./pages/qna";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registration from "./pages/registration";

function App() {
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route exact path="/qna">
            <QNA />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
