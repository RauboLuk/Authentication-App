const express = require("express");
const router = express.Router();
const axios = require("axios");

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

router.get("/github", async (req, res, next) => {
  const requestToken = req.query.code;

  try {
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
    res.redirect(`localhost:3000/welcome?access_token=${accessToken}`);
  } catch (error) {
    console.log(error.message);
    res.redirect("localhost:3000/login");
  }
});

module.exports = router;
