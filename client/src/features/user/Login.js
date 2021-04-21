import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation } from "react-router-dom";
import "./Login.css";

import logo from "../../assets/images/devchallenges.svg";
import githubLogo from "../../assets/images/Gihub.svg";
import OauthButton from "./OauthButton";
import AuthenticationForm from "./AuthenticationForm";

import Snackbar from "@material-ui/core/Snackbar";
import { useState } from "react";

const Login = () => {
  const [loginError, setLoginError] = useState(
    new URLSearchParams(useLocation().search).get("error")
  );
  if (loginError) {
    setTimeout(() => setLoginError(null), 3000);
  }
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .matches(
        new RegExp("^[a-zA-Z0-9]{3,30}$"),
        "allowed length 3-30, allowed chars a-z A-Z 0-9"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="login">
      <Snackbar open={!!loginError} message="Login failed. Try again..." />
      <div className="login__box">
        <img src={logo} className="login__appLogo" alt="logo" />
        <h1 className="login__title">Login</h1>
        <AuthenticationForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
        <p className="login__text">or continue with these social profile</p>
        <section className="login__oauth">
          <OauthButton
            url={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user:email`}
          >
            <img src={githubLogo} alt="github" />
          </OauthButton>
        </section>
        <p className="login__text login__text--mt26">
          Don’t have an account yet?{" "}
          <Link to="/signup" className="login__link">
            Register
          </Link>
        </p>
      </div>
      <div className="login__footer">
        <p>& Raubo</p>
        <p>devchallenges.io</p>
      </div>
    </section>
  );
};

export default Login;
