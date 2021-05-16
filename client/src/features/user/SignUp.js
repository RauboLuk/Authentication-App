import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import "./SignUp.css";

import logo from "../../assets/images/devchallenges.svg";
import githubLogo from "../../assets/images/Gihub.svg";
import OauthButton from "./OauthButton";
import AuthenticationForm from "./AuthenticationForm";
import { selectUserStatus, signupUser } from "./userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required.")
      .email("Please enter a valid email address."),
    password: yup
      .string()
      .required("Password is required.")
      .matches(
        new RegExp("^[a-zA-Z0-9]{5,}$"),
        "Minimum password length: 5, allowed chars a-z A-Z 0-9"
      ),
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
    dispatch(signupUser(data));
  };

  return (
    <section className="signUp">
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
          isButtondisabled={status === "loading"}
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
          <Link to="/signin" className="signUp__link">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
