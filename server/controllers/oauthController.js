const User = require("../models/user");
const ghService = require("../services/ghService");
const { OauthLoginError } = require("../utils/errors");
const auth = require("../utils/auth");

module.exports.github = async (req, res, next) => {
  const { code: requestToken } = req.query;

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

    const token = auth.createToken(user.id);
    auth.addJwtCookie(res, token);

    res.redirect(`http://localhost:3001/me`);
  } catch (error) {
    next(error);
  }
};
