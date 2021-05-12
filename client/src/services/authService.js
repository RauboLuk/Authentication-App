import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3000/api/auth/";

const login = (data) => {
  return axios.post(API_URL + "login", data);
};

const logout = () => {
  return axios.get(API_URL + "logout");
};

const signup = (data) => {
  return axios.post(API_URL + "signup", data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  login,
  logout,
  signup,
};
