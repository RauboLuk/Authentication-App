const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const config = require("./utils/config");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const indexRouter = require("./controllers/index");
const authRouter = require("./routes/authRoutes");
const oauthRouter = require("./routes/oauthRoutes");
const avatarRouter = require("./routes/avatarRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const port = config.PORT || 3000;
const mongoUrl = config.MONGODB_URI;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Authentication app listening at http://localhost:${port}`);
    });
  })
  .catch((e) => console.log(e.message));

if (process.env.NODE_ENV.indexOf("dev") > -1) {
  const cors = require("cors");
  app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    })
  );
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// app.get("*", checkUser);
app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.use("/uploads", avatarRouter);
app.use("/api/user", requireAuth, userRouter);

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");

  res.cookie("newUser", false);
  res.cookie("isEmployee", false, {
    maxAge: 1000 * 60 * 60,
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  res.send("you hot!");
});

app.get("/read-cookies", (req, res) => {
  console.log(req.config);
  const cookies = req.cookies;
  console.log("c", cookies);

  res.json(cookies);
});
