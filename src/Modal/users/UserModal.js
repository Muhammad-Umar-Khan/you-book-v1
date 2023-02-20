import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { updateUserRequest, createNewUser } from "../../services/api";
import { getUserObject } from "../../utils/helpers/generatorHelper";

function EditUser({
  user,
  setUser,
  showModal,
  setShowModal,
  users,
  setUsers,
  title,
  type,
}) {
  const addUserHandler = async () => {
    if (user.name) {
      setShowModal(false);
      const payLoad = getUserObject(user);
      const response = await createNewUser(payLoad);
      const { data } = response;
      setUsers([...users, data]);
    }
  };
  const payLoad = user;
  const usersCopy = [...users];
  const updateUser = async () => {
    setShowModal(false);
    try {
      const userIndex = usersCopy.findIndex((user) => user.id === payLoad.id);
      const userNewData = getUserObject(payLoad);
      usersCopy[userIndex] = userNewData;
      setUsers([...usersCopy]);
      await updateUserRequest(payLoad);
    } catch (error) {
      setUsers([...users]);
    }
  };

  return (
    <Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="text-start my-1">
            Name:
            <input
              className="form-control"
              value={user?.name}
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Username:
            <input
              className="form-control"
              value={user?.username}
              onChange={(event) =>
                setUser({
                  ...user,
                  username: event.target.value,
                })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Email:
            <input
              className="form-control"
              value={user?.email}
              onChange={(event) =>
                setUser({
                  ...user,
                  email: event.target.value,
                })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Address, Street:
            <input
              className="form-control"
              value={user?.address?.street}
              onChange={(event) =>
                setUser({
                  ...user,
                  address: {
                    ...user.address,
                    street: event.target.value,
                  },
                })
              }
            ></input>
            City
            <input
              className="form-control"
              value={user?.address?.city}
              onChange={(event) =>
                setUser({
                  ...user,
                  address: { ...user.address, city: event.target.value },
                })
              }
            ></input>
            Suite
            <input
              className="form-control"
              value={user?.address?.suite}
              onChange={(event) =>
                setUser({
                  ...user,
                  address: {
                    ...user.address,
                    suite: event.target.value,
                  },
                })
              }
            ></input>
          </label>
        </Modal.Body>
        <Modal.Footer>
          {type === "edit" ? (
            <button onClick={updateUser}>Update</button>
          ) : (
            <button onClick={addUserHandler}>Add +</button>
          )}
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default EditUser;
