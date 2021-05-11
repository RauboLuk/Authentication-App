const fs = require("fs");

const removeImgs = (userId) => {
  fs.rmSync("./uploads/" + userId, {
    recursive: true,
    force: true,
  });
};

module.exports = {
  removeImgs,
};
