import { deleteUserRequest } from "../../services/api";

const DeleteUser = ({ userId, users, setUsers }) => {
  const deleteUser = async () => {
    await deleteUserRequest(userId);
    const newUsers = users.filter((user) => user.id !== userId); //no relationship with response;
    setUsers(newUsers);
  };

  return (
    <div>
      <button onClick={deleteUser}>
        Delete
      </button>
    </div>
  );
};

export default DeleteUser;
