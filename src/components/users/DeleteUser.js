import axios from "axios";

const DeleteUser = (props) => {
  const userId = props.userId;
  const users = props.users;
  const setUsers = props.setUsers;

  const deleteUser = async () => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);

    const newUsers = users.filter((user) => user.id !== userId); //no relationship with response;
    setUsers(newUsers);
  };

  return (
    <div>
      <button onClick={deleteUser} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};

export default DeleteUser;
