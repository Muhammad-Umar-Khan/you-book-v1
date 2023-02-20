import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUserRequest } from "../services/api";
import { getUserObject } from "../utils/helpers/generatorHelper";
import SearchFilter from "../common/SearchFilter/Search";
import EditUserModal from "../Modal/users/UserModal";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(getUserObject());
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const navigateToDetails = (id) => {
    navigate(`/users/details/${id}`);
  };

  const addClick = () => {
    setShowModal(true);
    setTitle("Add User");
    setType("add");
    setUser(getUserObject());
  };

  const deleteUser = async (id) => {
    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      await deleteUserRequest(id);
    } catch (error) {
      setUsers(users);
    }
  };
  const editClick = (clickedUser) => {
    setShowModal(true);
    setTitle("Edit User");
    setType("edit");
    setUser(clickedUser);
  };

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getAllUsers();
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
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td
                onClick={() => navigateToDetails(user.id)}
                className="cursor-pointer"
              >
                {user.id}
              </td>
              <td
                onClick={() => navigateToDetails(user.id)}
                className="cursor-pointer"
              >
                {user.name}
              </td>
              <td
                onClick={() => navigateToDetails(user.id)}
                className="cursor-pointer"
              >
                {user.email}
              </td>

              <td>
                <button onClick={() => editClick(user)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addClick}>Add +</button>

      <EditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        setUser={setUser}
        users={users}
        type={type}
        setUsers={setUsers}
        title={title}
      />
    </div>
  );
};

export default Users;
