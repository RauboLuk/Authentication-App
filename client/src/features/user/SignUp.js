import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";

import logo from "../../assets/images/devchallenges.svg";
import githubLogo from "../../assets/images/Gihub.svg";
import OauthButton from "./OauthButton";
import AuthenticationForm from "./AuthenticationForm";

import Snackbar from "@material-ui/core/Snackbar";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const SignUp = () => {
  let history = useHistory();
  const [error, setError] = useState(null);
  if (error) {
    setTimeout(() => setError(null), 3000);
  }

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .matches(
        new RegExp("^[a-zA-Z0-9]{5,30}$"),
        "allowed length 5-30, allowed chars a-z A-Z 0-9"
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
    try {
      const newUser = await axios.post(
        "http://localhost:3000/api/auth/signup",
        data
      );
      console.log("returned user", newUser.data);
      // TODO user after signingup isn't in store
      history.push("/loggedIn");
    } catch (err) {
      if (err.response.data) {
        setError(err.response.data.errors);
      } else console.log(err);
    }
  };

  return (
    <section className="signUp">
      <Snackbar open={!!error} message={`${error?.email || error?.password}`} />
      <div className="signUp__box">
        <img src={logo} className="signUp__appLogo" alt="logo" />
        <h1 className="signUp__title">
          Join thousands of learners from around the world
        </h1>
        <p className="signUp__description">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>
        <AuthenticationForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
        <p className="signUp__text">or continue with these social profile</p>
        <section className="signUp__oauth">
          <OauthButton
            url={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user:email`}
          >
            <img src={githubLogo} alt="github" />
          </OauthButton>
        </section>
        <p className="signUp__text signUp__text--mt26">
          Adready a member?{" "}
          <Link to="/signIn" className="signUp__link">
            Login
          </Link>
        </p>
      </div>
      <div className="signUp__footer">
        <p>& Raubo</p>
        <p>devchallenges.io</p>
      </div>
    </section>
  );
};

export default SignUp;
