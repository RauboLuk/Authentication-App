require("dotenv").config();

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  CLIENT_SECRET,
  CLIENT_ID,
  MONGODB_URI,
};
