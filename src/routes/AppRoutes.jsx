import { Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import ProfileUpdate from "../components/ProfileUpdate";
import UserList from "../components/UserList";
import UserPost from "../components/UserPost";
import NotPage from "../pages/NotPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="*" element={<NotPage />} />
      <Route path="/update/:id" element={<ProfileUpdate />}></Route>
      <Route path="/Add" element={<UserPost />}></Route>
      <Route path="/List" element={<UserList />}></Route>
    </Routes>
  );
};
export default AppRoutes;
