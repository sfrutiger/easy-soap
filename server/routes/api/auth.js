const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");

dotenv.config()

// Models
const User = require("../../models/User");

// @route  POST api/auth
// @desc   Authenticate user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "Account does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWTSECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: true
          });
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route  GET api/auth
// @desc   Get jwt token
// @access Public
router.get("/", (req, res) => {
  const token = req.cookies.token;
  res.json({ token });
});

// @route  DELETE api/auth
// @desc   Delete jwt token
// @access Public
router.delete("/", (req, res) => {
  res.clearCookie("token");
  res.json({ token: "" });
});

module.exports = router;
