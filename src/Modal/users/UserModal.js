import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { FormInput } from "../../common/Input/FormInput";
import { updateUser, newUser } from "../../services/api";
import { getUserObject } from "../../utils/helpers/generatorHelper";
import { inputsArray } from "../../common/inputsArray";


const EditUser = ({
  user,
  setUser,
  showModal,
  setShowModal,
  users,
  setUsers,
}) => {
  let isPopulated = true;
  for (let key in user) {
    if (user[key] === "") {
      isPopulated = false;
      break;
    }
  }
  const editOrAdd = async () => {
    if (handleSubmit()) {
      setShowModal(false);
      if (isPopulated) {
        const usersCopy = [...users];
        try {
          const userIndex = usersCopy.findIndex(
            (userFind) => userFind.id === user.id
          );
          const userNewData = getUserObject(user);
          usersCopy[userIndex] = userNewData;
          setUsers([...usersCopy]);
          await updateUser(user);
        } catch (error) {
          setUsers([...users]);
        }
      } else {
        const { data } = await newUser(getUserObject(user));
        setUsers([...users, data]);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setUser(getUserObject());
  };

  const handleSubmit = () => {
    return user.name !== "" && user.username !== "";
  };

  return (
    <Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isPopulated ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {inputsArray.map((input) => (
              <Fragment key={input.id}>
                {input.address ? (
                  <Fragment>
                    <FormInput
                      {...input.address.street}
                      user={user}
                      setUser={setUser}
                      value={user?.address?.street}
                    />
                    <FormInput
                      {...input.address.suite}
                      user={user}
                      setUser={setUser}
                      value={user?.address?.suite}
                    />
                    <FormInput
                      {...input.address.city}
                      user={user}
                      setUser={setUser}
                      value={user?.address?.city}
                    />
                  </Fragment>
                ) : (
                  <FormInput
                    {...input}
                    user={user}
                    setUser={setUser}
                    value={user[input.name]}
                  />
                )}
              </Fragment>
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          {
            <button onClick={editOrAdd} type="submit">
              {isPopulated ? "Update" : "Add +"}
            </button>
          }
          <button onClick={handleCancel}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditUser;
