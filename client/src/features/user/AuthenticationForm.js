import "./AuthenticationForm.css";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";

const AuthenticationForm = ({
  handleSubmit,
  onSubmit,
  onError,
  register,
  errors,
  isButtondisabled,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="auth__form">
      <div className="auth__inputBox">
        <MailIcon className="md-dark" />
        <input
          className="auth__input"
          {...register("email")}
          type="text"
          placeholder="Email"
          data-cy="email"
        />
      </div>
      <p>{errors.email?.message}</p>
      <div className="auth__inputBox">
        <LockIcon className="md-dark" />
        <input
          className="auth__input"
          {...register("password")}
          type="password"
          placeholder="Password"
          data-cy="password"
        />
      </div>
      <p>{errors.password?.message}</p>
      <input
        type="submit"
        className="auth__submit"
        value="Start coding now"
        disabled={isButtondisabled}
        data-cy="submit"
      />
    </form>
  );
};

export default AuthenticationForm;
