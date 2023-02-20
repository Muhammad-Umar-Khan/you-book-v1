export const FormInput = ({ user, setUser, property, propertyStr }) => {
  return (
    <label className="text-start my-1">
      {propertyStr}
      <input
        className="form-control"
        value={property}
        onChange={(event) =>
          setUser({ ...user, [propertyStr]: event.target.value })
        }
      ></input>
    </label>
  );
};

export const FormInputAddressField = ({
  user,
  setUser,
  property,
  propertyStr,
}) => {
  return (
    <label className="text-start my-1">
      {propertyStr}
      <input
        className="form-control"
        value={property}
        onChange={(event) =>
          setUser({
            ...user,
            address: {
              ...user.address,
              [propertyStr]: event.target.value,
            },
          })
        }
      />
    </label>
  );
};
