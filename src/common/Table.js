import { generatePath, useNavigate } from "react-router-dom";
import { USER_DETAILS } from "../utils/constants/routeConstants";

const Table = ({ data, onDeleteUser, onEditClick }) => {
  const navigate = useNavigate();

  const navigateToDetails = (id) => {
    navigate(generatePath(USER_DETAILS, { userId: id }));
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
        {data?.map((element) => (
          <tr key={element?.id}>
            <td
              onClick={() => navigateToDetails(element.id)}
              className="cursor-pointer"
            >
              {element?.id}
            </td>
            <td
              onClick={() => navigateToDetails(element.id)}
              className="cursor-pointer"
            >
              {element?.name}
            </td>
            <td
              onClick={() => navigateToDetails(element.id)}
              className="cursor-pointer"
            >
              {element?.email}
            </td>

            <td>
              <button onClick={() => onEditClick(element)}>Edit</button>
            </td>
            <td>
              <button onClick={() => onDeleteUser(element?.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
