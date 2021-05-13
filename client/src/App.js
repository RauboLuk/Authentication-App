import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "./features/user/userSlice";
import ErrorSnackbar from "./features/user/ErrorSnackbar";
import Login from "./features/user/Login";
import SignUp from "./features/user/SignUp";
import Header from "./features/user/Header";
import Welcome from "./features/user/Welcome";
import EditUser from "./features/user/EditUser";
import Footer from "./app/Footer";
axios.defaults.withCredentials = true;

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!user) {
    return (
      <Router>
        <ErrorSnackbar />
        <Switch>
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
        </Switch>
        <Footer auth />
      </Router>
    );
  }

  return (
    <Router>
      <Header
        name={user.name || user.email?.split("@")[0] || "undefined"}
        avatarUrl={user.img}
      />
      <Switch>
        <Route path="/welcome">
          <Welcome user={user} />
        </Route>
        <Route path="/user/edit">
          <EditUser user={user} />
        </Route>
        <Route path="/">
          <Redirect to="/welcome" />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
