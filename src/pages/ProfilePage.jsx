import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import ProfileCard from "../components/ProfileCard";
import apiService from "../services/apiService";

const ProfilePage = () => {
  const { state, dispatch } = useContext(UserContext);
  const api = new apiService();
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await api.getOne(1);
        dispatch({ type: "SET_USER", payload: response.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    fetchUser();
  }, [dispatch]);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  return (
    <div className="profile-page">
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
          {state.isDarkMode ? "🌞 Aydınlık Mod" : "🌙 Karanlık Mod"}
        </button>
      </div>
      {state.user && <ProfileCard user={state.user} />}
    </div>
  );
};

export default ProfilePage;
