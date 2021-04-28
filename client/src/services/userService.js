import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3000/api/user/";

const profile = () => {
  return axios.get(API_URL + "profile");
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  profile,
};
