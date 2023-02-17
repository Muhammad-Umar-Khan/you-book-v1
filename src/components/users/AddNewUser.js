import { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { createNewUser } from "../../services/api";
import { dataGenerator } from "../../common/DataGenerator";

const AddNewUser = ({ users, setUsers }) => {
  const [showModal, setShowModal] = useState(false);

  const initialUser = {
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
      suite: "",
    },
  };

  const [user, setUser] = useState(initialUser);

  const addUserHandler = async () => {
    if (user.name) {
      setShowModal(false);
      const payLoad = dataGenerator(user);
      const response = await createNewUser(payLoad);
      const { data } = response;
      setUsers([...users, data]);
    }
  };

  return (
    <Fragment>
      <button onClick={() => setShowModal(true)}>Add +</button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="text-start my-1">
            Name:
            <input
              className="form-control"
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            UserName:
            <input
              className="form-control"
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Email:
            <input
              className="form-control"
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Address, Street
            <input
              className="form-control"
              onChange={(event) =>
                setUser({
                  ...user,
                  address: { ...user.address, street: event.target.value },
                })
              }
            ></input>
            City:
            <input
              className="form-control"
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
              onChange={(event) =>
                setUser({
                  ...user,
                  address: { ...user.address, suite: event.target.value },
                })
              }
            ></input>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={addUserHandler}>
            Add
          </button>
          <button variant="primary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AddNewUser;
