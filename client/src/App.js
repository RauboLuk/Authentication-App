import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./features/user/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/user/userSlice";
import SignUp from "./features/user/SignUp";
import Header from "./features/user/Header";

const Welcome = () => {
  let accessToken = new URLSearchParams(useLocation().search).get(
    "access_token"
  );
  console.log(accessToken);
  const dispatch = useDispatch();
  if (accessToken) dispatch(login({ token: accessToken, status: "succeeded" }));
  const x = async () => {
    const y = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    console.log(y);
  };
  x();
  return (
    <div
      onClick={() => axios.post("http://localhost:3000/api/auth/logout", {})}
    >
      Welcome {accessToken}
    </div>
  );
};

function App() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <Router>
      <Switch>
        <Route path="/loggedIn">
          <div className="temp">loggedIn</div>
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
          <Welcome />
        </Route>
        <Route path="/">
          <Redirect to="/signup" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
