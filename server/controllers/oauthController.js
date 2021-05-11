const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../utils/config");
const { OauthLoginError } = require("../utils/errors");
const ghService = require("../services/ghService");

const secret = config.SECRET;

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports.github = async (req, res, next) => {
  const { code: requestToken} = req.query;
  
  try {
    if (req.query.error) throw new OauthLoginError(req.query.error);
    
    const client = await ghService.postRequestToken(requestToken);
    const accessToken = client.data.access_token;

    const githubUserData = await ghService.getUserData(accessToken);
    const { id: ghId, login: ghLogin } = githubUserData.data;

    let user = await User.findOne({
      oauth: `gh_${ghId}`,
    });
    if (!user) {
      user = await User.create({
        name: ghLogin,
        oauth: `gh_${ghId}`,
      });
    }

    const token = createToken(user.id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });

    res.redirect(`http://localhost:3001/welcome`);
  } catch (error) {
    next(error);
  }
};
