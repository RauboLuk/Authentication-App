import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import "./Login.css";

import logo from "../../assets/images/devchallenges.svg";
import githubLogo from "../../assets/images/Gihub.svg";
import OauthButton from "./OauthButton";
import AuthenticationForm from "./AuthenticationForm";

import { loginUser, selectUserError } from "./userSlice";

const Login = () => {
  const dispatch = useDispatch();

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

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  return (
    <section className="login">
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
    </section>
  );
};

export default Login;
