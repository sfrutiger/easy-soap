const config = require("config");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWTSECRET;

function auth(req, res, next) {
  const token = req.cookies.token;

  // Check for token
  if (!token) res.status(401).json({ msg: "Access denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
