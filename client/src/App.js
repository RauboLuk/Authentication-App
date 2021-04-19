import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./features/user/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <header className="App-header">xd</header>
          </div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Login />
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user:email`}
          >
            signup
          </a>
        </Route>
        <Route path="/oauth/github">
          <Login />
          <Backdrop
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
