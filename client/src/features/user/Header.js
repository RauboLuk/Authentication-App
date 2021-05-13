import { useState } from "react";
import "./Header.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import logo from "../../assets/images/devchallenges.svg";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


import { useDispatch } from "react-redux";
import { logoutUser } from "./userSlice";
import { Link } from "react-router-dom";


const Header = ({ name, avatarUrl }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <header className="header" onClick={handleClick}>
      <img src={logo} className="header__appLogo" alt="logo" />
      <ClickAwayListener onClickAway={handleClickAway}>
        <section className="header__user">
            <img
              src={avatarUrl || "https://via.placeholder.com/150"}
              alt="user avatar"
              className="header__avatar"
            />
          <p className="header__username">{name}</p>
          {showDropdown ? (
            <ArrowDropUpIcon className="header__icon" />
          ) : (
            <ArrowDropDownIcon className="header__icon" />
          )}
          {showDropdown && (
            <nav className="header__dropdown" onBlur={handleClick}>
              <Link className="header__link header__link--active" to="/welcome">
                <AccountCircleIcon className="header__icon" />
                My Profile
              </Link>
              <Link className="header__link" to="/chat">
                <PeopleAltIcon className="header__icon" />
                Group Chat
              </Link>
              <hr className="header__line" />
              <Link className="header__link header__link--red" to="/signout" onClick={handleLogout}>
                <ExitToAppIcon className="header__icon" />
                Logout
              </Link>
            </nav>
          )}
        </section>
      </ClickAwayListener>
    </header>
  );
};

export default Header;
