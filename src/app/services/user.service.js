import axios from "axios";

const api = "http://localhost:5000/api/protected/";

const getPublicContent = () => {
  return axios.get(api + "public");
};

const getUserBoard = () => {
  return axios.get(api + "user");
};

const getEditorBoard = () => {
  return axios.get(api + "editor");
};

const getSupervisorBoard = () => {
  return axios.get(api + "supervisor");
};

const getPrincipalBoard = () => {
  return axios.get(api + "principal");
};

const getAdminBoard = () => {
  return axios.get(api + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getEditorBoard,
  getSupervisorBoard,
  getPrincipalBoard,
  getAdminBoard,
};

export default UserService;

// retrieves protected routes data
