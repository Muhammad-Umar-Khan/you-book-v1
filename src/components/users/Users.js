import SearchFilter from "../../common/SearchFilter/Search";
import DeleteUser from "./DeleteUser";
import EditUser from "../../Modal/users/EditUser";
import AddNewUser from "./AddNewUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/api";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToDetails = (id) => {
    navigate(`/users/details/${id}`);
  };

  const loadUsers = async () => {
    if (window.location.pathname === "/") {
      return navigate("/users");
    }
    try {
      setIsLoading(true);
      const loadedUsers = await getAllUsers();
      setIsLoading(false);
      setUsers(loadedUsers.data);
    } catch (error) {
      console.log(error.message);
    }
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
                <EditUser user={user} setUsers={setUsers} users={users} />
              </td>
              <td>
                <DeleteUser
                  userId={user.id}
                  users={users}
                  setUsers={setUsers}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddNewUser users={users} setUsers={setUsers} />
    </div>
  );
};

export default Users;
