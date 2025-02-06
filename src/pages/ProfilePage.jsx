import React, { useEffect } from "react";
import { useUserContext } from "../context/UserProvider"; // Context'ten veri almak için hook
import ApiService from "../services/apiService"; // API servisini import et

const ProfilePage = () => {
  const { state, dispatch } = useUserContext(); // Global state'e erişim
  const apiService = new ApiService();

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch({ type: "SET_LOADING" }); // Yükleniyor durumuna geç
      try {
        const data = await apiService.getAll();
        dispatch({ type: "SET_USER", payload: data[0] }); // API'den gelen veriyi state'e set et
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Veri yüklenirken hata oluştu",
        }); // Hata mesajı
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleUpdateUser = (updatedInfo) => {
    dispatch({ type: "UPDATE_USER", payload: updatedInfo }); // Kullanıcıyı güncelle
  };

  return (
    <div>
      {state.loading ? (
        <p>Yükleniyor...</p>
      ) : state.error ? (
        <p>{state.error}</p>
      ) : (
        <div>
          <h2>{state.user?.name}</h2>
          <p>Email: {state.user?.email}</p>
          <p>Phone: {state.user?.phone}</p>
          <button onClick={() => handleUpdateUser({ name: "Yeni İsim" })}>
            Güncelle
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
