import "./EditInput.css";

const EditInput = ({
  label,
  register,
  area,
  error,
  ...props
}) => {
  return (
    <section>
      <label className="input__label">{label}</label>
      {area ? (
        <textarea
          className="input__textarea"
          rows="3"
          {...register(label)}
        ></textarea>
      ) : (
        <input
          className="input__input"
          {...register(label)}
          {...props}
        />
      )}
      <p className="input__error">{error}</p>
    </section>
  );
};

export default EditInput;
