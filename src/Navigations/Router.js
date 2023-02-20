import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Users from "../pages/Users";
import UsersDetails from "../pages/userDetails";
import UserPosts from "../pages/posts";
import Error from "../components/Error/Error";
import {
  ERROR,
  HOME,
  NOT_FOUND,
  USERS,
  USER_DETAILS,
  USER_POSTS,
} from "../utils/constants/routeConstants";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Navigate to="/users" />} />
        <Route path={USERS} element={<Users />} />
        <Route path={USER_DETAILS} element={<UsersDetails />}></Route>
        <Route path={USER_POSTS} element={<UserPosts />}></Route>
        <Route path={ERROR} element={<Error />}></Route>
        <Route path={NOT_FOUND} element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
