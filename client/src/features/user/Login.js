import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "./Login.css";

import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import logo from "../../assets/images/devchallenges-light.svg";
import githubLogo from '../../assets/images/Gihub.svg'
import LoginButton from "./LoginButton";

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().matches(new RegExp("^[a-zA-Z0-9]{3,30}$"), "Allowed length 3-30. Allowed chars a-z A-Z 0-9"),
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
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Join thousands of learners from around the world </h1>
      <p>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <MailIcon />
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <LockIcon />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <p>{errors.password?.message}</p>
        </div>
        <input type="submit" />
      </form>
      <p>or continue with these social profile</p>
      <LoginButton url={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user:email`}><img src={githubLogo} alt="github" /></LoginButton>
      <p>Adready a member? Login</p> <Link>ds</Link>

    </section>
  );
};

export default Login;
