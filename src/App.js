import * as React from "react";
import Dashboard from "./components/Dashboard";

import { BrowserRouter,  Route, Switch } from "react-router-dom";

function App() {
  return (
    <>

    <BrowserRouter forceRefresh={true}>
    <div>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/login">Login</a>
      </li>
    </div>
      <Switch>
        <Route exact path ="/">
          <Dashboard />
        </Route>

        <Route path ="/Login">
          <p>Login page</p>
        </Route>
      </Switch>
    </BrowserRouter>
    
      
    </>
  )
}

export default App;
