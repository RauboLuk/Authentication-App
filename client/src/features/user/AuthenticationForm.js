import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";

const AuthenticationForm = ({handleSubmit, onSubmit, onError, register, errors}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="login__form">
      <div className="login__inputBox">
        <MailIcon className="md-dark" />
        <input
          className="login__input"
          {...register("email")}
          type="text"
          placeholder="Email"
        />
      </div>
      <p>{errors.email?.message}</p>
      <div className="login__inputBox">
        <LockIcon className="md-dark" />
        <input
          className="login__input"
          {...register("password")}
          type="password"
          placeholder="Password"
        />
      </div>
      <p>{errors.password?.message}</p>
      <input type="submit" className="login__submit" value="Start coding now" />
    </form>
  );
};

export default AuthenticationForm
