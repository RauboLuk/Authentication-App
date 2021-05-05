const path = require('path');

module.exports.img_get = async (req, res, next) => {
  const { userId, fileName } = req.params;
  console.log(path.join(__dirname, `../uploads/${userId}/${fileName}`));
  res.sendFile(path.join(__dirname, `../uploads/${userId}/${fileName}`));
  // console.log(req.params);
  // res.send(req.params)
};