import axios from "axios";
import { Fragment, useState } from "react";

const EditUser = ({ user, users, setUsers }) => {
  const [name, setName] = useState(user?.name);
  const [username, setUserName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const makeAddress =
    user?.address?.street + user?.address?.suite + user?.address?.city;
  const [address, setAddress] = useState(makeAddress);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };
  const updateUserHandler = async (userId) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      {
        name: name,
        username: username,
        email: email,
        address: address,
      }
    );
    const NewName = response.data.name;
    const NewUsername = response.data.username;
    const NewEmail = response.data.email;
    const NewAddress =
      response.data?.address?.street +
      response.data?.address?.suite +
      response.data?.address?.city;
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            name: NewName,
            username: NewUsername,
            email: NewEmail,
            address: NewAddress,
          }
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#user${user?.id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`user${user?.id}`}
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit user
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label className="text-start my-1">
                Name:
                <input
                  className="form-control"
                  value={name}
                  onChange={nameChangeHandler}
                ></input>
              </label>
              <label className="text-start my-1">
                Username:
                <input
                  className="form-control"
                  value={username}
                  onChange={userNameChangeHandler}
                ></input>
              </label>
              <label className="text-start my-1">
                Email:
                <input
                  className="form-control"
                  value={email}
                  onChange={emailChangeHandler}
                ></input>
              </label>
              <label className="text-start my-1">
                Address:
                <input
                  className="form-control"
                  value={address}
                  onChange={addressChangeHandler}
                ></input>
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => updateUserHandler(user?.id)}
              >
                Update
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-info"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUser;
