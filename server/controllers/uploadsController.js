const path = require("path");

module.exports.img_get = async (req, res, next) => {
  const { userId, fileName } = req.params;

  try {
    res.sendFile(path.join(__dirname, `../uploads/${userId}/${fileName}`));
  } catch (error) {
    next(error);
  }
};
