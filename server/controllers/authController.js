const User = require("../models/user");
const bcrypt = require("bcrypt");

const handeErrors = (e) => {
  console.log(e.mesage, e.code);
  let errors = { email: "", password: "" };

  if (e.code == 11000) {
    errors.email = 'That email is already registered'
  }

  if (e.message?.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!/.{5,}/.test(password)) {
      return res
        .status(400)
        .send({ error: "Minimum password length: 5 characters" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      passwordHash,
    });

    const createdUser = await user.save();

    res.status(201).json(createdUser);
  } catch (error) {
    const errors = handeErrors(error);
    res.status(400).json(errors);
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
