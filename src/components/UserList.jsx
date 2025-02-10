import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/apiService";
import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";
import userReducer, { initialState } from "../reducers/userReducer";

const UserList = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const api = new ApiService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: "SET_LOADING" }); // Yükleme durumunu aç
      try {
        const response = await api.getAll();
        dispatch({ type: "SET_USER", payload: response.data }); // Kullanıcıları yükle
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Veri alınırken hata oluştu!" });
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.makeDelete(id); // API'ye DELETE isteği gönderir
      const updatedUsers = state.user.filter((user) => user.id !== id);
      dispatch({ type: "SET_USER", payload: updatedUsers });
    } catch (error) {
      alert("Kullanıcı silinirken hata oluştu!");
    }
  };

  // Tablo kolonları
  const columns = [
    { title: "ID", field: "id", width: 80 },
    { title: "Kullanıcı Adı", field: "username", width: 150 },
    { title: "E-Posta", field: "email", width: 250 },
    { title: "Şehir", field: "address.city", width: 150 },
    { title: "Telefon", field: "phone", width: 200 },
    {
      title: "İşlem",
      field: "actions",
      width: 120,
      formatter: (cell) => {
        const id = cell.getRow().getData().id;
        return `<button class="delete-btn" data-id="${id}">Sil</button>`;
      },
      cellClick: (e, cell) => {
        const id = cell.getRow().getData().id;
        handleDelete(id);
      },
    },
  ];

  const options = {
    layout: "fitColumns",
    movableColumns: true,
  };

  return (
    <div>
      <h2>Kullanıcı Listesi</h2>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}

      {state.loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <ReactTabulator
          columns={columns}
          data={state.user || []}
          options={options}
        />
      )}
    </div>
  );
};

export default UserList;
