const express = require("express");
const router = express.Router();

//Note model
const Note = require("../../models/Note");

const Patient = require("../../models/Patient");

// @route  GET api/notes/_id
// @desc   Get all notes of selected patient
// @access Public
router.get("/:id", (req, res) => {
  Patient.findById(req.params.id).then((patient) => res.json(patient.notes));
});

router.post("/", (req, res) => {
  const newPatient = new Patient({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
  });
  newPatient.save().then((patient) => res.json(patient));
});

// @route  POST api/notes/_id
// @desc   Create a note for selected patient
// @access Public
router.post("/:id", (req, res) => {
  const newNote = new Note({
    date: req.body.date,
    subjective: req.body.subjective,
    objective: req.body.objective,
    assessment: req.body.assessment,
    plan: req.body.plan,
  });
  Patient.findById(req.params.id)
    .then((patient) =>
      patient.notes.push(newNote).then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

// @route  DELETE api/patients/:id
// @desc   Delete a patient
// @access Public
router.delete("/:id", (req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => patient.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
