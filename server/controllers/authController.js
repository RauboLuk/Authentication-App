const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.signup_post = async (req, res, next) => {
  try {
    const body = req.body;

    if (!/.{5,}/.test(body.password)) {
      return res
        .status(400)
        .send({ error: "Minimum password length: 5 characters" });
    }

    if (!/\S+@\S+\.\S+/.test(body.email)) {
      return res
        .status(400)
        .send({ error: "Invalid email format. Expected format _@_._" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      email: body.email,
      passwordHash,
    });

    const createdUser = await user.save();

    res.json(createdUser);
  } catch (exception) {
    next(exception);
  }
};

module.exports.login_post = async (req, res, next) => {
  res.send('login_post');
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
  res.send('logout_post');
};
