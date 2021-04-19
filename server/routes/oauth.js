const axios = require("axios");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/github", async (req, res, next) => {
  // const auth = axios.get(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user:email`)
  // console.log(new URLSearchParams(auth));

  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const requestToken = req.query.code;

  const client = await axios.post(
    `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`
  );
  const params = new URLSearchParams(client.data);
  console.log(params);
  const access_token = params.get("access_token");
  console.log(access_token);

  const user = await axios.get(
    'https://api.github.com/user',{
      headers: {
        'Authorization': `token ${access_token}`
      }
    }
  )

  console.log(user);
  res.json(user.data);
});

module.exports = router;
