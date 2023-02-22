import { useState } from "react";

export const FormInput = ({
  user,
  setUser,
  value,
  label,
  name,
  errorMessage,
  required,
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    setUser({
      ...user,
      [name]: event.target.value,
      address: {
        ...user.address,
        [name]: event.target.value,
      },
    });
    setIsValid(true);
  };

  const handleBlur = () => {
    if (required && value.trim() === "") {
      setIsValid(false);
    }
  };

  return (
    <label className="text-start my-1">
      {label}
      <input
        className="form-control"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
      />
      {!isValid && <p className="text-danger">{errorMessage}</p>}
    </label>
  );
};
