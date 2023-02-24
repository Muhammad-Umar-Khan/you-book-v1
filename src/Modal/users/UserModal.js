import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { FormInput } from "../../common/Input/FormInput";
import { inputsArray } from "../../utils/helpers/inputsArray";

const UserModal = ({
  showModal,
  setShowModal,
  onAddOrEditClick,
  onCancelClick,
  isPopulated,
  formik,
}) => {
  const handleButtonClick = (event) => {
    event.preventDefault();
    onAddOrEditClick(formik.values);
  };

  return (
    <Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isPopulated ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              type="text"
              label="Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.name}
            />
            {formik.errors.name && formik.touched.name && (
              <p>{formik.errors.name}</p>
            )}
            <FormInput
              type="text"
              label="Username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username && (
              <p>{formik.errors.username}</p>
            )}
            <FormInput
              type="email"
              label="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values?.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p>{formik.errors.email}</p>
            )}
            <FormInput
              type="text"
              label="Street"
              name="address.street"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.street}
            />
            {formik.errors?.address?.street &&
              formik.touched?.address?.street && (
                <p>{formik.errors?.address?.street}</p>
              )}
            <FormInput
              type="text"
              label="Suite"
              name="address.suite"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.suite}
            />
            {formik.errors?.address?.suite &&
              formik.touched?.address?.suite && (
                <p>{formik.errors?.address?.suite}</p>
              )}
            <FormInput
              type="text"
              label="City"
              name="address.city"
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched}
              value={formik?.values?.address?.city}
            />
            {formik.errors?.address?.city && formik.touched?.address?.city && (
              <p>{formik?.errors?.address?.city}</p>
            )}
          </form>
        </Modal.Body> */}
        <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
            {inputsArray.map((input) => {
              if (input.address) {
                return (
                  <Fragment key={input?.id}>
                    <FormInput
                      type={input?.address?.street?.type}
                      label={input?.address?.street?.label}
                      name={input?.address?.street?.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.address?.street}
                    />
                    {formik.errors?.address?.street &&
                      formik.touched?.address?.street && (
                        <p>{formik.errors?.address?.street}</p>
                      )}
                    <FormInput
                      type={input?.address?.suite?.type}
                      label={input?.address?.suite?.label}
                      name={input?.address?.suite?.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.address?.suite}
                    />
                    {formik.errors?.address?.suite &&
                      formik.touched?.address?.suite && (
                        <p>{formik.errors?.address?.suite}</p>
                      )}
                    <FormInput
                      type={input?.address?.city?.type}
                      label={input?.address?.city?.label}
                      name={input?.address?.city?.name}
                      onChange={formik.handleChange}
                      onBlur={() => formik.setFieldTouched}
                      value={formik?.values?.address?.city}
                    />
                    {formik.errors?.address?.city &&
                      formik.touched?.address?.city && (
                        <p>{formik?.errors?.address?.city}</p>
                      )}
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={input.id}>
                    <FormInput
                      type={input?.type}
                      label={input?.label}
                      name={input?.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[input.name]}
                    />
                    {formik.errors[input.name] &&
                      formik.touched[input.name] && (
                        <p>{formik.errors[input.name]}</p>
                      )}
                  </Fragment>
                );
              }
            })}
          </form>
        </Modal.Body>
        <Modal.Footer>
          {
            <button type="submit" onClick={handleButtonClick}>
              {isPopulated ? "Update" : "Add +"}
            </button>
          }
          <button onClick={onCancelClick}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default UserModal;
