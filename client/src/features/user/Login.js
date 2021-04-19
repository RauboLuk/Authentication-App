import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "./Login.css";

import logo from "../../assets/images/devchallenges.svg";
import githubLogo from "../../assets/images/Gihub.svg";
import OauthButton from "./OauthButton";
import AuthenticationForm from "./AuthenticationForm";

const Login = () => {
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
  const onSubmit = (data) => console.log(data);

  return (
    <section className="login">
      <div className="login__box">
        <img src={logo} className="login__appLogo" alt="logo" />
        <h1 className="login__title">
          Join thousands of learners from around the world
        </h1>
        <p className="login__description">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>
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
          Adready a member?{" "}
          <Link to="/login" className="login__link">
            Login
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
