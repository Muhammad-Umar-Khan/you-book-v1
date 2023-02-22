import SearchFilter from "../common/SearchFilter/Search";
import EditUserModal from "../Modal/users/UserModal";
import Table from "../common/Table";
import { useState, useEffect, useCallback } from "react";
import { allUsers, deleteUser, updateUser, newUser } from "../services/api";
import { getUserObject } from "../utils/helpers/generatorHelper";
import { handleUpdateUser } from "../utils/helpers/updateUser";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  let isPopulated = true;

  if (!user?.id) {
    isPopulated = false;
  }

  const handleAddClick = () => {
    setShowModal(true);
    setUser(getUserObject());
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
    setUser(clickedUser);
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

  const handleSubmit = () => {
    return user?.name !== "" && user?.username !== "";
  };

  const handleEditOrAdd = async () => {
    const canBeSuubmitted = handleSubmit();
    if (canBeSuubmitted) {
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
    }
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

      <EditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        setUser={setUser}
        users={users}
        setUsers={setUsers}
        onAddOrEditClick={handleEditOrAdd}
        onCancelClick={handleCancel}
        onSubmitClick={handleSubmit}
        isPopulated={isPopulated}
      />
    </div>
  );
};

export default Users;
