import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Login from "./features/user/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <header className="App-header">
            xd
            </header>
          </div>
        </Route>
        <Route path="/login">
        <Login />
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user:email`}
          >
            Uth
          </a>
        </Route>
        <Route path="/oauth/github">
          <p>test</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
