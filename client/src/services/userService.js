import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3000/api/user/";

const getProfile = () => {
  return axios.get(API_URL + "profile");
};

const update = (data) => {
  return axios.put(API_URL + "profile", data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getProfile,
  update,
};
