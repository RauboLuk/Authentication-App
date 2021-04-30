import "./Welcome.css";

const Home = () => {
  return (
    <div className="profile">
      <header className="profile__header">
        <h1 className="profile__headerTitle">Personal info</h1>
        <p className="profile__headerSubtitle">
          Basic info, like your name and photo
        </p>
      </header>
      <section>
        <section className="profile__info">
          <div className="profile__infoBox">
            <h1 className="profile__infoTitle">Profile</h1>
            <p className="profile__infoSubtitle">
              Some info may be visible to other people
            </p>
          </div>
          <button className="profile__infoButton">Edit</button>
        </section>
        <section>
          <p>photo</p>
          <img src="https://via.placeholder.com/150" alt="avatar" />
        </section>
        <section>
          <p>name</p>
          <p>user name</p>
        </section>
        <section>
          <p>bio</p>
          <p>user bio</p>
        </section>
        <section>
          <p>email</p>
          <p>user bio</p>
        </section>
        <section>
          <p>password</p>
          <p>************</p>
        </section>
      </section>
      <div>na tej stronie można poczuć się jak w domu</div>
    </div>
  );
};

export default Home;
