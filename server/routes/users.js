const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Models
const User = require("../models/User");

// @desc Create user
// @route POST /api/users
// @access Private
router.post("/", auth, (req, res) => {
  console.log("user");
  const user = User.create({
    uid: res.locals.uid,
    email: req.body.email,
    name: req.body.name,
  }).then((user) => res.status(200).json(user));
});

module.exports = router;
