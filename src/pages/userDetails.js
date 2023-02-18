import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { getUserDetailsRequest } from "../services/api";

const UsersDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigateToPostsPage = () => {
    return navigate(`/details/${userId}/posts`);
  };

 

  const loadUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUserDetailsRequest(userId);
      setIsLoading(false);
      const { data } = response;
      setDetails(data);
    } catch (error) {
      setIsError(true);
    }
  }, [userId]);

  useEffect(() => {
    loadUserDetails();
  }, [userId, loadUserDetails]);

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
        <a href={window.location.href}>Try Again</a>
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
