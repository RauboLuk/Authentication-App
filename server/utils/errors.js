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

class OauthLoginError extends Error {
  constructor(message) {
    super(message);
    this.name = "OauthLoginError";
  }
}

module.exports = {
  DBNotFoundError,
  ValidationError,
  OauthLoginError,
};
