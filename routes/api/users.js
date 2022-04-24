const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const config = require("config");
const jwt = require("jsonwebtoken");

// Models
const User = require("../../models/User");

// @route  POST api/users
// @desc   Register new user
// @access Publics
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user)
      return res
        .status(400)
        .json({ msg: "Account already exists for that email" });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Creat salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.JWTSECRET,
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
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
  });
});

module.exports = router;
