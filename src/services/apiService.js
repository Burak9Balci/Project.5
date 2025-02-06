import axios from "axios";

class ApiService {
  constructor(url = "https://jsonplaceholder.typicode.com/users") {
    this.url = url;
  }
  async getAll() {
    try {
      const response = await axios.get(`${this.url}`);
      return response.data;
    } catch (error) {
      alert("Ürünleri getiriken hata oldu");
    }
  }
  async makePost(obj) {
    try {
      const response = await axios.post(`${this.url}`, obj);
      return response.data;
    } catch (error) {
      alert("Ekleme sırasında hata oldu");
    }
  }
  async makePut(id, obj) {
    try {
      const response = await axios.put(`${this.url}/${id}`, obj);
      return response.data;
    } catch (error) {
      console.error("POST isteği sırasında hata oluştu:", error);
      throw error;
    }
  }
  async makeDelete(id) {
    try {
      await axios.delete(`${this.url}/${id}`);
    } catch (error) {
      console.error("DELETE isteği sırasında hata oluştu:", error);
    }
  }
}
export default ApiService;
