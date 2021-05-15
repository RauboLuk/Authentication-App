const { DBNotFoundError, OauthLoginError } = require("../utils/errors");

const LogError = (error) => {
  console.log("en", error.name);
  console.log("em", error.message);
  console.log("code", error.code);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "SyntaxError") {
    LogError(error);
    return response.status(400).send({ error: error.message });
  }

  if (error.name === "ValidationError")
    return response.status(400).send({ error: error.message });

  if (error.code == 11000)
    return response.status(409).json({
      error: "email is already taken",
    });

  if (error.name === "JsonWebTokenError")
    return response.status(401).json({
      error: "invalid token",
    });

  if (error.name === "TypeError") {
    LogError(error);
    return response.redirect("http://localhost:3001/signup");
  }

  if (error instanceof DBNotFoundError)
    return response.status(404).json({
      error: error.message,
    });

  if (error instanceof OauthLoginError)
    return response.redirect("http://localhost:3001/signup");

  if (error.code === "ENOENT") return response.sendStatus(404);

  LogError(error);
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
