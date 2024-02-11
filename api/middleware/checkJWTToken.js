// CREATE MIDDLEWARE TO CHECK JWT VALIDITY
const jwt = require("jsonwebtoken");

const checkJWTToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
      if (error) {
        return res.status(401).json({ msg: "Invalid token" });
      }
      req.user = data;
      next();
    });
  } else {
    res.status(401).json({ msg: "No token attached to the request" });
  }
};

module.exports = checkJWTToken;
