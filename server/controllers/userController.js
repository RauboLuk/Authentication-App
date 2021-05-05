const User = require("../models/user");
const fs = require("fs");

// TODO import handleError from utils...
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

module.exports.profile_get = async (req, res, next) => {
  const user = await User.findById(res.locals.userId);
  res.json(user.toJSON());
};

module.exports.profile_put = async (req, res, next) => {
  try {
    const id = res.locals.userId;
    const newData = req.body;
    const user = await User.findById(id);

    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];

    if (req.files) {
      const { avatar } = req.files;
      if (allowedMimes.includes(avatar.mimetype)) {
        if (user.img.length > 0)
          fs.rmSync("./uploads/" + user.id, {
            recursive: true,
            force: true,
          });
        const ImgPath =
          "/uploads/" +
          user.id +
          "/" +
          avatar.md5 +
          "." +
          avatar.mimetype.split("/")[1];
        avatar.mv("." + ImgPath);
        user.img = "http://localhost:3000" + ImgPath;
      } else {
        throw Error(
          "Invalid file type. Only jpg, png and gif image files are allowed."
        );
      }
    } else {
      fs.rmSync("./uploads/" + user.id, {
        recursive: true,
        force: true,
      });
      user.img = "";
    }

    user.name = newData.name;
    user.bio = newData.bio;
    user.phone = newData.phone;
    user.email = newData.email;
    if (newData?.password.length > 5) {
      user.password = newData.password;
    }

    await user.save();

    console.log(user.toJSON());

    res.json(user.toJSON());
  } catch (error) {
    const errors = handleErrors(error);
    if (errors) res.status(400).json({ errors });
    // next(error);
  }
};

module.exports.me_get = async (req, res, next) => {
  res.json({ user: "me_get" });
};
