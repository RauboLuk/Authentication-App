const axios = require("axios");

const config = require("../utils/config");

const clientID = config.CLIENT_ID;
const clientSecret = config.CLIENT_SECRET;
const API_URL = "https://github.com/";

const postRequestToken = (requestToken) => {
  return axios.post(
    `${API_URL}login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    {},
    {
      headers: {
        accept: "application/json",
      },
    }
  );
};

const getUserData = (accessToken) => {
  return axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
};

module.exports = {
  postRequestToken,
  getUserData,
};
