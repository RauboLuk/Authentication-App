import "./Header.css";
import logo from "../../assets/images/devchallenges.svg";

const Header = ({ name }) => {
  return (
    <header className="header">
      <img src={logo} className="header__appLogo" alt="logo" />
      <section className="header__user">
        <div className="header__imgBox">
          <img
            src="https://via.placeholder.com/150"
            alt="user avatar"
            className="header__avatar"
          />
        </div>
        <p>Name {name}</p>
        <p>dd</p>
      </section>
    </header>
  );
};

export default Header;
