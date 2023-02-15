import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { updateUser } from "../../services/api";

function EditUser({ user, users, setUsers }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name,
    username: user?.username,
    email: user?.email,
    address: user?.address?.street + user?.address?.suite + user?.address?.city,
  });

  const updateUserHandler = async (userId) => {
    setShow(false);
    const data = {
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      address: updatedUser.address,
    };

    const response = await updateUser(userId, data);

    const { name } = response.data;
    const { username } = response.data;
    const { email } = response.data;
    const NewAddress =
      response.data?.address?.street +
      response.data?.address?.suite +
      response.data?.address?.city;
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            name,
            username,
            email,
            address: NewAddress,
          }
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <Fragment>
      <button onClick={handleShow}>Edit</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="text-start my-1">
            Name:
            <input
              className="form-control"
              value={updatedUser.name}
              onChange={(event) =>
                setUpdatedUser({ ...updatedUser, name: event.target.value })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Username:
            <input
              className="form-control"
              value={updatedUser.username}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  username: event.target.value,
                })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Email:
            <input
              className="form-control"
              value={updatedUser.email}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  email: event.target.value,
                })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Address:
            <input
              className="form-control"
              value={updatedUser.address}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  address: event.target.value,
                })
              }
            ></input>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => updateUserHandler(user.id)}>Update</button>
          <button onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default EditUser;
