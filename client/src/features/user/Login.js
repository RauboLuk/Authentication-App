import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import logo from "../../assets/images/devchallenges-light.svg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().matches(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return (
    <section>
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
            {...register("email", { required: true })}
            type="text"
            placeholder="Email"
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <LockIcon />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
        </div>
        <input type="submit" />
      </form>
    </section>
  );
};

export default Login;
