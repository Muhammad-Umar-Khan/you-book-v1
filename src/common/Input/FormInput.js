export const FormInput = ({ label, onChange, onBlur, value, name }) => {
  return (
    <label className="text-start my-1">
      {label}
      <input
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
};
