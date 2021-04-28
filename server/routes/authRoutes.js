const authRouter = require("express").Router();
const authController = require("../controllers/authController")

authRouter.post("/signup", authController.signup_post);

authRouter.post("/login", authController.login_post);

authRouter.get("/logout", authController.logout_get);

module.exports = authRouter;
