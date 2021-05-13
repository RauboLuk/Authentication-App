import "./AuthContainer.css";

const AuthContainer = ({ children, ...props }) => {
  return (
    <div {...props} className="authContainer">
      {children}
    </div>
  );
};

export default AuthContainer;
