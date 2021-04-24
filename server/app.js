const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./utils/config");

const indexRouter = require("./controllers/index");
const authRouter = require("./controllers/auth");
const oauthRouter = require("./controllers/oauth");

const app = express();

const port = 3000;
const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/", indexRouter);

app.listen(port, () => {
  console.log(`Authentication app listening at http://localhost:${port}`);
});
