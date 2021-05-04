import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3000/api/auth/";

const signout = () => {
  return axios.get(API_URL + "logout");
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  signout,
};
