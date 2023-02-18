import SearchFilter from "../common/SearchFilter/Search";
import EditUserModal from "../Modal/users/EditUserModal";
import { deleteUserRequest } from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/api";
import { getUserObject } from "../utils/helpers/generatorHelper";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const navigateToDetails = (id) => {
    navigate(`/users/details/${id}`);
  };

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const loadedUsers = await getAllUsers();
      setIsLoading(false);
      setUsers(loadedUsers.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    const usersCopy = [...users];
    try {
      const newUsers = usersCopy.filter((user) => user.id !== id); //no relationship with response;
      setUsers(newUsers);
      await deleteUserRequest(id);
    } catch (error) {
      setUsers(usersCopy);
    }
  };

  const addClick = () => {
    setShowModal(true);
    setTitle("Add User");
    setType("add");
    setUser(getUserObject());
  };

  const editClick = (clickedUser) => {
    setShowModal(true);
    setTitle("Edit User");
    setType("edit");
    setUser(clickedUser);
  };

  useEffect(() => {
    loadUsers();
  }, []);

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
