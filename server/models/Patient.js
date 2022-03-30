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
  notes: [
    {
      date: {
        type: Date,
        required: true,
      },
      subjective: {
        type: String,
        required: false,
      },
      objective: {
        type: String,
        required: false,
      },
      assessment: {
        type: String,
        required: false,
      },
      plan: {
        type: String,
        required: false,
      },
    },
  ],
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
