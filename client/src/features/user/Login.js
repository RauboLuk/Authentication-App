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

import { loginUser, selectUserStatus } from "./userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required.")
      .email("Please enter a valid email address."),
    password: yup.string().required("Password is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
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
          isButtondisabled={status === "loading"}
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
          <Link to="/signup" className="login__link" data-cy="login__link">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
