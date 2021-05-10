const User = require("../models/user");
const jwt = require("jsonwebtoken");

const config = require("../utils/config");
const { ValidationError } = require("../utils/errors");

const secret = config.SECRET;

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new ValidationError("Please enter an email");
    if (!password) throw new ValidationError("Please enter a password");

    const createdUser = await User.create({ email, password });
    const token = createToken(createdUser.id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });

    res.status(201).json({ user: createdUser.id });
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
    const token = createToken(user.id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });

    res.status(200).json({ user: user.id });
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
