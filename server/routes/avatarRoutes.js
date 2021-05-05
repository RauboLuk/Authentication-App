const avatarRouter = require("express").Router();
const avatarController = require("../controllers/avatarController")

avatarRouter.get("/:userId/:fileName", avatarController.img_get);

module.exports = avatarRouter;
