import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../../services/api";

export const detaGenerator = (updatedUser) => ({
  ...updateUser,
  name: updatedUser?.name,
  username: updatedUser?.username,
  email: updatedUser?.email,
  address: {
    street: updatedUser?.address?.street,
    suite: updatedUser?.address?.suite,
    city: updatedUser?.address?.city,
  },
});

function EditUser({ user, users, setUsers }) {
  const [show, setShow] = useState(false);

  const initialState = detaGenerator(user);

  const [updatedUser, setUpdatedUser] = useState(initialState);

  const updateUserHandler = async (userId) => {
    setShow(false);
    const getPayLoad = detaGenerator(updatedUser);
    const response = await updateUser(userId, getPayLoad);
    const updatedUsers = users.map((user) =>
      user.id === userId ? detaGenerator(response.data) : user
    );
    setUsers(updatedUsers);
  };

  return (
    <Fragment>
      <button onClick={() => setShow(true)}>Edit</button>

      <Modal show={show} onHide={() => setShow(false)}>
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
            Address, Street:
            <input
              className="form-control"
              value={updatedUser.address.street}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  address: {
                    ...updatedUser.address,
                    street: event.target.value,
                  },
                })
              }
            ></input>
            City
            <input
              className="form-control"
              value={updatedUser.address.city}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  address: { ...updatedUser.address, city: event.target.value },
                })
              }
            ></input>
            Suite
            <input
              className="form-control"
              value={updatedUser.address.suite}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  address: {
                    ...updatedUser.address,
                    suite: event.target.value,
                  },
                })
              }
            ></input>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => updateUserHandler(user.id)}>Update</button>
          <button onClick={() => setShow(false)}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default EditUser;
