import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getUserDetailsRequest } from "../../services/api";

const UsersDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigateToPostsPage = () => {
    return navigate(`/details/${userId}/posts`);
  };

  const loadUserDetails = useCallback(async () => {
    setIsLoading(true);
    const response = await getUserDetailsRequest(userId);
    setIsLoading(false);
    const extractedDetails = response.data;
    setDetails(extractedDetails);
  }, [userId]);

  useEffect(() => {
    try {
      loadUserDetails();
    } catch (error) {
      console.log(error.message);
    }
  }, [userId, loadUserDetails]);

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
