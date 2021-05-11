const User = require("../models/user");

const { ValidationError } = require("../utils/errors");
const auth = require("../utils/auth");

module.exports.signup_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new ValidationError("Please enter an email");
    if (!password) throw new ValidationError("Please enter a password");

    const createdUser = await User.create({ email, password });

    const token = auth.createToken(createdUser.id);
    auth.addJwtCookie(res, token);

    res.status(201);
  } catch (error) {
    next(error);
  }
};

module.exports.login_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new ValidationError("Please enter an email");
    if (!password) throw new ValidationError("Please enter a password");

    const user = await User.login(email, password);

    const token = auth.createToken(user.id);
    auth.addJwtCookie(res, token);

    res.status(200);
  } catch (error) {
    next(error);
  }
};

module.exports.logout_get = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
