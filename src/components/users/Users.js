import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../SearchFilter/SearchFilter";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import AddNewUser from "./AddNewUser";
import { getAllUsers } from "../../services/api";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToDetails = (id) => {
    navigate(`details/${id}`);
  };

  const loadUsers = async () => {
    setIsLoading(true);
    const loadedUsers = await getAllUsers();
    setIsLoading(false);
    setUsers(loadedUsers.data);
  };

  useEffect(() => {
    try {
      loadUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="text-center mt-5">
      {isLoading && <p>Loading users...</p>}
      <SearchFilter setUsers={setUsers} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td
                onClick={() => navigateToDetails(user.id)}
                className="cursor"
              >
                {user.id}
              </td>
              <td
                onClick={() => navigateToDetails(user.id)}
                className="cursor"
              >
                {user.name}
              </td>
              <td
                onClick={() => navigateToDetails(user.id)}
                className="cursor"
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
