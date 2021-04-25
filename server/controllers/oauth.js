const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../utils/config");

const clientID = config.CLIENT_ID;
const clientSecret = config.CLIENT_SECRET;

class LoginError extends Error {}

router.get("/github", async (req, res, next) => {
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

    res.cookie("username", "Flavio", {
      domain: "localhost",
      path: "/",
    });

    res
      .cookie("token", "testid", {
        maxAge: 1000 * 60, // * 24 * 7,
        // httpOnly: true,
        secure: true,
        sameSite: true,
        path: "/",
        domain: "http://localhost:3001/",
      })
      .redirect(`http://localhost:3001/welcome?access_token=${accessToken}`);

    // if( userExist(githubUserData.data.id, 'github') ) {

    // } else {

    // }
    console.log(githubUserData.data.id);
    // res.redirect(`http://localhost:3001/welcome?access_token=${accessToken}`);
  } catch (error) {
    console.log(error.message);
    if (error instanceof LoginError) {
      res.redirect(`http://localhost:3001/signup?error=${error.message}`);
    } else {
      throw error;
    }
  }
});

module.exports = router;
