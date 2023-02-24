import * as Yup from "yup";
import SearchFilter from "../common/SearchFilter/Search";
import UserModal from "../Modal/users/UserModal";
import Table from "../common/Table";
import { useState, useEffect, useCallback } from "react";
import { allUsers, deleteUser, updateUser, newUser } from "../services/api";
import { getUserObject } from "../utils/helpers/generatorHelper";
import { handleUpdateUser } from "../utils/helpers/updateUser";
import { useFormik } from "formik";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const initialValues = {
    id: user?.id ?? "",
    name: user?.name ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    address: {
      street: user?.address?.street ?? "",
      suite: user?.address?.suite ?? "",
      city: user?.address?.city ?? "",
    },
  };

  const validationSchema = Yup.object({
    id: Yup.number().required(),
    name: Yup.string().required("*Required"),
    username: Yup.string().required("*Required"),
    email: Yup.string().email().required("*Required"),
    address: Yup.object({
      street: Yup.string().required("*Required"),
      suite: Yup.string().required("*Required"),
      city: Yup.string().required("*Required"),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
  });

  let isPopulated = true;

  if (!formik?.values?.id) {
    isPopulated = false;
  }

  const handleAddClick = () => {
    setShowModal(true);
    formik.setValues(getUserObject());
  };

  const handleLoadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await allUsers();
      setUsers(data);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditClick = (clickedUser) => {
    setShowModal(true);
    formik.setValues(clickedUser);
  };

  const handleDeleteUser = async (id) => {
    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user?.id !== id));
      await deleteUser(id);
    } catch (error) {
      setUsers(users);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setUser(getUserObject());
  };

  const handleEditOrAdd = async (user) => {
    setShowModal(false);
    if (isPopulated) {
      try {
        const usersCopy = handleUpdateUser(users, user);
        setUsers([...usersCopy]);

        await updateUser(user);
      } catch (error) {
        setUsers([...users]);
      }
    } else {
      const { data } = await newUser(getUserObject(user));
      setUsers([...users, data]);
    }
    // }
  };

  useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  return (
    <div className="text-center mt-5">
      {isLoading && <p>Loading users...</p>}
      <SearchFilter setUsers={setUsers} />
      <Table
        data={users}
        setUsers={setUsers}
        setShowModal={setShowModal}
        setUser={setUser}
        onDeleteUser={handleDeleteUser}
        onEditClick={handleEditClick}
      />

      <button onClick={handleAddClick}>Add +</button>

      <UserModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        setUser={setUser}
        users={users}
        setUsers={setUsers}
        onAddOrEditClick={handleEditOrAdd}
        onCancelClick={handleCancel}
        formik={formik}
        isPopulated={isPopulated}
      />
    </div>
  );
};

export default Users;
