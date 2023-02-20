import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { FormInput, FormInputAddressField } from "../../common/Input/FormInput";
import { updateUserRequest, newUserRequest } from "../../services/api";
import { getUserObject } from "../../utils/helpers/generatorHelper";

const EditUser = ({
  user,
  setUser,
  showModal,
  setShowModal,
  users,
  setUsers
}) => {
  let isPopulated = true;

  for (let key in user) {
    if (user[key] === "") {
      isPopulated = false;
      break;
    }
  }

  const editOrAdd = async () => {
    setShowModal(false);
    if (isPopulated) {
      const payLoad = user;
      const usersCopy = [...users];
      try {
        const userIndex = usersCopy.findIndex((user) => user.id === payLoad.id);
        const userNewData = getUserObject(payLoad);
        usersCopy[userIndex] = userNewData;
        setUsers([...usersCopy]);
        await updateUserRequest(payLoad);
      } catch (error) {
        setUsers([...users]);
      }
    } else {
      if (user.name) {
        const payLoad = getUserObject(user);
        const response = await newUserRequest(payLoad);
        const { data } = response;
        setUsers([...users, data]);
      }
    }
  };

  const cancel = () => {
    showModal(false);
    setUser({});
  };
  return (
    <Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isPopulated ? "Edit User" : "Update User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            user={user}
            setUser={setUser}
            propertyStr={"name"}
            property={user?.name}
          />
          <FormInput
            user={user}
            setUser={setUser}
            propertyStr={"username"}
            property={user?.username}
          />

          <FormInput
            user={user}
            setUser={setUser}
            propertyStr={"email"}
            property={user?.email}
          />
          <FormInputAddressField
            user={user}
            setUser={setUser}
            propertyStr={"street"}
            property={user?.address?.street}
          />
          <FormInputAddressField
            user={user}
            setUser={setUser}
            propertyStr={"city"}
            property={user?.address?.city}
          />

          <FormInputAddressField
            user={user}
            address={user.address}
            setUser={setUser}
            propertyStr={"suite"}
            property={user?.address?.suite}
          />
        </Modal.Body>
        <Modal.Footer>
          {
            <button onClick={editOrAdd}>
              {isPopulated ? "Update" : "Add +"}
            </button>
          }
          {/* {type === "edit" ? (
            <button onClick={editOrAdd}>Update</button>
          ) : (
            <button onClick={editOrAdd}>Add +</button>
          )} */}
          <button onClick={cancel}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditUser;
