const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = require("./Note");

//Create Schema
const PatientSchema = new Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  notes: [NoteSchema],
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
/* module.exports = PatientSchema; */
