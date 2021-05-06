import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./EditUser.css";
import { editUser } from "./userSlice";

const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png']

const schema = yup.object().shape({
  avatar: yup
    .mixed()
    .notRequired()
    .test("fileSize", "The file is too large", (value) => {
      if (!value.length) return true
      return value && value[0].size <= 2000000;
    })
    .test("type", "Supported file types: jpg png", (value) => {
      if (!value.length) return true
      console.log(value[0].type);
      return value && allowedFileTypes.includes(value[0].type);
    }),
  email: yup.string().required().email(),
});

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    const entries = Object.entries(data).filter(
      (entry) => entry[0] !== "avatar"
    );
    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });
    dispatch(editUser(formData));
    history.push("/welcome");
  };

  if (errors) console.log(errors);

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
          <label htmlFor="button">
            <section className="edit__avatarSection">
              <img
                className="edit__avatar"
                src="https://via.placeholder.com/150"
                alt="avatar"
              />
              <p className="edit__fieldDesc">CHANGE PHOTO</p>
            </section>
          </label>
          <input
            id="button"
            type="file"
            accept="image/*"
            {...register("avatar")}
          />
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
