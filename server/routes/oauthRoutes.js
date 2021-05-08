const oauthRouter = require("express").Router();
const oauthController = require("../controllers/oauthController");

oauthRouter.get("/github", oauthController.github);

module.exports = oauthRouter;
