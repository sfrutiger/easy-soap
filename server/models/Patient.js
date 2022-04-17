const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = require("./Note");
const User = require("./User");

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
    type: String,
    required: true,
  },
  notes: [NoteSchema],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
