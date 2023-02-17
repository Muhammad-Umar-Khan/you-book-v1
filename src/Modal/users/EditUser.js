import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../../services/api";
import { dataGenerator } from "../../common/DataGenerator";
import { INPUT_ELEMENTS } from "../../common/InputElements";

function EditUser({ user, users, setUsers }) {
  const [show, setShow] = useState(false);

  const initialState = dataGenerator(user);

  const [updatedUser, setUpdatedUser] = useState(initialState);

  const updateUserHandler = async (userId) => {
    setShow(false);
    const getPayLoad = dataGenerator(updatedUser);
    const response = await updateUser(userId, getPayLoad);
    const user = users.find((user) => user.id === userId);
    const userNewData = dataGenerator(response.data);
    const indexIs = users.indexOf(user);
    users[indexIs] = userNewData;
    setUsers([...users]);
  };

  return (
    <Fragment>
      <button onClick={() => setShow(true)}>Edit</button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {INPUT_ELEMENTS.map((elem) => {
            const inputName = elem.title;
            return (
              <Fragment key={elem.id}>
                <label className="text-start my-1">
                  {elem.title}
                  <input
                    className="form-control"
                    value={updatedUser.inputName}
                    onChange={(event) =>
                      setUpdatedUser({
                        ...updatedUser,
                        title: event.target.value,
                      })
                    }
                  ></input>
                </label>
              </Fragment>
            );
          })}
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
