import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import GoBack from "../common/buttons/Back";

import { userDetailsRequest } from "../services/api";

const UsersDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const validUserId = parseInt(userId);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigateToPostsPage = () => {
    return navigate(`/details/${validUserId}/posts`);
  };

  const loadUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await userDetailsRequest(validUserId);
      setIsLoading(false);
      const { data } = response;
      setDetails(data);
    } catch (error) {
      setIsError(true);
    }
  };

  const tryAgain = () => {
    return navigate(0);
  }

  useEffect(() => {
    loadUserDetails();
  }, [validUserId]);

  if (isError) {
    return (
      <Fragment>
        <ToastContainer
          closeOnClick={true}
          position={"bottom-center"}
          autoClose={false}
        >
          {toast("Error loading details")}
        </ToastContainer>
        <a href={tryAgain}>Try Again</a>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="text-center mt-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div key={details?.id}>
            <h1>All about: {details?.username}</h1>
            <p>
              <strong>Name:</strong> {details?.name}
            </p>
            <p>
              <strong>Username:</strong> {details?.username}
            </p>
            <p>
              <strong>Email:</strong> {details?.email}
            </p>

            <p>
              <strong>Address</strong>
            </p>
            <p>
              <i>Street:</i> {details?.address?.street},<i>Suite:</i>
              {details?.address?.suite},<i>City:</i> {details?.address?.city},
              <i>ZipCode:</i> {details?.address?.zipcode}
            </p>
            <GoBack />
            <button
              className="btn btn-outline-danger"
              onClick={navigateToPostsPage}
            >
              POSTS
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UsersDetails;
