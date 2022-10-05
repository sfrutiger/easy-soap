const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Patient = require("../models/Patient");

// @route  GET api/patients
// @desc   Get all patients
// @access Private
router.get("/", auth, (req, res) => {
  Patient.find({ owner: res.locals.uid })
    /* .collation({ locale: "en" })
    .sort({ lastName: "asc" }) */
    .then((patients) => res.json(patients));
});

// @route  GET api/patients
// @desc   Get all patients
// @access Private
router.get("/:id", auth, (req, res) => {
  const id = req.params.id;
  Patient.find({ _id: id }).then((patient) => res.json(patient));
});

// @route  POST api/patients
// @desc   Create a patient
// @access Private
router.post("/", auth, (req, res) => {
  console.log("add patient");
  const newPatient = new Patient({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
    owner: res.locals.uid,
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
