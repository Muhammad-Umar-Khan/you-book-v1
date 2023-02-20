import { useNavigate } from "react-router-dom";
import { deleteUserRequest } from "../services/api";

const Table = ({
  users,
  setUsers,
  setShowModal,

  setUser,
}) => {
  const navigate = useNavigate();

  const navigateToDetails = (id) => {
    navigate(`/users/details/${id}`);
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

    setUser(clickedUser);
  };

  return (
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
  );
};

export default Table;
