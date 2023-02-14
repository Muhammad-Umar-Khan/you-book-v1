import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Users from "../components/users/users";
import UsersDetails from "../components/details/userDetails";
import UserPosts from "../components/posts/userPosts";

const MainNav = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="details/:userId" element={<UsersDetails />}></Route>
        <Route path="details/:userId/posts" element={<UserPosts />}></Route>
      </Routes>
    </Router>
  );
};

export default MainNav;
