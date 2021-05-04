import { useState } from "react";
import "./Header.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import logo from "../../assets/images/devchallenges.svg";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Header = ({ name }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };

  return (
    <header className="header" onClick={handleClick}>
      <img src={logo} className="header__appLogo" alt="logo" />
      <ClickAwayListener onClickAway={handleClickAway}>
        <section className="header__user">
          <div className="header__imgBox">
            <img
              src="https://via.placeholder.com/150"
              alt="user avatar"
              className="header__avatar"
            />
          </div>
          <p>{name}</p>
          {showDropdown ? (
            <ArrowDropUpIcon className="header__icon" />
          ) : (
            <ArrowDropDownIcon className="header__icon" />
          )}
          {showDropdown && (
            <nav className="header__dropdown" onBlur={handleClick}>
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
      </ClickAwayListener>
    </header>
  );
};

export default Header;
