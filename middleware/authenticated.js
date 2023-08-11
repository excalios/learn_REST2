require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const authenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = data;
      // console.log(req.user)
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticated;
