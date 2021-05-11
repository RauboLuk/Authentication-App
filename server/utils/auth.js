const jwt = require("jsonwebtoken");

const config = require("./config");

const secret = config.SECRET;
const maxAge = 3 * 24 * 60 * 60;

module.exports.createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports.addJwtCookie = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
    domain: "localhost",
  });
};
