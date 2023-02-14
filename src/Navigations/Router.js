import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "../components/users/Users";
import UsersDetails from "../components/details/userDetails";
import UserPosts from "../components/posts/userPosts";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="details/:userId" element={<UsersDetails />}></Route>
        <Route path="details/:userId/posts" element={<UserPosts />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
