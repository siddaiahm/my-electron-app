import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import NavBar from "../components/NavBar";
import Themes from "../components/Themes";

export default function App(props) {
  return (
    <Router>
      <div>
        <NavBar props={props} />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/theme2">
          <Themes name={2} />
          </Route>
          <Route path="/theme1">
          <Themes name={1} />
          </Route>
          <Route path="/">
            <Themes name={0} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
