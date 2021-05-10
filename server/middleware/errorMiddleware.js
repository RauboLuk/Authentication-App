const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log("en", error.name);
  console.log("em", error.message);
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    response.locals.userId = '46446';
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.message === "Unauthorized") {
    response.locals.userId = null;
    response.redirect(403, "http://localhost:3001/signup");
  }
  // next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
