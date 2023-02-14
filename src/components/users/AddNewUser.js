import axios from "axios";
import { Fragment, useState } from "react";

const AddNewUser = ({ users, setUsers }) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

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

  const addUserHandler = async () => {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,
      {
        id: Math.random(),
        name,
        username,
        email,
        address: {
          street: address,
          city: "",
          suite: "",
        },
      }
    );
    const user = response.data;
    setUsers([...users, user]);
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#user`}
      >
        New +
      </button>

      <div
        className="modal fade"
        id={`user`}
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add new user
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
                onClick={() => addUserHandler()}
              >
                Add +
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

export default AddNewUser;
