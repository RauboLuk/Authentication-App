import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./App.css";

import {
  fetchUser,
  selectUser,
  selectUserStatus,
} from "./features/user/userSlice";
import ErrorSnackbar from "./features/user/ErrorSnackbar";
import AuthContainer from "./features/user/AuthContainer";
import Login from "./features/user/Login";
import SignUp from "./features/user/SignUp";
import Header from "./features/user/Header";
import PersonalInfo from "./features/user/PersonalInfo";
import EditUser from "./features/user/EditUser";
import Footer from "./app/Footer";

function App() {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoggedIn && !user && (status === "loading" || status === "idle"))
    return <LinearProgress />;

  if (!user) {
    return (
      <Router>
        <ErrorSnackbar />
        <AuthContainer>
          <Switch>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Redirect to="/signup" />
            </Route>
          </Switch>
        </AuthContainer>
        <Footer auth />
      </Router>
    );
  }

  return (
    <Router>
      <ErrorSnackbar />
      <Header
        name={user.name || user.email?.split("@")[0] || "undefined"}
        avatarUrl={user.img}
      />
      <Switch>
        <Route path="/me">
          <PersonalInfo user={user} />
        </Route>
        <Route path="/user/edit">
          <EditUser user={user} />
        </Route>
        <Route path="/">
          <Redirect to="/me" />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
