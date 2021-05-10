const { DBNotFoundError } = require("../utils/errors");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log("en", error.name);
  console.log("em", error.message);
  console.log("code", error.code);
  if (error.name === "SyntaxError")
    return response.status(400).send({ error: error.message });
    
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

  if (error instanceof DBNotFoundError)
    response.redirect(404, "http://localhost:3001/signup");

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
