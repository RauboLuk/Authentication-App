import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./EditUser.css";
import { editUser } from "./userSlice";

const Input = ({
  label,
  placeholder,
  defaultValue,
  register,
  required,
  area,
}) => (
  <section>
    <label className="form__label">{label}</label>
    {area ? (
      <textarea
        className="form__textarea"
        rows="3"
        {...register(label, { required })}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></textarea>
    ) : (
      <input
        className="form__input"
        {...register(label, { required })}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    )}
  </section>
);

const EditUser = ({ user }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = (data) => {
    dispatch(editUser(data));
    history.push("/welcome");
  };

  return (
    <div className="edit">
      <Link className="edit__back" to="/welcome">
        <ArrowBackIosIcon className="edit__icon" />
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
        <form className="edit__form" onSubmit={handleSubmit(onSubmit)}>
          <section className="edit__avatarSection">
            <img
              className="edit__avatar"
              src="https://via.placeholder.com/150"
              alt="avatar"
            />
            <p className="edit__fieldDesc">CHANGE PHOTO</p>
          </section>
          <Input
            label="name"
            register={register}
            placeholder="Enter your name..."
            defaultValue={user.name}
          />
          <Input
            label="bio"
            register={register}
            placeholder="Enter your bio..."
            defaultValue={user.bio}
            area
          />
          <Input
            label="phone"
            register={register}
            placeholder="Enter your phone..."
            defaultValue={user.phone}
          />
          <Input
            label="email"
            register={register}
            placeholder="Enter your email..."
            defaultValue={user.email}
          />
          <Input
            label="password"
            register={register}
            placeholder="Enter your new password..."
          />
          <input className="form__submit" type="submit" value="Save" />
        </form>
      </section>
    </div>
  );
};

export default EditUser;
