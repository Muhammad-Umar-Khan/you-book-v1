import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "../components/users/Users";
import UsersDetails from "../components/details/userDetails";
import UserPosts from "../components/posts/userPosts";
import Error from "../components/Error/Error";

import {
  USERS,
  USER_DETAILS,
  USER_POSTS,
  NOT_FOUND,
} from "../common/PathConstants";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path={USERS} element={<Users />} />
        <Route path={USER_DETAILS} element={<UsersDetails />}></Route>
        <Route path={USER_POSTS} element={<UserPosts />}></Route>
        <Route path={NOT_FOUND} element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
