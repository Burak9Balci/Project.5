// src/reducers/userReducer.js

export const initialState = {
  user: null, // Başlangıçta kullanıcı verisi yok
  loading: false, // Yükleniyor durumu
  error: null, // Hata durumu
};

// userReducer fonksiyonunun doğru şekilde tanımlanması
const userReducer = (state, action) => {
  // Parametre olarak state ve action almalı
  switch (action.type) {
    case "SET_USER":
      // Kullanıcı verisini state'e set eder
      return {
        ...state,
        user: action.payload, // action.payload -> API'den gelen kullanıcı verisi
        loading: false, // Yükleme tamamlandı
        error: null, // Hata sıfırlanır
      };
    case "SET_LOADING":
      // Yükleniyor durumuna geçer
      return {
        ...state,
        loading: true,
      };
    case "SET_ERROR":
      // Hata durumunu set eder
      return {
        ...state,
        error: action.payload, // action.payload -> hata mesajı
        loading: false, // Yükleme durumu sona erer
      };
    case "UPDATE_USER":
      // Kullanıcı bilgilerini günceller
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // Kullanıcı verilerini günceller
        },
      };
    default:
      return state; // Default durumda state'i olduğu gibi döndürür
  }
};

export default userReducer;
