import { Link } from "react-router-dom";
import "./Welcome.css";

const Home = ({ user }) => {
  return (
    <div className="profile">
      <header className="profile__header">
        <h1 className="profile__headerTitle">Personal info</h1>
        <p className="profile__headerSubtitle">
          Basic info, like your name and photo
        </p>
      </header>
      <section className="profile__data">
        <section className="profile__info">
          <div className="profile__infoBox">
            <h1 className="profile__infoTitle">Profile</h1>
            <p className="profile__infoSubtitle">
              Some info may be visible to other people
            </p>
          </div>
          <Link className="profile__infoButton" to="/user/edit">Edit</Link>
        </section>
        <section className="profile__section">
          <p className="profile__fieldDesc">photo</p>
          <img
            className="profile__avatar"
            src="https://via.placeholder.com/150"
            alt="avatar"
          />
        </section>
        <hr className="profile__line" />
        <section className="profile__section">
          <p className="profile__fieldDesc">name</p>
          <p className="profile__text">{user.name || 'undefined'}</p>
        </section>
        <hr className="profile__line" />
        <section className="profile__section">
          <p className="profile__fieldDesc">bio</p>
          <p className="profile__text">{user.bio || 'undefined'}</p>
        </section>
        <hr className="profile__line" />
        <section className="profile__section">
          <p className="profile__fieldDesc">phone</p>
          <p className="profile__text">{user.phone || 'undefined'}</p>
        </section>
        <hr className="profile__line" />
        <section className="profile__section">
          <p className="profile__fieldDesc">email</p>
          <p className="profile__text">{user.email || 'undefined'}</p>
        </section>
        <hr className="profile__line" />
        <section className="profile__section">
          <p className="profile__fieldDesc">password</p>
          <p className="profile__text">************</p>
        </section>
      </section>
      {/* TODO extract footer */}
      <div className="login__footer">
        <p>& Raubo</p>
        <p>devchallenges.io</p>
      </div>
      <div>na tej stronie można poczuć się jak w domu</div>
    </div>
  );
};

export default Home;
