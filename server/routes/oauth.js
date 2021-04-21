const express = require("express");
const router = express.Router();
const axios = require("axios");

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

class LoginError extends Error {}

router.get("/github", async (req, res, next) => {
  const requestToken = req.query.code;

  console.log(req.query);
  try {
    if (req.query.error) throw new LoginError(req.query.error_description);
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
    console.log(accessToken);
    res.redirect(`http://localhost:3001/welcome/${accessToken}`);
  } catch (error) {
    console.log(error.message);
    if (error instanceof LoginError) {
      res.redirect("http://localhost:3001/login");
    } else {
      throw error;
    }
  }
});

module.exports = router;
