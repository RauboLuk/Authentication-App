module.exports.profile_get = async (req, res, next) => {
  res.json({ user: "pofile_get" });
};

module.exports.me_get = async (req, res, next) => {
  res.json({ user: "me_get" });
};
