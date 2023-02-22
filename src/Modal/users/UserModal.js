import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { FormInput } from "../../common/Input/FormInput";
import { inputsArray, errorMessages } from "../../utils/helpers/inputsArray";

const EditUser = ({
  user,
  setUser,
  showModal,
  setShowModal,
  onAddOrEditClick,
  onCancelClick,
  onSubmitClick,
  isPopulated,
}) => {
  return (
    <Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isPopulated ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {inputsArray?.map((input) => (
              <Fragment key={input?.id}>
                {input.address ? (
                  <Fragment>
                    <FormInput
                      {...input?.address?.street}
                      user={user}
                      setUser={setUser}
                      value={user?.address?.street}
                      errorMessage={errorMessages?.street}
                    />
                    <FormInput
                      {...input?.address?.suite}
                      user={user}
                      setUser={setUser}
                      value={user?.address?.suite}
                      errorMessage={errorMessages?.suite}
                    />
                    <FormInput
                      {...input?.address?.city}
                      user={user}
                      setUser={setUser}
                      value={user?.address?.city}
                      errorMessage={errorMessages?.city}
                    />
                  </Fragment>
                ) : (
                  <FormInput
                    {...input}
                    user={user}
                    setUser={setUser}
                    value={user[input?.name]}
                    errorMessage={errorMessages?.[input?.name]}
                  />
                )}
              </Fragment>
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          {
            <button onClick={onAddOrEditClick}>
              {isPopulated ? "Update" : "Add +"}
            </button>
          }
          <button onClick={onCancelClick}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditUser;
