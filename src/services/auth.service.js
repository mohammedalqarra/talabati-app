import axios from "axios";
const API_URL = "https://dev.talbati.com/api/";
const register = (username, email, password) => {
  return axios.post(API_URL + "Register", {
    username,
    email,
    password,
  });
};
const login = (login_id, password) => {
  return axios
    .post(API_URL + "Login", {
      login_id,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
