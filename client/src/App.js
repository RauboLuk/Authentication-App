import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./features/user/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "./features/user/userSlice";
import SignUp from "./features/user/SignUp";
import Header from "./features/user/Header";
import Welcome from "./features/user/Welcome";
import EditUser from "./features/user/EditUser";
import Signout from "./features/user/Signout";
import userService from "./services/userService";
axios.defaults.withCredentials = true;

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log(!user);

  const clearCookies = async () => {
    try {
      const p = await userService.signout();
      console.log(p);
      window.location.replace(p.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const readcookies = async () => {
    try {
      const p = await axios.get("http://localhost:3000/read-cookies");
      console.log(p, "ol");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user) {
    return (
      <Router>
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
        <Route path="/">
          <Redirect to="/signup" />
        </Route>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/loggedIn">
          <div className="temp" onClick={clearCookies}>
            clearCookies
          </div>
          <div className="temp" onClick={readcookies}>
            readcookies
          </div>
        </Route>
        <Route path="/oauth/github">
          <Backdrop open={true} style={{ zIndex: 1 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Route>
        <Route path="/welcome">
          <Header name={user.name || user.email.split("@")[0] || "undefined"} />
          <Link to="/loggedIn">super hidden functionalities</Link> <br />
          <Link to="/x">super hidden x</Link>
          <Welcome user={user} />
        </Route>
        <Route path="/user/edit">
          <Header name={user.name || user.email.split("@")[0] || "undefined"} />
          <EditUser user={user} />
        </Route>
        <Route path="/signout">
          <Header name="" />
          <Signout />
        </Route>
        <Route path="/">
          <Redirect to="/welcome" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
