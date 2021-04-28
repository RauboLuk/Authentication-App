import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
axios.defaults.withCredentials = true;

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log(!user);

  const x = async () => {
    try {
      const p = await axios.get("http://localhost:3000/api/auth/logout");
      window.location.replace(p.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const y = async () => {
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
          <div className="temp" onClick={x}>
            loggedIn
          </div>
          <div className="temp" onClick={y}>
            readcookies
          </div>
        </Route>
        <Route path="/oauth/github">
          <Backdrop open={true} style={{ zIndex: 1 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Route>
        <Route path="/welcome">
          <Header name={user.name}/>
        </Route>
        <Route path="/">
          <Redirect to="/welcome" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
