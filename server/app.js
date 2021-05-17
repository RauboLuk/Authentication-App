const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const config = require("./utils/config");
const { requireAuth } = require("./middleware/authMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRouter = require("./routes/authRoutes");
const oauthRouter = require("./routes/oauthRoutes");
const uploadsRouter = require("./routes/uploadsRoutes");
const userRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoutes");

const mongoUrl = config.MONGODB_URI;

const app = express();

if (process.env?.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    })
  );
}

if (process.env?.NODE_ENV === "test") {
  app.use("/api/test", testRouter);
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

app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/user", requireAuth, userRouter);

app.use(errorMiddleware.unknownEndpoint);
app.use(errorMiddleware.errorHandler);

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((e) => console.log(e.message));

module.exports = app;
