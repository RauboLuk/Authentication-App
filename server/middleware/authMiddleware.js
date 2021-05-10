const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const secret = config.SECRET;

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const decodedToken = await jwt.verify(token, secret);

    let user = await User.findById(decodedToken.id);
    if (!user) throw new Error("Unauthorized");
    
    res.locals.userId = (await user.toJSON()).id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireAuth };
