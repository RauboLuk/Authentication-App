const uploadsRouter = require("express").Router();
const uploadsController = require("../controllers/uploadsController")

uploadsRouter.get("/:userId/:fileName", uploadsController.img_get);

module.exports = uploadsRouter;
