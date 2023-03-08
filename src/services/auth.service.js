import axios from "axios";

const api = "http://localhost:5000/api/auth";

const register = (fname, lname, username, email, password) => {
  return axios.post(api + "signup", {
    fname,
    lname,
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(api + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(api + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
// holds authentication services using Axios for HTTP requests and Local Storage for user info
