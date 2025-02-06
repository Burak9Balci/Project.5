import { Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
    </Routes>
  );
};
export default AppRoutes;
