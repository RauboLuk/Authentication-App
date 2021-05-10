const axios = require("axios");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../utils/config");

const secret = config.SECRET;
const clientID = config.CLIENT_ID;
const clientSecret = config.CLIENT_SECRET;

class LoginError extends Error {}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports.github = async (req, res, next) => {
  const requestToken = req.query.code;

  console.log(req.query);
  try {
    if (req.query.error) throw new LoginError(req.query.error);
    const client = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      {
        client_id: clientID,
        client_secret: clientSecret,
        code: requestToken,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const accessToken = client.data.access_token;
    console.log("accessToken", accessToken);
    const githubUserData = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    console.log(githubUserData.data.id);

    let user = await User.findOne({
      oauth: `gh_${githubUserData.data.id}`,
    });
    if (!user) {
      await User.create(
        [
          {
            name: githubUserData.data.login,
            oauth: `gh_${githubUserData.data.id}`,
          },
        ],
        {
          validateBeforeSave: false,
        }
      );
      
      user = await User.findOne({
        oauth: `gh_${githubUserData.data.id}`,
      });
    }

    const token = createToken(user.id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      domain: "localhost",
    });

    res.redirect(`http://localhost:3001/mail`);
  } catch (error) {
    console.log(error.message);
    if (error instanceof LoginError) {
      res.redirect(`http://localhost:3001/signup?error=${error.message}`);
    } else {
      throw error;
    }
  }
};
