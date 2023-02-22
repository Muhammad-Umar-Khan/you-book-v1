import SearchFilter from "../common/SearchFilter/Search";
import EditUserModal from "../Modal/users/UserModal";
import Table from "../common/Table";
import { useState, useEffect, useCallback } from "react";
import { allUsers } from "../services/api";
import { getUserObject } from "../utils/helpers/generatorHelper";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const addClick = () => {
    setShowModal(true);
    setUser(getUserObject());
  };

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await allUsers();
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="text-center mt-5">
      {isLoading && <p>Loading users...</p>}
      <SearchFilter setUsers={setUsers} />
      <Table
        users={users}
        setUsers={setUsers}
        setShowModal={setShowModal}
        setUser={setUser}
      />

      <button onClick={addClick}>Add +</button>

      <EditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        setUser={setUser}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
};

export default Users;
