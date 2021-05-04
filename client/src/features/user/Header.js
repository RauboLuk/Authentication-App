import { useState } from "react";
import "./Header.css";
import logo from "../../assets/images/devchallenges.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Header = ({ name }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <header className="header" onClick={handleClick}>
      <img src={logo} className="header__appLogo" alt="logo" />
      <section className="header__user">
        <div className="header__imgBox">
          <img
            src="https://via.placeholder.com/150"
            alt="user avatar"
            className="header__avatar"
          />
        </div>
        <p>{name}</p>
        {showDropdown && (
          <nav className="header__dropdown">
            <a className="header__link header__link--active" href="/welcome">
              <AccountCircleIcon className="header__icon" />
              My Profile
            </a>
            <a className="header__link" href="/chat">
              <PeopleAltIcon className="header__icon" />
              Group Chat
            </a>
            <hr className="header__line" />
            <a className="header__link header__link--red" href="/signout">
              <ExitToAppIcon className="header__icon" />
              Logout
            </a>
          </nav>
        )}
      </section>
    </header>
  );
};

export default Header;
