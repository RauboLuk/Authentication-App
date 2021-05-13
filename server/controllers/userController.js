const User = require("../models/user");
const avatarService = require("../services/avatarService");
const { DBNotFoundError, ValidationError } = require("../utils/errors");

module.exports.profile_get = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.userId);
    if (!user) throw new DBNotFoundError("User doesn't exist");
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
};

module.exports.profile_put = async (req, res, next) => {
  try {
    const id = res.locals.userId;
    const newData = req.body;
    const user = await User.findById(id);

    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];

    user.name = newData.name;
    user.bio = newData.bio;
    user.phone = newData.phone;
    user.email = newData.email;
    if (!user.oauth && newData.password?.length > 0) {
      user.password = newData.password;
    } else {
      user._keepPassword = true;
    }

    await user.validate();

    if (req.files) {
      const { avatar } = req.files;
      if (allowedMimes.includes(avatar.mimetype)) {
        if (user.img?.length > 0) avatarService.removeImgs(user.id);
        const ImgPath =
          "/uploads/" +
          user.id +
          "/" +
          avatar.md5 +
          "." +
          avatar.mimetype.split("/")[1];
        avatar.mv("." + ImgPath);
        user.img = "http://localhost:3000/api" + ImgPath;
      } else {
        throw new ValidationError(
          "Invalid file type. Only jpg, png and gif image files are allowed."
        );
      }
    } else if (newData.removeImg) {
      avatarService.removeImgs(user.id);
      user.img = "";
    }

    await user.save();
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
};
