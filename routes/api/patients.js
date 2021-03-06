const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const config = require("config");

dotenv.config();
const jwtSecret = process.env.JWTSECRET;

// Models
const Patient = require("../../models/Patient");

// @route  GET api/patients
// @desc   Get all patients
// @access Public
router.get("/", (req, res) => {
  const decoded = jwt.verify(req.cookies.token, jwtSecret);
  const userId = decoded.id;

  Patient.find({ owner: userId })
    /* .collation({ locale: "en" })
    .sort({ lastName: "asc" }) */
    .then((patients) => res.json(patients));
});

// @route  POST api/patients
// @desc   Create a patient
// @access Private
router.post("/", auth, (req, res) => {
  const decoded = jwt.verify(req.cookies.token, jwtSecret);
  const userId = decoded.id;

  const newPatient = new Patient({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
    owner: userId,
  });
  newPatient.save().then((patient) => res.json(patient));
});

// @route  DELETE api/patients/:id
// @desc   Delete a patient
// @access Private
router.delete("/:id", auth, (req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => patient.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route  Patch api/patients/:id
// @desc   Edit patient information, add notes
// @access Public
router.patch("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Patient.findByIdAndUpdate(id, updates);
    res.send(result);
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
