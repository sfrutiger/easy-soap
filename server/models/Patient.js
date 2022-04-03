const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = require("./Note");
const User = require("./User");
const UserSchema = require("mongoose").model("user").schema;

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
  owner: { type: String, required: true },
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
/* module.exports = PatientSchema; */
