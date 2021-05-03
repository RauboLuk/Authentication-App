const User = require("../models/user");

module.exports.profile_get = async (req, res, next) => {
  const user = await (await User.findById(res.locals.userId)).toJSON();
  res.json(user);
};

module.exports.profile_put = async (req, res, next) => {
  const id = res.locals.userId;
  const newData = req.body;

  if (!newData?.password.length > 0) {
    delete newData.password;
  }
  console.log(!newData?.password.length > 0);

  const editeduser = await User.findOneAndUpdate({ _id: id }, newData, {
    useFindAndModify: false,
    new: true,
    runValidators: true,
  });
  console.log(editeduser);

  res.json(editeduser.toJSON());
};

module.exports.me_get = async (req, res, next) => {
  res.json({ user: "me_get" });
};
