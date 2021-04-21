import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./features/user/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/user/userSlice";
import SignUp from "./features/user/SignUp";

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
  return <div>Welcome {accessToken}</div>;
};

function App() {
  const user = useSelector(selectUser);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Link to="/login">xd</Link>
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/oauth/github">
            <Login />
            <Backdrop open={true} style={{ zIndex: 1 }}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
