import { Link, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./EditUser.css";

const EditUser = () => {
  let history = useHistory();
  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="edit">
      <Link className="edit__back" onClick={goBack}><ArrowBackIosIcon className="edit__icon"/>
        Back
      </Link>
      <section className="edit__data">
        <section className="edit__info">
          <div className="edit__infoBox">
            <h1 className="edit__infoTitle">Change Info</h1>
            <p className="edit__infoSubtitle">
              Changes will be reflected to every services
            </p>
          </div>
        </section>
        <form className="edit__section">
          <img
            className="edit__avatar"
            src="https://via.placeholder.com/150"
            alt="avatar"
          />
          <p className="edit__fieldDesc">CHANGE PHOTO</p>
        </form>
        
      </section>
    </div>
  );
};

export default EditUser;
