const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const secret = config.SECRET;

const handeErrors = (e) => {
  console.log(e.mesage, e.code);
  let errors = { email: "", password: "" };

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
    const user = new User({
      email,
      password,
    });

    const createdUser = await user.save();
    const token = createToken(createdUser.id);

    res.cookie("isEmployee", false, {
      httpOnly: false,
      secure: false,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });

    res.status(201).json({ user: user.id });
  } catch (error) {
    // console.log(error);
    // res.status(400).json(error);
    const errors = handeErrors(error);
    if (errors) res.status(400).json(errors);
    // next(error);
  }
};

module.exports.login_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log(email);
  } catch (error) {}
  res.send("login_post");
};

module.exports.logout_post = async (req, res, next) => {
  // try {
  //   console.log("in");

  //   return res
  //     .cookie("username", "Flavio", {
  //       maxAge: 0,
  //       domain: "localhost",
  //       path: "/",
  //     })
  //     .sendStatus(200);

  //   res.clearCookie("token", { path: "/" });
  // } catch (error) {}
  res.send("logout_post");
};
