const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/profile", userController.profile_get);

userRouter.put("/profile", userController.profile_put);

userRouter.get("/me", userController.me_get);

module.exports = userRouter;
