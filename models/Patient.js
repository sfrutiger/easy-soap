const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
