const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

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
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { httpOnly: true });
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

module.exports = router;
