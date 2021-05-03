import "./Header.css";
import logo from "../../assets/images/devchallenges.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
        <p>{name}</p>
        {/* <section> */}
          <nav className="header__dropdown">
            <a className="header__link header__link--active" href="/welcome">
              <AccountCircleIcon />
              My Profile
            </a>
            <a href="/chat">
              <PeopleAltIcon />
              Group Chat
            </a>
            <hr />
            <a href="/signout">
              <ExitToAppIcon />
            Logout</a>
          </nav>
        {/* </section> */}
      </section>
    </header>
  );
};

export default Header;
