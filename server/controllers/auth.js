const authRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res, next) => {
  console.log('here');
  try {
    const body = req.body;

    if (!/.{5,}/.test(body.password)) {
      return res
        .status(400)
        .send({ error: "Minimum password length: 5 characters" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      email: body.email,
      passwordHash,
    });

    const createdUser = await user.save();

    res.json(createdUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = authRouter;
