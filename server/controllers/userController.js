const User = require("../models/user");

module.exports.profile_get = async (req, res, next) => {
  const user = await (await User.findById(res.locals.userId)).toJSON();
  res.json(user);
};

module.exports.me_get = async (req, res, next) => {
  res.json({ user: "me_get" });
};
