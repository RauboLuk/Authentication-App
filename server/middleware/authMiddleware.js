const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const secret = config.SECRET;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("http://localhost:3001/signIn", secret);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("http://localhost:3001/signIn", secret);
  }
};

module.exports = { requireAuth };
