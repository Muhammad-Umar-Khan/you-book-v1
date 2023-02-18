import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Users from "../pages/Users";
import UsersDetails from "../pages/userDetails";
import UserPosts from "../pages/posts";
import Error from "../components/Error/Error";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/details/:userId" element={<UsersDetails />}></Route>
        <Route path="details/:userId/posts" element={<UserPosts />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
