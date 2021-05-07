import "./Footer.css";

const Footer = ({ auth }) => {
  return (
    <div className={`footer ${auth ? "footer--auth" : ""}`}>
      <p>& Raubo</p>
      <p>devchallenges.io</p>
    </div>
  );
};

export default Footer;
