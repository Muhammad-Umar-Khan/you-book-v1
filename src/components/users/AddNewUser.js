import { Fragment, useState } from "react";

import { Modal } from "react-bootstrap";
import { createNewUser } from "../../services/api";

const AddNewUser = ({ users, setUsers }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const initialUser = {
    name: "",
    username: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUser);

  const addUserHandler = async () => {
    setShow(false);
    const data = {
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        street: user.address,
        city: "",
        suite: "",
      },
    };

    const response = await createNewUser(data);
    const createdUser = await response.data;
    console.log("created user", createNewUser);
    setUsers([...users, createdUser]);
  };

  return (
    <Fragment>
      <button onClick={handleShow}>Add +</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            UserName:
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
            <textarea
              className="form-control"
              value={user.address}
              onChange={(event) =>
                setUser({
                  ...user,
                  address: { street: event.target.value },
                })
              }
            ></textarea>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={addUserHandler}>
            Add
          </button>
          <button variant="primary" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AddNewUser;
