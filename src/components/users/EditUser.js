// import { Fragment, useState } from "react";
// import { updateUser } from "../../services/api";

// const EditUser = ({ user, users, setUsers }) => {
//   const [updatedUser, setUpdatedUser] = useState({
//     name: user?.name,
//     username: user?.username,
//     email: user?.email,
//     address: user?.address?.street + user?.address?.suite + user?.address?.city,
//   });

//   const updateUserHandler = async (userId) => {
//     const data = {
//       name: updatedUser.name,
//       username: updatedUser.username,
//       email: updatedUser.email,
//       address: updatedUser.address,
//     };

//     const response = await updateUser(userId, data);

//     const { name } = response.data;
//     const { username } = response.data;
//     const { email } = response.data;
//     const NewAddress =
//       response.data?.address?.street +
//       response.data?.address?.suite +
//       response.data?.address?.city;
//     const updatedUsers = users.map((user) =>
//       user.id === userId
//         ? {
//             ...user,
//             name,
//             username,
//             email,
//             address: NewAddress,
//           }
//         : user
//     );
//     setUsers(updatedUsers);
//   };

//   return (
//     <Fragment>
//       <button
//         type="button"
//         className="btn btn-primary"
//         data-bs-toggle="modal"
//         data-bs-target={`#user${user?.id}`}
//       >
//         Edit
//       </button>

//       <div
//         className="modal fade"
//         id={`user${user?.id}`}
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="staticBackdropLabel">
//                 Edit user
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <label className="text-start my-1">
//                 Name:
//                 <input
//                   className="form-control"
//                   value={updatedUser.name}
//                   onChange={(event) =>
//                     setUpdatedUser({ ...updatedUser, name: event.target.value })
//                   }
//                 ></input>
//               </label>
//               <label className="text-start my-1">
//                 Username:
//                 <input
//                   className="form-control"
//                   value={updatedUser.username}
//                   onChange={(event) =>
//                     setUpdatedUser({
//                       ...updatedUser,
//                       username: event.target.value,
//                     })
//                   }
//                 ></input>
//               </label>
//               <label className="text-start my-1">
//                 Email:
//                 <input
//                   className="form-control"
//                   value={updatedUser.email}
//                   onChange={(event) =>
//                     setUpdatedUser({
//                       ...updatedUser,
//                       email: event.target.value,
//                     })
//                   }
//                 ></input>
//               </label>
//               <label className="text-start my-1">
//                 Address:
//                 <input
//                   className="form-control"
//                   value={updatedUser.address}
//                   onChange={(event) =>
//                     setUpdatedUser({
//                       ...updatedUser,
//                       address: event.target.value,
//                     })
//                   }
//                 ></input>
//               </label>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//                 onClick={() => updateUserHandler(user?.id)}
//               >
//                 Update
//               </button>
//               <button
//                 type="button"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 className="btn btn-info"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default EditUser;

import React, { Fragment, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../../services/api";

function EditUser({ user, users, setUsers }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name,
    username: user?.username,
    email: user?.email,
    address: user?.address?.street + user?.address?.suite + user?.address?.city,
  });

  const updateUserHandler = async (userId) => {
    const data = {
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      address: updatedUser.address,
    };

    const response = await updateUser(userId, data);

    const { name } = response.data;
    const { username } = response.data;
    const { email } = response.data;
    const NewAddress =
      response.data?.address?.street +
      response.data?.address?.suite +
      response.data?.address?.city;
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            name,
            username,
            email,
            address: NewAddress,
          }
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <Fragment>
      <button onClick={handleShow}>Edit</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="text-start my-1">
            Name:
            <input
              className="form-control"
              value={updatedUser.name}
              onChange={(event) =>
                setUpdatedUser({ ...updatedUser, name: event.target.value })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Username:
            <input
              className="form-control"
              value={updatedUser.username}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  username: event.target.value,
                })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Email:
            <input
              className="form-control"
              value={updatedUser.email}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  email: event.target.value,
                })
              }
            ></input>
          </label>
          <label className="text-start my-1">
            Address:
            <input
              className="form-control"
              value={updatedUser.address}
              onChange={(event) =>
                setUpdatedUser({
                  ...updatedUser,
                  address: event.target.value,
                })
              }
            ></input>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Update</button>
          <button onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default EditUser;
