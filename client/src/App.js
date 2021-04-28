import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./features/user/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useSelector } from "react-redux";
import { login, selectUser } from "./features/user/userSlice";
import SignUp from "./features/user/SignUp";
import Header from "./features/user/Header";
axios.defaults.withCredentials = true;

function App() {
  const user = useSelector(selectUser);
  console.log(user);

  const x = async () => {
    try {
      const p = await axios.get("http://localhost:3000/api/auth/logout");
      window.location.replace(p.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/loggedIn">
          <div className="temp" onClick={x}>
            loggedIn
          </div>
        </Route>
        <Route path="/signin">
          <div className="temp">
            <Login />
          </div>
        </Route>
        <Route path="/signup">
          <div className="temp">
            <SignUp />
          </div>
        </Route>
        <Route path="/oauth/github">
          <Backdrop open={true} style={{ zIndex: 1 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Route>
        <Route path="/welcome">
          <Header />
        </Route>
        <Route path="/">
          <Redirect to="/signup" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
