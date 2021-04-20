const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const oauthRouter = require("./routes/oauth");

const app = express();

const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/oauth", oauthRouter);

app.listen(port, () => {
  console.log(`Authentication app listening at http://localhost:${port}`);
});
