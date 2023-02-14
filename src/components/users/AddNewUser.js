import axios from "axios";
import { Fragment, useState } from "react";

const AddNewUser = ({ users, setUsers }) => {
  const initialUser = {
    name: "",
    username: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUser);

  const addUserHandler = async () => {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,
      {
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
          street: user.address,
          city: "",
          suite: "",
        },
      }
    );
    const createdUser = response.data;
    setUsers([...users, createdUser]);
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
                  value={user.name}
                  onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                  }
                ></input>
              </label>
              <label className="text-start my-1">
                Username:
                <input
                  className="form-control"
                  value={user.username}
                  onChange={(event) =>
                    setUser({ ...user, username: event.target.value })
                  }
                ></input>
              </label>
              <label className="text-start my-1">
                Email:
                <input
                  className="form-control"
                  value={user.email}
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                ></input>
              </label>
              <label className="text-start my-1">
                Address:
                <input
                  className="form-control"
                  value={user.address}
                  onChange={(event) =>
                    setUser({ ...user, address: event.target.value })
                  }
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
