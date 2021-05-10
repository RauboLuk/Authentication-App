class DBNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "DBNotFoundError";
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = {
  DBNotFoundError,
  ValidationError,
};
