import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { USER_POSTS } from "../../src/utils/constants/routeConstants";
import GoBack from "../common/buttons/BackBtn";
import DetailField from "../common/DetailField";

import { userDetails } from "../services/api";

const UsersDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const validUserId = parseInt(userId);
  const [details, setDetails] = useState({
    data: {},
    isLoading: false,
    isError: false,
  });

  const navigateToPostsPage = () => {
    return navigate(generatePath(USER_POSTS, { userId: validUserId }));
  };

  const loadUserDetails = async () => {
    try {
      setDetails({
        ...details,
        isLoading: true,
      });
      const { data } = await userDetails(validUserId);
      setDetails({
        ...details,
        data,
        isLoading: false,
      });
    } catch (error) {
      setDetails({
        ...details,
        isError: true,
      });
    }
  };

  const tryAgain = () => {
    return navigate(0);
  };

  useEffect(() => {
    loadUserDetails();
  }, [validUserId]);

  if (details.isError) {
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
        {details.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div key={details?.data?.id}>
            <h1>All about: {details?.data?.username}</h1>
            <DetailField label="Name" name={details?.data?.name} />
            <DetailField label="UserName" name={details?.data?.username} />
            <DetailField label="Email" name={details?.data?.email} />
            <p>
              <strong>Address</strong>
            </p>
            <DetailField label="Street" name={details?.data?.address?.street} />
            <DetailField label="Suite" name={details?.data?.address?.suite} />
            <DetailField label="City" name={details?.data?.address?.city} />
            <DetailField
              label="ZipCode"
              name={details?.data?.address?.zipcode}
            />
            <GoBack title="Go Back" />
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
