import "./EditInput.css";

const EditInput = ({ label, register, area, error, ...props }) => {
  return (
    <section>
      <label className="input__label">{label}</label>
      {area ? (
        <textarea
          className={"input__textarea" + (error ? " input__input--br" : "")}
          rows="3"
          {...register(label)}
          {...props}
        ></textarea>
      ) : (
        <input
          className={"input__input" + (error ? " input__input--br" : "")}
          {...register(label)}
          {...props}
        />
      )}
      <p className="input__error">{error}</p>
    </section>
  );
};

export default EditInput;
