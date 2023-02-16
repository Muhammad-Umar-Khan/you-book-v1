import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "../components/users/Users";
import UsersDetails from "../components/details/userDetails";
import UserPosts from "../components/posts/userPosts";
import Error from "../components/Error/Error";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/details/:userId" element={<UsersDetails />}></Route>
        <Route path="details/:userId/posts" element={<UserPosts />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
