const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const secret = config.SECRET;

const unauthorizedRedirect = (res) => {
  res.locals.userId = null;
  res.redirect(403, "http://localhost:3001/signup");
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        unauthorizedRedirect(res);
      } else {
        let user = await User.findById(decodedToken.id);
        if (!user) {
          unauthorizedRedirect(res);
        } else {
          res.locals.userId = (await user.toJSON()).id;
          next();
        }
      }
    });
  } else {
    unauthorizedRedirect(res);
  }
};

module.exports = { requireAuth };
