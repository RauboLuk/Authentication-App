const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const secret = config.SECRET;

const handleErrors = (e) => {
  console.log(e.message, e.code);
  let errors = { email: "", password: "" };

  if (e.message === "incorrect email" || e.message === "incorrect password") {
    errors.email = "Incorrect email or password";
  }

  if (e.code == 11000) {
    errors.email = "That email is already registered";
  }

  if (e.message?.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const createdUser = await User.create({ email, password });
    const token = createToken(createdUser.id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });

    res.status(201).json({ user: createdUser.id });
  } catch (error) {
    const errors = handleErrors(error);
    if (errors) res.status(400).json({ errors });
    // next(error);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
};
