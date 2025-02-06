import { Routes, Route } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfileCard />} />
    </Routes>
  );
};
export default AppRoutes;
