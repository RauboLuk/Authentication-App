const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const secret = config.SECRET;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.userId = null;
        res.redirect(403, "http://localhost:3001/signup");
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        if(!user) res.redirect(403, "http://localhost:3001/signup");
        res.locals.userId = (await user.toJSON()).id;
        next();
      }
    });
  } else {
    res.redirect(403, "http://localhost:3001/signup");
  }
};

// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(token, secret, async (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.locals.user = null;
//         next();
//       } else {
//         console.log(decodedToken);
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

// module.exports = { requireAuth, checkUser };
module.exports = { requireAuth };
