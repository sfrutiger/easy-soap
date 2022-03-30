const express = require("express");
const router = express.Router();

// Models
const Patient = require("../../models/Patient");

// @route  GET api/patients
// @desc   Get all patients
// @access Public
router.get("/", (req, res) => {
  Patient.find()
    .collation({ locale: "en" })
    .sort({ lastName: "asc" })
    .then((patients) => res.json(patients));
});

// @route  POST api/patients
// @desc   Create a patient
// @access Public
router.post("/", (req, res) => {
  const newPatient = new Patient({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
  });
  newPatient.save().then((patient) => res.json(patient));
});

// @route  DELETE api/patients/:id
// @desc   Delete a patient
// @access Public
router.delete("/:id", (req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => patient.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route  Patch api/patients/:id
// @desc   Edit patient information, add notes
// @access Public
router.patch("/:id", async (req, res, next) => {
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
