const testRouter = require("express").Router();
const User = require("../models/user");

testRouter.post("/reset", async (req, res) => {
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = testRouter;
